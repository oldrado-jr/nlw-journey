import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { HttpCode } from '../../enums/http-code';
import { ActivityController } from '../activity/activity.controller';
import { LinkController } from '../link/link.controller';
import { ParticipantController } from '../participant/participant.controller';
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

      const trip = await TripController.findById(tripId);

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

const createTripLink = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/links',
    {
      schema: TripSchema.createTripLinkSchema,
    },
    async (request, reply) => {
      const { tripId } = request.params;
      const { title, url } = request.body;

      const link = await LinkController.create({
        title,
        url,
        trip_id: tripId,
      });

      return reply.status(HttpCode.CREATED).send({ linkId: link.id });
    },
  );
};

const findTripLinks = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/links',
    {
      schema: TripSchema.findTripLinksSchema,
    },
    async (request) => {
      const { tripId } = request.params;

      const links = await TripController.findTripLinks(tripId);

      return { links };
    },
  );
};

const createTripActivity = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/activities',
    {
      schema: TripSchema.createTripActivitySchema,
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

const findTripActivities = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/activities',
    {
      schema: TripSchema.findTripActivitiesSchema,
    },
    async (request) => {
      const { tripId } = request.params;

      const activities = await TripController.findTripActivities(tripId);

      return { activities };
    },
  );
};

const createInviteForTrip = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/invites',
    {
      schema: TripSchema.createInviteForTripSchema,
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

const findTripParticipants = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/participants',
    {
      schema: TripSchema.findTripParticipantsSchema,
    },
    async (request) => {
      const { tripId } = request.params;

      const participants = await TripController.findTripParticipants(tripId);

      return { participants };
    },
  );
};

export const TripRouter = {
  create,
  update,
  findById,
  confirm,
  createTripLink,
  findTripLinks,
  createTripActivity,
  findTripActivities,
  createInviteForTrip,
  findTripParticipants,
};
