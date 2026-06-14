# SecureAuth Backend

A robust and secure authentication system backend built with Node.js, Express, and MongoDB. This API provides complete authentication and authorization functionality including user registration, login, JWT token management, password reset, and email verification.

---

## 🚀 Features

- **User Authentication**: Secure registration and login with password hashing
- **JWT Token Management**: Access and refresh token generation with expiration
- **Email Verification**: Send verification emails to confirm user identity
- **Password Reset**: Secure password reset flow with token verification
- **Forgot Password**: Email-based password recovery mechanism
- **CORS Support**: Configured for frontend integration
- **Error Handling**: Comprehensive error handling and validation
- **Environment Configuration**: Environment-based configuration management
- **Database**: MongoDB integration with Mongoose ODM

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Brevo SMTP
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)
- Git

---

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd SecureAuth/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment configuration**:
   - Copy the `.env` file or create one with the following variables:
   ```
   PORT=4000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   JWT_ACCESS_SECRET=your_access_secret_key
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_SECRET=your_refresh_secret_key
   JWT_REFRESH_EXPIRES_IN=7d
   SMTP_HOST=smtp-relay.brevo.com
   SMTP_PORT=587
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   SMTP_FROM_NAME=SecureAuth
   SMTP_FROM_EMAIL=your_email@example.com
   CLIENT_URL=http://localhost:5173
   ```

---

## 🚀 Running the Server

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:4000` and automatically reload on file changes.

### Production Mode

```bash
npm start
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                      # Express app configuration
│   ├── auth/
│   │   ├── auth.controller.js     # Request handlers
│   │   ├── auth.middleware.js     # Auth middleware
│   │   ├── auth.model.js          # User schema
│   │   ├── auth.routes.js         # Route definitions
│   │   ├── auth.service.js        # Business logic
│   │   └── dto/                   # Data Transfer Objects
│   │       ├── login.dto.js
│   │       ├── register.dto.js
│   │       ├── forgot-password.dto.js
│   │       └── reset-password.dto.js
│   ├── common/
│   │   ├── config/
│   │   │   ├── db.js              # Database configuration
│   │   │   └── email.js           # Email service setup
│   │   ├── dto/
│   │   │   └── base.dto.js        # Base DTO class
│   │   ├── middleware/
│   │   │   └── validate.middleware.js  # Input validation
│   │   └── utils/
│   │       ├── api-error.js       # Error handler
│   │       ├── api-response.js    # Response formatter
│   │       ├── jwt.utils.js       # JWT utilities
│   │       └── token.utils.js     # Token utilities
├── server.js                       # Entry point
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|------------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/refresh-token` | Refresh access token | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| POST | `/api/auth/verify-email` | Verify email address | No |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| POST | `/api/auth/reset-password` | Reset password | No |

---

## 🔐 Environment Variables

| Variable | Type | Description |
|----------|------|-------------|
| `PORT` | number | Server port (default: 4000) |
| `NODE_ENV` | string | Environment (development/production) |
| `MONGO_URI` | string | MongoDB connection string |
| `JWT_ACCESS_SECRET` | string | Secret key for access tokens |
| `JWT_ACCESS_EXPIRES_IN` | string | Access token expiration time |
| `JWT_REFRESH_SECRET` | string | Secret key for refresh tokens |
| `JWT_REFRESH_EXPIRES_IN` | string | Refresh token expiration time |
| `SMTP_HOST` | string | Email service SMTP host |
| `SMTP_PORT` | number | SMTP port |
| `SMTP_USER` | string | SMTP username |
| `SMTP_PASS` | string | SMTP password |
| `SMTP_FROM_NAME` | string | Email sender name |
| `SMTP_FROM_EMAIL` | string | Email sender address |
| `CLIENT_URL` | string | Frontend client URL for redirects |

---

## 📝 Usage Examples

### Register User
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe"
  }'
```

### Login User
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123"
  }'
```

### Refresh Token
```bash
curl -X POST http://localhost:4000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "your_refresh_token"
  }'
```

---

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ CORS enabled and configured
- ✅ Environment variable protection
- ✅ Email verification for user accounts
- ✅ Secure password reset mechanism
- ✅ Token expiration and refresh logic
- ✅ Input validation and sanitization

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify `MONGO_URI` in `.env` file
- Ensure MongoDB service is running
- Check network connectivity for cloud MongoDB

### Email Sending Issues
- Verify SMTP credentials in `.env`
- Check email service provider's sending limits
- Ensure firewall doesn't block SMTP port

### JWT Token Errors
- Ensure token is passed in `Authorization` header
- Verify token hasn't expired
- Check that JWT secrets are correctly configured

---

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation
- **dotenv**: Environment variable management
- **cors**: Cross-Origin Resource Sharing
- **nodemailer**: Email sending (or Brevo SMTP)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📧 Contact

For questions or support, please contact:
- **Email**: bharatrajoria24@gmail.com
- **GitHub**: [Your GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Express.js community
- MongoDB documentation
- JWT best practices
- Brevo for SMTP service

---

**Last Updated**: June 15, 2026
