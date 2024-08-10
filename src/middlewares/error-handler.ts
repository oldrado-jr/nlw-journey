import type { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

import { HttpCode } from '../enums/http-code';
import { HttpError } from '../errors/http-error';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(HttpCode.BAD_REQUEST).send({
      message: 'Invalid input',
      error: error.flatten().fieldErrors,
    });
  }

  if (error instanceof HttpError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    });
  }

  return reply
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .send({ message: 'Internal server error' });
};
