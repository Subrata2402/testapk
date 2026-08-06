import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { STRINGS } from '../constants/strings.js';

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
      logger.warn(STRINGS.EMAIL.SMTP_NOT_CONFIGURED_WELCOME(toEmail));
      logger.info(`--- WELCOME EMAIL ---`);
      logger.info(`To: ${toEmail}`);
      logger.info(`Subject: ${STRINGS.EMAIL.WELCOME_SUBJECT}`);
      logger.info(`Body: Hi ${name}, Welcome to TestAPK!`);
      logger.info(`----------------------`);
      return;
    }

    const mailOptions = {
      from: `"TestAPK Team" <${env.SMTP_USER}>`,
      to: toEmail,
      subject: STRINGS.EMAIL.WELCOME_SUBJECT,
      text: STRINGS.EMAIL.WELCOME_TEXT(name),
      html: STRINGS.EMAIL.WELCOME_HTML(name),
    };

    await transporter.sendMail(mailOptions);
    logger.info(STRINGS.EMAIL.WELCOME_SENT(toEmail));
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
    logger.warn(STRINGS.EMAIL.SMTP_NOT_CONFIGURED_SUPPORT);
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
    subject: STRINGS.EMAIL.SUPPORT_SUBJECT(subject),
    text: STRINGS.EMAIL.SUPPORT_TEXT(name, email, message),
    html: STRINGS.EMAIL.SUPPORT_HTML(name, email, subject, message),
  };

  await transporter.sendMail(mailOptions);
  logger.info(STRINGS.EMAIL.SUPPORT_SENT(env.SUPPORT_EMAIL));
};

export const sendInvitationEmail = async (
  toEmail: string,
  appName: string,
  role: string
): Promise<void> => {
  const transporter = getTransporter();
  if (!transporter) {
    logger.warn(STRINGS.EMAIL.SMTP_NOT_CONFIGURED_INVITATION(toEmail));
    logger.info(`--- INVITATION EMAIL ---`);
    logger.info(`To: ${toEmail}`);
    logger.info(`Subject: ${STRINGS.EMAIL.INVITATION_SUBJECT(appName)}`);
    logger.info(`Body: You have been invited to join ${appName} as a ${role}.`);
    logger.info(`----------------------`);
    return;
  }

  const mailOptions = {
    from: `"TestAPK Team" <${env.SMTP_USER}>`,
    to: toEmail,
    subject: STRINGS.EMAIL.INVITATION_SUBJECT(appName),
    text: STRINGS.EMAIL.INVITATION_TEXT(appName, role),
    html: STRINGS.EMAIL.INVITATION_HTML(appName, role),
  };

  await transporter.sendMail(mailOptions);
  logger.info(STRINGS.EMAIL.INVITATION_SENT(toEmail));
};
