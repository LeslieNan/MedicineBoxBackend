import { ulid } from 'ulid';

async function base_router(fastify: any, options: any) {
  let u = ulid().toLowerCase();
  fastify.get('/', async (request: any, reply: any) => {
    return { appname: 'foxee', ulid: u };
  });
}

//ESM
export default base_router;
