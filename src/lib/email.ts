import nodemailer from "nodemailer";
import { env } from "~/env";

/**
 * Transporter for sending emails.
 */
const transporter = nodemailer.createTransport({
  /**
   * Email service provider.
   */
  service: "Gmail",
  /**
   * Authentication credentials.
   */
  auth: {
    user: env.EMAIL,
    pass: env.EMAIL_PASSWORD,
  },
});

/**
 * Arguments for sending email.
 */
type Args = {
  /**
   * Email recipient.
   */
  to: string;
  /**
   * Email subject.
   */
  subject: string;
  /**
   * Email sender.
   */
  from: string;
  /**
   * React element to be rendered as email content.
   */
  html: string;
};

/**
 * Sends an email.
 * @param args Arguments for sending email.
 * @returns `true` if email was sent, `false` otherwise.
 */
export const sendEmail = async ({
  to,
  subject,
  from,
  html,
}: Args): Promise<boolean> => {
  try {
    const result = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    console.log("Email sent: " + result.response);
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return false;
  }
};
