import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', authenticateToken, requireAdmin, createProject);
router.put('/:id', authenticateToken, requireAdmin, updateProject);
router.delete('/:id', authenticateToken, requireAdmin, deleteProject);

export default router;
