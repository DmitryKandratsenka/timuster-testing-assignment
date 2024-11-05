import { BACKEND_URL } from '@/config';

export default async function handler(req, res) {
  const { method, query, body } = req;

  if (method === 'GET') {
    const searchParam = query.search ? `?search=${query.search}` : '';
    try {
      const response = await fetch(`${BACKEND_URL}/emails${searchParam}`);
      const data = await response.json();
      res.status(200).json(data);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch emails' });
    }
  } else if (method === 'POST') {
    try {
      const response = await fetch(`${BACKEND_URL}/emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      res.status(200).json(data);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
