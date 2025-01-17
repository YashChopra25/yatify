import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = async (email, subject, emailFor, token) => {
  let message = `Hey,
    Welcome to Yatify,`;
  if (emailFor === "ForgotPassword") {
    message = `Hey,

        You have requested to reset your password.

        Please click on the link below to reset your password:

        http://localhost:3000/reset-password/${token}

        If you did not request this, please ignore this email.`;
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: message,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default transporter;
export { sendMail };
