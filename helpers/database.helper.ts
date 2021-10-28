import { Document, ObjectId, ObjectID } from 'bson';
import { Filter, MongoClient, Sort } from 'mongodb';

const mongoURI = process.env.MONGODB_URI || '';

export const connectDatabase = async (): Promise<MongoClient> => {
  try {
    const client = await MongoClient.connect(mongoURI);
    return client;
  } catch (err) {
    throw new Error('Connecting to the database failed!');
  }
};

export const insertDocument = async <T extends Pick<Document, keyof Document>>(
  client: MongoClient,
  collectionName: string,
  document: T
): Promise<ObjectID> => {
  try {
    const db = client.db();
    const collection = db.collection(collectionName);
    const { insertedId } = await collection.insertOne(document);
    return insertedId;
  } catch (err) {
    throw new Error('Inserting document to the database failed!');
  }
};

export const findDocumentById = async (
  client: MongoClient,
  collectionName: string,
  id: ObjectId
): Promise<Document | null> => {
  try {
    const db = client.db();
    const collection = db.collection(collectionName);
    const foundDocument = await collection.findOne({
      _id: id,
    });
    return foundDocument;
  } catch (err) {
    throw new Error('Finding document in the database failed');
  }
};

export const getAllDocuments = async (
  client: MongoClient,
  collectionName: string,
  filter: Filter<Document>,
  sort: Sort
): Promise<Document[]> => {
  try {
    const db = client.db();
    const collection = db.collection(collectionName);
    const collections = await collection.find(filter).sort(sort).toArray();
    return collections;
  } catch (err) {
    throw new Error('Getting all documents in the database failed');
  }
};
