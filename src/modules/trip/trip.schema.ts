import z from 'zod';

const createTripSchema = {
  body: z.object({
    destination: z.string().min(4),
    starts_at: z.coerce.date(),
    ends_at: z.coerce.date(),
    owner_name: z.string(),
    owner_email: z.string().email(),
    emails_to_invite: z.array(z.string().email()),
  }),
};

const updateTripSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
  body: z.object({
    destination: z.string().min(4),
    starts_at: z.coerce.date(),
    ends_at: z.coerce.date(),
  }),
};

const findTripByIdSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
};

const confirmTripSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
};

const createTripLinkSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
  body: z.object({
    title: z.string().min(4),
    url: z.string().url(),
  }),
};

const findTripLinksSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
};

const createTripActivitySchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
  body: z.object({
    title: z.string().min(4),
    occurs_at: z.coerce.date(),
  }),
};

const findTripActivitiesSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
};

const createInviteForTripSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
  body: z.object({
    email: z.string().email(),
  }),
};

const findTripParticipantsSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
};

export const TripSchema = {
  createTripSchema,
  updateTripSchema,
  findTripByIdSchema,
  confirmTripSchema,
  createTripLinkSchema,
  findTripLinksSchema,
  createTripActivitySchema,
  findTripActivitiesSchema,
  createInviteForTripSchema,
  findTripParticipantsSchema,
};
