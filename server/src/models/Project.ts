import mongoose, { Document, Schema } from 'mongoose';
import { IProject } from '../types/index.js';

export interface IProjectDocument extends IProject, Document {}

const projectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    description: { type: String, required: true },
    category: { type: String, default: 'Full Stack' },
    techStack: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<IProjectDocument>('Project', projectSchema);
