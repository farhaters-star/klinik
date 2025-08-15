import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,     // email pengirim
    pass: process.env.GMAIL_PASS      // app password dari Gmail
  }
});

export const sendNotificationEmail = async (to, subject, message) => {
  try {
    const result = await transporter.sendMail({
      from: `"Weiku App 👨‍⚕️" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: message
    });

    console.log("Email sent:", result.response); // tambahkan ini
  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
};

