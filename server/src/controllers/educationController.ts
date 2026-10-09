import { Request, Response, NextFunction } from 'express';
import { Education } from '../models/Education.js';

export const getEducations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const educations = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: educations.length, educations });
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, message: 'Education created successfully', education });
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!education) {
      res.status(404).json({ success: false, message: 'Education not found' });
      return;
    }
    res.json({ success: true, message: 'Education updated successfully', education });
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      res.status(404).json({ success: false, message: 'Education not found' });
      return;
    }
    res.json({ success: true, message: 'Education deleted successfully' });
  } catch (error) {
    next(error);
  }
};
