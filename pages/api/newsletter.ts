import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { validateEmail } from '@/helpers/validation.helper';
import { Newsletter } from '@/types/newsletter.type';
import {
  connectDatabase,
  findDocumentById,
  insertDocument,
} from '@/helpers/database.helper';

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { email } = req.body as Newsletter;
    if (!email || !validateEmail(email)) {
      res.status(422).json({ message: 'Email is not valid email format' });
      return;
    }
    try {
      const client = await connectDatabase();
      // Insert one
      const insertedId = await insertDocument<Newsletter>(
        client,
        'newsletter_subscription',
        {
          email,
        }
      );
      // Get one
      const newNewsletterSubs = await findDocumentById(
        client,
        'newsletter_subscription',
        insertedId
      );
      if (!newNewsletterSubs) {
        throw new Error('Newsletter not found!');
      }
      await client.close();
      res.status(201).json(newNewsletterSubs);
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
