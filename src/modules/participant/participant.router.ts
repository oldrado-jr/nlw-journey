import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { HttpCode } from '../../enums/http-code';
import { ParticipantController } from './participant.controller';
import { ParticipantSchema } from './participant.schema';

const create = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/invites',
    {
      schema: ParticipantSchema.createParticipantSchema,
    },
    async (request, reply) => {
      const { tripId } = request.params;
      const { email } = request.body;

      const participant = await ParticipantController.create({
        email,
        trip_id: tripId,
      });

      return reply.status(HttpCode.CREATED).send({ participantId: participant.id });
    },
  );
};

const update = async (app: FastifyInstance) => {
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

      const {
        is_owner,
        trip_id,
        ...participant
      } = await ParticipantController.findById(participantId);

      return { participant };
    },
  );
};

const findAll = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/participants',
    {
      schema: ParticipantSchema.findAllParticipantsSchema,
    },
    async (request) => {
      const { tripId } = request.params;

      const participants = await ParticipantController.findAll(tripId);

      return {
        participants: participants.map((participant) => {
          const {
            is_owner,
            trip_id,
            ...participantData
          } = participant;

          return participantData;
        }),
      };
    },
  );
};

export const ParticipantRouter = { create, update, findById, findAll };
