import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { HttpCode } from '../../enums/http-code';
import { ParticipantController } from './participant.controller';
import { ParticipantSchema } from './participant.schema';

const confirm = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/participants/:participantId/confirm',
    {
      schema: ParticipantSchema.updateParticipantSchema,
    },
    async (request, reply) => {
      const { participantId } = request.params;

      const participant = await ParticipantController.findById(participantId);

      const { is_confirmed } = participant;

      if (is_confirmed) {
        return reply.status(HttpCode.NO_CONTENT).send();
      }

      await ParticipantController.update({
        id: participantId,
        is_confirmed: true,
      });

      return reply.status(HttpCode.NO_CONTENT).send();
    },
  );
};

const findById = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/participants/:participantId',
    {
      schema: ParticipantSchema.findParticipantByIdSchema,
    },
    async (request) => {
      const { participantId } = request.params;

      const participant = await ParticipantController.findById(participantId);

      return { participant };
    },
  );
};

export const ParticipantRouter = { confirm, findById };
