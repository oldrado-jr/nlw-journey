import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { HttpCode } from '../../enums/http-code';
import { LinkController } from './link.controller';
import { LinkSchema } from './link.schema';

const create = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/links',
    {
      schema: LinkSchema.createLinkSchema,
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

const findAll = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/links',
    {
      schema: LinkSchema.findAllLinksSchema,
    },
    async (request) => {
      const { tripId } = request.params;

      const links = await LinkController.findAll(tripId);

      return { links };
    },
  );
};

export const LinkRouter = { create, findAll };
