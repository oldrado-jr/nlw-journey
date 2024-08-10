import type { FastifyInstance } from 'fastify';

import { ParticipantRouter } from '../modules/participant/participant.router';
import { TripRouter } from '../modules/trip/trip.router';

export const BaseRouter = async (app: FastifyInstance) => {
  const routers = [ParticipantRouter, TripRouter];

  Promise.all(
    routers.map((router) =>
      Object.values(router).map(async (route) => route(app)),
    ),
  );
};
