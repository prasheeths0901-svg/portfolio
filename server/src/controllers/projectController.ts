import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project.js';

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, featured } = req.query;
    const filter: any = {};
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, message: 'Project created successfully', project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.json({ success: true, message: 'Project updated successfully', project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};
