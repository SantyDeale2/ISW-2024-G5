// pages/api/send-email.js
import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export default async (req: any, res: any) => {
  const { to, from, subject, text } = req.body;

  const msg = {
    to,
    from,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email", error);
    res.status(500).json({ error: "Error sending email" });
  }
};
