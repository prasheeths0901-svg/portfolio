import { Request, Response, NextFunction } from 'express';
import { Skill } from '../models/Skill.js';

export const getSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category } = req.query;
    const filter = category ? { category: String(category) } : {};
    const skills = await Skill.find(filter).sort({ order: 1, proficiency: -1 });
    res.json({ success: true, count: skills.length, skills });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, message: 'Skill created successfully', skill });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) {
      res.status(404).json({ success: false, message: 'Skill not found' });
      return;
    }
    res.json({ success: true, message: 'Skill updated successfully', skill });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      res.status(404).json({ success: false, message: 'Skill not found' });
      return;
    }
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    next(error);
  }
};
