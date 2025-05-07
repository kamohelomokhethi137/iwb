import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack'; 
import './index.css';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import SignupPage from './components/SignupPage';
import App from './App';
import ContactPage from './components/ContactPage';
import Services from './components/Services';
import SalesDashboard from './components/SalesDashboard';
import FinanceDashboard from './components/FinanceDashboard';
import InvestorDashboard from './components/InvestorDashboard';
import DeveloperDashboard from './components/DeveloperDashboard';
import IWCDashboard from './components/IWCDashboard';
import PageNotFound from './components/PageNotFound';
import EmailConfirmation from './components/EmailConfirmation';
import { AuthProvider } from './components/Layout/authContext';
import VerificationAccount from './components/VerificationAccount';
import ProductsPage from './components/ProductsPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider 
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
    >
      <AuthProvider> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sales-dashboard" element={<SalesDashboard />} />
            <Route path="/finance-dashboard" element={<FinanceDashboard />} />
            <Route path="/iwc" element={<IWCDashboard />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/email-confirmation" element={<EmailConfirmation />} />
            <Route path="/auth/verify-email" element={<VerificationAccount />} />
            <Route path="/investor-portal" element={<InvestorDashboard />} />
            <Route path="/developer" element={<DeveloperDashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SnackbarProvider>
  </StrictMode>
);
