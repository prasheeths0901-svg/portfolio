import { Request, Response, NextFunction } from 'express';
import { Experience } from '../models/Experience.js';

export const getExperiences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type } = req.query;
    const filter = type ? { type: String(type) } : {};
    const experiences = await Experience.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: experiences.length, experiences });
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, message: 'Experience created successfully', experience });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!experience) {
      res.status(404).json({ success: false, message: 'Experience not found' });
      return;
    }
    res.json({ success: true, message: 'Experience updated successfully', experience });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      res.status(404).json({ success: false, message: 'Experience not found' });
      return;
    }
    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    next(error);
  }
};
