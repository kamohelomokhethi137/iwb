require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// User Model
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'client', 'sales', 'finance', 'investor', 'partner', 'developer'],
    default: 'client'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  approved: {
    type: Boolean,
    default: function() {
      // Auto-approve these roles, others need manual approval
      return ['admin', 'client', 'developer'].includes(this.role);
    }
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

// Role limits configuration
const ROLE_LIMITS = {
  sales: 3,
  finance: 3,
  partner: 3,
  investor: 3,
  developer: 3
};

// Auth Routes

// Login Route
app.post('/api/auth/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is approved
    if (!user.approved) {
      return res.status(403).json({
        success: false,
        message: 'Account pending admin approval'
      });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    // Return user data (without password)
    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      approved: user.approved,
      createdAt: user.createdAt
    };

    res.status(200).json({
      success: true,
      token,
      user: userData
    });
  } catch (err) {
    next(err);
  }
});

// Signup Route
app.post('/api/auth/signup', async (req, res, next) => {
  const { fullName, email, password, role = 'client' } = req.body;

  try {
    // Validate role
    if (!User.schema.path('role').enumValues.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Check role limits
    if (ROLE_LIMITS[role]) {
      const currentCount = await User.countDocuments({ role });
      if (currentCount >= ROLE_LIMITS[role]) {
        return res.status(400).json({
          success: false,
          message: `Maximum ${role} personnel (${ROLE_LIMITS[role]}) reached`
        });
      }
    }

    // Create user (approval handled in schema defaults)
    const user = await User.create({
      fullName,
      email,
      password,
      role
    });

    // Create token (only if approved)
    let token = null;
    if (user.approved) {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
      });
    }

    res.status(201).json({
      success: true,
      token,
      requiresApproval: !user.approved,
      message: user.approved ? 'Account created successfully' : 'Account created, pending admin approval',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        approved: user.approved
      }
    });
  } catch (err) {
    next(err);
  }
});

// Protected route example
app.get('/api/auth/me', async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    next(err);
  }
});

// Role counts endpoint
app.get('/api/auth/role-counts', async (req, res) => {
  try {
    const counts = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    const result = {};
    counts.forEach(item => {
      result[item._id] = item.count;
    });
    
    // Include all possible roles with zero counts
    User.schema.path('role').enumValues.forEach(role => {
      if (!(role in result)) {
        result[role] = 0;
      }
    });
    
    res.json({
      success: true,
      counts: result
    });
  } catch (err) {
    console.error('Error fetching role counts:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching role counts'
    });
  }
});

// Google OAuth (placeholder)
app.get('/api/auth/google', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Google OAuth not yet implemented'
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});