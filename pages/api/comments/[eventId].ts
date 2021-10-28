import { MongoClient } from 'mongodb';
import { validateEmail } from '@/helpers/validation.helper';
import { CommentData, PostCommentRequest } from '@/types/comment.type';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import {
  connectDatabase,
  findDocumentById,
  getAllDocuments,
  insertDocument,
} from '@/helpers/database.helper';

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const eventId = req.query.eventId as string;
  try {
    const client: MongoClient = await connectDatabase();
    if (req.method === 'POST') {
      try {
        const { name, text, email } = req.body as CommentData;

        if (!name || !text || !email || !validateEmail(email)) {
          throw new Error('Please input proper comment data');
        }

        const insertedId = await insertDocument<PostCommentRequest>(
          client,
          'comments',
          {
            name,
            text,
            email,
            eventId,
          }
        );

        const newComment = await findDocumentById(
          client,
          'comments',
          insertedId
        );
        res.status(201).json(newComment);
      } catch (err) {
        const error = err as Error;
        res.status(422).json({ message: error.message });
        return;
      }
    }

    if (req.method === 'GET') {
      try {
        const comments = await getAllDocuments(
          client,
          'comments',
          { eventId: eventId },
          { _id: -1 }
        );
        res.status(200).json(comments);
      } catch (err) {
        const error = err as Error;
        res.status(422).json({ message: error.message });
        return;
      }
    }
    client.close();
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
    return;
  }
};

export default handler;
