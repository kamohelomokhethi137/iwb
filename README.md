# ⚡ IWB Developer Dashboard – Empowering E-Waste Innovation


> Built with ❤️ using **ReactJS**, **Tailwind CSS**, and **Framer Motion**

---

## 🚀 About IWB

**IWB (Innovative Waste Bureau)** is a tech-driven e-waste recycling company based in **Lesotho**, founded in **2024** by Co-Founder **Kenneth** with an initial capital of **M100,000**. In 2025, **Shadrack** joined as a second CEO, marking a new era of rapid growth.

The company specializes in recycling:
- 🧠 RAM modules
- 💽 Hard Drives
- 🔧 Motherboard Components

Despite rising operational costs, IWB has become a **pioneer in electronic recycling** across Southern Africa. Today, IWB collaborates with global investors and partners, delivering modern solutions backed by cloud technology.

---

## 🌐 Project Overview

This web platform was developed to:

- 📦 Manage and backup services/products sold
- 📊 Project monthly income through dynamic income statements
- 🔐 Enforce role-based access with read/write restrictions
- 🤖 Automate client query responses using smart word similarity
- ☁️ Deploy securely on cloud platforms (Azure, AWS, or GCP)
- 🔒 Enable **Multi-Factor Authentication** for all users

---

## 👥 Role-Based Access Control

| 🧑‍💼 Role            | 🔐 Access Level                                                                 |
|---------------------|----------------------------------------------------------------------------------|
| 🛒 Sales Personnel  | View & edit sales records, client queries                                       |
| 💰 Finance Team     | View & edit income statements                                                   |
| 🧑‍💻 Developers      | Full access to application files                                                |
| 💼 Investors        | Read-only access to income statements                                           |
| 🌍 Primary Partner  | Full access to everything **except** client queries & webpages                  |

---

## ✨ Features

- ⚙️ **Responsive Dashboard** with Tailwind CSS
- 🎥 **Smooth Animations** powered by Framer Motion
- 🔒 **Secure Role-Based Authentication** with MFA
- 📈 **Dynamic Income Reports** per month
- 📬 **Client Query System** with Smart Auto-Replies
- ☁️ **Cloud Backup Support** for high availability

---

## 🛠️ Tech Stack

| Technology     | Description                           |
|----------------|---------------------------------------|
| ⚛️ React.js     | Frontend framework                    |
| 🎨 Tailwind CSS | Utility-first CSS for responsive UI   |
| 🎞️ Framer Motion| Declarative motion animations         |
| 🍃 MongoDB      | NoSQL database for storing records    |
| 🔐 Express.js   | API & Auth middleware (Node.js based) |
| 🔑 JWT Auth     | Secured authentication w/ roles       |
| ☁️ Cloud Deploy | Azure, AWS, or Google Cloud Hosting   |

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/kamohelomokhethi137/iwb.git
cd iwb
npm install
npm run dev
```

VITE_API_URL=http://localhost:5000
VITE_MONGO_URI=your_mongodb_connection_string
VITE_JWT_SECRET=your_secret_key
VITE_CLOUD_PLATFORM=azure|aws|gcp


📄 License
This project is licensed under the MIT License.
