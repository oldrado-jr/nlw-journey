import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { ActivitySchema } from './activity.schema';
import { ActivityController } from './activity.controller';
import { HttpCode } from '../../enums/http-code';

const create = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/activities',
    {
      schema: ActivitySchema.createActivitySchema,
    },
    async (request, reply) => {
      const { tripId } = request.params;
      const { title, occurs_at } = request.body;

      const activity = await ActivityController.create({
        title,
        occurs_at,
        trip_id: tripId,
      });

      return reply.status(HttpCode.CREATED).send({ activityId: activity.id });
    },
  );
};

const findAll = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/activities',
    {
      schema: ActivitySchema.findAllActivitiesSchema,
    },
    async (request) => {
      const { tripId } = request.params;

      const activities = await ActivityController.findAll(tripId);

      return { activities };
    },
  );
};

export const ActivityRouter = { create, findAll };
