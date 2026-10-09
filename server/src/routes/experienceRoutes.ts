import { Router } from 'express';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getExperiences);
router.post('/', authenticateToken, requireAdmin, createExperience);
router.put('/:id', authenticateToken, requireAdmin, updateExperience);
router.delete('/:id', authenticateToken, requireAdmin, deleteExperience);

export default router;
