import cors from '@fastify/cors';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod';

import { env } from './config/env';
import { errorHandler } from './middlewares/error-handler';
import { BaseRouter } from './routes';

const app = fastify();

app.register(cors, {
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(BaseRouter);

const start = async () => {
  await app.listen({ port: env.PORT, host: env.HOST });
  console.log(`Server listening on ${env.API_BASE_URL}`);
};

start();
