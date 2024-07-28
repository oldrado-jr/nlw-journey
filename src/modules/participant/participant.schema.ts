import z from 'zod';

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

export const ParticipantSchema = {
  updateParticipantSchema,
  findParticipantByIdSchema,
};
