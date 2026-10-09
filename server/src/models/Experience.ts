import mongoose, { Document, Schema } from 'mongoose';
import { IExperience } from '../types/index.js';

export interface IExperienceDocument extends IExperience, Document {}

const experienceSchema = new Schema<IExperienceDocument>(
  {
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    certificateUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Experience = mongoose.model<IExperienceDocument>('Experience', experienceSchema);
