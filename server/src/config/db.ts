import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer | null = null;

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

  try {
    // Attempt connecting to the configured MongoDB with a short timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`Connected to MongoDB at ${uri}`);
  } catch (error) {
    console.warn('Local MongoDB connection failed. Initializing MongoMemoryServer fallback...');
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const inMemoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(inMemoryUri);
      console.log(`Connected to in-memory MongoDB at ${inMemoryUri}`);
    } catch (memError) {
      console.error('Failed to initialize in-memory MongoDB:', memError);
      throw memError;
    }
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
