const nodemailer = require("nodemailer");

const emailManager = async (to, subject, text, html) => {
  // Create a Nodemailer transport object
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "86c5aae98b80cc",
      pass: "7c7fe9e31233d4",
    },
  });

  // Compose the email message
  await transport.sendMail({
    from: "info@expense-tracker-pro.com",
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
};

module.exports = emailManager;
