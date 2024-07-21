import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { getMailClient } from '../lib/mail';

export const sendMail = async ({ to, subject, html }: Mail.Options) => {
  const mail = await getMailClient();

  const message = await mail.sendMail({
    from: {
      name: 'Equipe plann.er',
      address: 'oi@plann.er',
    },
    to,
    subject,
    html,
  });

  console.log(nodemailer.getTestMessageUrl(message));
};
