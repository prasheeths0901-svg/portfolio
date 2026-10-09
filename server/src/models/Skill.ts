import mongoose, { Document, Schema } from 'mongoose';
import { ISkill } from '../types/index.js';

export interface ISkillDocument extends ISkill, Document {}

const skillSchema = new Schema<ISkillDocument>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, default: 'frontend' },
    proficiency: { type: Number, required: true, min: 0, max: 100, default: 80 },
    icon: { type: String, default: 'bi-code-slash' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Skill = mongoose.model<ISkillDocument>('Skill', skillSchema);
