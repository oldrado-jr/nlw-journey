import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
  MAIL_TRANSPORTER_HOST: z.string(),
  MAIL_TRANSPORTER_PORT: z.coerce.number().default(587),
  MAIL_TRANSPORTER_SECURE: z.coerce.boolean().default(false),
});

export const env = envSchema.parse(process.env);
