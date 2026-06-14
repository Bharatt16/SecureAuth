import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("MESSAGE ID:", info.messageId);
    console.log("ACCEPTED:", info.accepted);
    console.log("REJECTED:", info.rejected);

    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

  await sendEmail(
    email,
    "Verify Your Email",
    `
      <h2>Welcome to SecureAuth</h2>
      <p>Please verify your email by clicking the link below:</p>

      <a href="${verificationUrl}">
        Verify Email
      </a>

      <p>This link may expire after some time.</p>
    `,
  );
};

const sendResetPasswordEmail = async (email, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await sendEmail(
    email,
    "Reset Your Password",
    `
      <h2>Password Reset Request</h2>

      <p>Click the link below to reset your password:</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>

      <p>If you did not request a password reset, you can safely ignore this email.</p>
    `,
  );
};

export {
  transporter,
  sendEmail,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
