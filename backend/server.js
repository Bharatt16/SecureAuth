import "dotenv/config";
import app from "../backend/src/app.js";
import connectDB from "./src/common/config/db.js";
// import { transporter } from "./src/common/config/email.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  console.log(
  "BREVO_API_KEY exists:",
  !!process.env.BREVO_API_KEY
);
console.log("BREVO_API_KEY:", process.env.BREVO_API_KEY);
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
//   try {
//     console.log("SMTP_HOST:", process.env.SMTP_HOST);
//     console.log("SMTP_PORT:", process.env.SMTP_PORT);
//     console.log("SMTP_USER:", process.env.SMTP_USER);
//     console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);
//     await transporter.verify();
//     console.log("Email service connected");
//     transporter.verify((err, success) => {
//   if (err) {
//     console.log("SMTP ERROR:", err);
//   } else {
//     console.log("SMTP READY");
//   }
// });
//   } catch (error) {
//     console.warn("Email service unavailable");
//     console.warn(error.message);
//   }
};

start().catch((err) => {
  console.log("Failed to start server", err);
  process.exit(1);
});
