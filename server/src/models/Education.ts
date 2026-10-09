import mongoose, { Document, Schema } from 'mongoose';
import { IEducation } from '../types/index.js';

export interface IEducationDocument extends IEducation, Document {}

const educationSchema = new Schema<IEducationDocument>(
  {
    collegeName: { type: String, required: true },
    degree: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    cgpa: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Education = mongoose.model<IEducationDocument>('Education', educationSchema);
