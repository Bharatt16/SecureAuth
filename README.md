# 🔐 SecureAuth

A full-stack authentication system built with **React, Node.js, Express, MongoDB, JWT, and Brevo Email Service**.

SecureAuth provides a complete authentication workflow including registration, login, email verification, password reset, refresh token authentication, and protected routes.

---

Live link - https://secure-auth-iota.vercel.app/

## 🚀 Features

### Authentication

* User Registration
* User Login
* User Logout
* JWT Access Token Authentication
* Refresh Token Authentication
* Protected Routes
* Role-Based User System

### Email Features

* Email Verification
* Forgot Password
* Password Reset
* Brevo SMTP Integration

### Security

* Password Hashing with Bcrypt
* HttpOnly Refresh Token Cookies
* JWT Authentication
* Secure Password Validation
* Token Hashing Before Database Storage

---

## 🛠 Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* Bcrypt
* Nodemailer
* Joi Validation

### Email Service

* Brevo SMTP

---

## 📂 Project Structure

```bash
SecureAuth/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── config/
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── routes/
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

### Frontend (.env)

```env
VITE_API_URL=https://secureauth-8hx0.onrender.com/api
```

---

## 🏃 Running Locally

### Clone Repository

```bash
git clone https://github.com/yourusername/SecureAuth.git
cd SecureAuth
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | /api/auth/register      | Register User        |
| POST   | /api/auth/login         | Login User           |
| POST   | /api/auth/logout        | Logout User          |
| POST   | /api/auth/refresh-token | Refresh Access Token |
| GET    | /api/auth/me            | Get Current User     |

---

### Email Verification

| Method | Endpoint                      |
| ------ | ----------------------------- |
| GET    | /api/auth/verify-email/:token |

---

### Password Reset

| Method | Endpoint                        |
| ------ | ------------------------------- |
| POST   | /api/auth/forgot-password       |
| PUT    | /api/auth/reset-password/:token |

---

## 🔒 Security Features

* Passwords hashed using Bcrypt
* JWT-based Authentication
* Refresh Tokens stored as HttpOnly Cookies
* Verification Tokens hashed before storage
* Password Reset Tokens hashed before storage
* Input Validation using Joi
* Protected Routes Middleware

---

## 🌐 Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

### Email Service

* Brevo

---

## 👨‍💻 Author

**Bharat Bhushan Rajoria**

Built as a full-stack authentication project to learn production-level authentication flows using MERN Stack.
