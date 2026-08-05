import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

const getTransporter = () => {
  if (!env.SMTP_HOST || !env.SMTP_PORT || !env.SMTP_USER || !env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
};

export const sendWelcomeEmail = async (toEmail: string, name: string): Promise<void> => {
  try {
    const transporter = getTransporter();
    if (!transporter) {
      logger.warn(`SMTP is not configured. Welcome email to ${toEmail} simulated.`);
      logger.info(`--- WELCOME EMAIL ---`);
      logger.info(`To: ${toEmail}`);
      logger.info(`Subject: Welcome to TestAPK!`);
      logger.info(`Body: Hi ${name}, Welcome to TestAPK!`);
      logger.info(`----------------------`);
      return;
    }

    const mailOptions = {
      from: `"TestAPK Team" <${env.SMTP_USER}>`,
      to: toEmail,
      subject: 'Welcome to TestAPK!',
      text: `Hi ${name},\n\nWelcome to TestAPK! We are excited to have you on board.\n\nBest regards,\nThe TestAPK Team`,
      html: `
        <h3>Welcome to TestAPK!</h3>
        <p>Hi ${name},</p>
        <p>We are excited to have you on board. TestAPK helps you manage and distribute your APK releases to testers seamlessly.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>The TestAPK Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Welcome email sent to ${toEmail}`);
  } catch (error) {
    logger.error(`Error sending welcome email to ${toEmail}:`, error);
  }
};

export const sendSupportEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  const transporter = getTransporter();
  if (!transporter || !env.SUPPORT_EMAIL) {
    logger.warn('SMTP is not configured. Support message logged to console:');
    logger.info(`--- SUPPORT MESSAGE ---`);
    logger.info(`From: ${name} <${email}>`);
    logger.info(`Subject: ${subject}`);
    logger.info(`Message: ${message}`);
    logger.info(`----------------------`);
    return;
  }

  const mailOptions = {
    from: `"${name} via TestAPK Support" <${env.SMTP_USER}>`,
    to: env.SUPPORT_EMAIL,
    replyTo: email,
    subject: `[TestAPK Support] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h3>New Support Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <br/>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  logger.info(`Support email sent to ${env.SUPPORT_EMAIL}`);
};
