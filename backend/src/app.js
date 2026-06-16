import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./auth/auth.routes.js";
import ApiResponse from "./common/utils/api-response.js";
import ApiError from "./common/utils/api-error.js";
import path from "path";
import cors from "cors";


const app = express(); //json parser
// app.options("*", cors());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       process.env.CLIENT_URL,
//     ],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("REQUEST ORIGIN:", origin);
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" })); //Parses form data:
app.use(cookieParser()); //Parses cookies:
//Cookie: refreshToken=abc12

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SecureAuth API Running",
  });
});

app.use("/api/auth", authRoute);

// Catch-all for undefined routes
// or simply "*"
app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});


app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
});



export default app;