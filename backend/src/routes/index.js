import { DB } from '../db/index.js';

export default async function routes(fastify, options) {

  fastify.get('/emails', async (request, reply) => {
    const { search } = request.query;
    try {
      const emails = await DB.getEmails(search);
      reply.send(emails);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Database query failed' });
    }
  });

  fastify.get('/emails/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const email = await DB.getEmailById(id);
      if (email) {
        reply.send(email);
      } else {
        reply.status(404).send({ error: 'Email not found' });
      }
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Database query failed' });
    }
  });

  fastify.post('/emails', async (request, reply) => {
    const { to, cc, bcc, subject, body } = request.body;
    const newEmail = {
      to,
      cc,
      bcc,
      subject,
      body,
    };
    try {
      const [id] = await DB.addEmail(newEmail);
      reply.send({ id, ...newEmail });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to add email' });
    }
  });
}
