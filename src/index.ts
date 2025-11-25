import Fastify from 'fastify';
import pg from '@fastify/postgres';
import base_router from './router/base.js';
import user_router from './router/user.js';

const app = Fastify({
  logger: true,
});

app.register(pg, {
  connectionString: 'postgresql://postgres:password777@localhost:5432/db1',
});

app.register(base_router);
app.register(user_router);

const start = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
