import nodemailer from 'nodemailer';

import { env } from '../config/env';

export const getMailClient = async () => {
  const { user, pass } = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: env.MAIL_TRANSPORTER_HOST,
    port: env.MAIL_TRANSPORTER_PORT,
    secure: env.MAIL_TRANSPORTER_SECURE,
    auth: { user, pass },
  });

  return transporter;
};
