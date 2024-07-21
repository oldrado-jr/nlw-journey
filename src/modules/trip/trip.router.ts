import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { HttpCode } from '../../enums/http-code';
import { TripController } from './trip.controller';
import { TripSchema } from './trip.schema';

const create = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post('/trips', {
    schema: TripSchema.createTripSchema,
  }, async (request, reply) => {
    const { id } = await TripController.create({ ...request.body });

    return reply.status(HttpCode.CREATED).send({ tripId: id });
  });
};

const update = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().put('/trips/:tripId', {
    schema: TripSchema.updateTripSchema,
  }, async (request, reply) => {
    const { tripId } = request.params;
    const { destination, starts_at, ends_at } = request.body;

    await TripController.update({
      id: tripId,
      destination,
      starts_at,
      ends_at,
    });

    return reply.status(HttpCode.NO_CONTENT).send();
  });
};

const findById = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId',
    {
      schema: TripSchema.findTripByIdSchema,
    },
    async (request) => {
      const { tripId } = request.params;

      const { created_at, ...trip } = await TripController.findById(tripId);

      return { trip };
    },
  );
};

const confirm = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/confirm',
    {
      schema: TripSchema.confirmTripSchema,
    },
    async (request, reply) => {
      const { tripId } = request.params;

      const trip = await TripController.findById(tripId);

      const { is_confirmed } = trip;

      if (is_confirmed) {
        return reply.status(HttpCode.NO_CONTENT).send();
      }

      await TripController.confirm({
        id: tripId,
        is_confirmed: true,
      });

      return reply.status(HttpCode.NO_CONTENT).send();
    },
  );
};

export const TripRouter = { create, update, findById, confirm };
