import z from 'zod';

const createLinkSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
  body: z.object({
    title: z.string().min(4),
    url: z.string().url(),
  }),
};

const findAllLinksSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
};

export const LinkSchema = { createLinkSchema, findAllLinksSchema };
