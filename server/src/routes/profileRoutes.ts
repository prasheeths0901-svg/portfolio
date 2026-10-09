import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getProfile);
router.put('/', authenticateToken, requireAdmin, updateProfile);

export default router;
