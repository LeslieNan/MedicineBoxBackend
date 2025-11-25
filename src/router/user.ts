// 文件: src/router/user.ts
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface UserDo {
  user_id: number;
  nickname: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

async function user_router(fastify: FastifyInstance, options: any) {
  fastify.get('/u/all', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { rows } = await fastify.pg.query<UserDo>(
        'SELECT user_id, nickname, email, created_at, updated_at FROM "user" WHERE deleted_at IS NULL',
      );
      return { users: rows };
    } catch (err) {
      fastify.log.error(err);
      throw err;
    }
  });

  fastify.get<{ Params: { id: string } }>('/u/:id', async (request, reply) => {
    const { id } = request.params;

    if (!/^\d+$/.test(id)) {
      return reply.code(400).send({ error: 'Invalid user ID format' });
    }
    try {
      const { rows } = await fastify.pg.query<UserDo>(
        'SELECT user_id, nickname, email, created_at, updated_at FROM "user" WHERE user_id = $1 AND deleted_at IS NULL',
        [id],
      );
      if (rows.length === 0) {
        return reply.code(404).send({ error: 'User not found' });
      }
      return { user: rows[0] };
    } catch (err) {
      fastify.log.error(err);
      throw err;
    }
  });

  fastify.post<{ Body: { nickname: string; password: string; email: string } }>('/u', async (request, reply) => {
    const { nickname, password, email } = request.body;

    if (!nickname || !password || !email) {
      return reply.code(400).send({ error: 'Missing required fields' });
    }

    try {
      const { rows } = await fastify.pg.query<UserDo>(
        'INSERT INTO "user" (nickname, password, email) VALUES ($1, $2, $3) RETURNING user_id, nickname, email, created_at, updated_at',
        [nickname, password, email],
      );
      return { user: rows[0] };
    } catch (err) {
      fastify.log.error(err);
      throw err;
    }
  });

  fastify.delete<{ Params: { id: string } }>('/u/:id', async (request, reply) => {
    const { id } = request.params;

    if (!/^\d+$/.test(id)) {
      return reply.code(400).send({ error: 'Invalid user ID format' });
    }

    try {
      const { rowCount } = await fastify.pg.query(
        'UPDATE "user" SET deleted_at = current_timestamp WHERE user_id = $1 AND deleted_at IS NULL',
        [id],
      );

      if (rowCount === 0) {
        return reply.code(404).send({ error: 'User not found' });
      }

      return reply.code(204).send();
    } catch (err) {
      fastify.log.error(err);
      throw err;
    }
  });
}

export default user_router;
