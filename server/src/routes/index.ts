import { Router } from 'express';
import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js';
import skillRoutes from './skillRoutes.js';
import projectRoutes from './projectRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import educationRoutes from './educationRoutes.js';
import messageRoutes from './messageRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/skills', skillRoutes);
router.use('/projects', projectRoutes);
router.use('/experiences', experienceRoutes);
router.use('/educations', educationRoutes);
router.use('/messages', messageRoutes);
router.use('/upload', uploadRoutes);

export default router;
