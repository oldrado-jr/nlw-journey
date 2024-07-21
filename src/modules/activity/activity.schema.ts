import z from 'zod';

const createActivitySchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
  body: z.object({
    title: z.string().min(4),
    occurs_at: z.coerce.date(),
  }),
};

const findAllActivitiesSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
};

export const ActivitySchema = { createActivitySchema, findAllActivitiesSchema };
