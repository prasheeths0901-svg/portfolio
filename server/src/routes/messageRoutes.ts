import { Router } from 'express';
import {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} from '../controllers/messageController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', createMessage);
router.get('/', authenticateToken, requireAdmin, getMessages);
router.patch('/:id/read', authenticateToken, requireAdmin, markAsRead);
router.delete('/:id', authenticateToken, requireAdmin, deleteMessage);

export default router;
