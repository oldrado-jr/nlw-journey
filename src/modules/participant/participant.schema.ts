import z from 'zod';

const createParticipantSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
  body: z.object({
    email: z.string().email(),
  }),
};

const updateParticipantSchema = {
  params: z.object({
    participantId: z.string().uuid(),
  }),
};

const findParticipantByIdSchema = {
  params: z.object({
    participantId: z.string().uuid(),
  }),
};

const findAllParticipantsSchema = {
  params: z.object({
    tripId: z.string().uuid(),
  }),
};

export const ParticipantSchema = {
  createParticipantSchema,
  updateParticipantSchema,
  findParticipantByIdSchema,
  findAllParticipantsSchema,
};
