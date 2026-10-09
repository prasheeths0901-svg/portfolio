import mongoose, { Document, Schema } from 'mongoose';
import { IMessage } from '../types/index.js';

export interface IMessageDocument extends IMessage, Document {}

const messageSchema = new Schema<IMessageDocument>(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    subject: { type: String, default: 'General Inquiry', trim: true },
    message: { type: String, required: [true, 'Message content is required'] },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model<IMessageDocument>('Message', messageSchema);
