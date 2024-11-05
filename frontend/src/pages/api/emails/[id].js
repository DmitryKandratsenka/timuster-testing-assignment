import { BACKEND_URL } from '@/config';

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  if (method === 'GET') {
    try {
      const response = await fetch(`${BACKEND_URL}/emails/${id}`);
      const data = await response.json();
      res.status(response.status).json(data);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch email' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
