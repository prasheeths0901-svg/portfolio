import { Router } from 'express';
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getEducations);
router.post('/', authenticateToken, requireAdmin, createEducation);
router.put('/:id', authenticateToken, requireAdmin, updateEducation);
router.delete('/:id', authenticateToken, requireAdmin, deleteEducation);

export default router;
