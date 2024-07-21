import { FastifyInstance } from 'fastify';

import { ActivityRouter } from '../modules/activity/activity.router';
import { LinkRouter } from '../modules/link/link.router';
import { ParticipantRouter } from '../modules/participant/participant.router';
import { TripRouter } from '../modules/trip/trip.router';

export const BaseRouter = async (app: FastifyInstance) => {
  const routers = [
    ActivityRouter,
    LinkRouter,
    ParticipantRouter,
    TripRouter,
  ];

  Promise.all(
    routers.map(
      (router) => Object.values(router).map(
        async (route) => route(app),
      ),
    ),
  );
};
