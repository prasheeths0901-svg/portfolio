import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/index.js';

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Authentication required' });
    return;
  }

  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_portfolio_2026_dev_env';

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ success: false, message: 'Invalid or expired token' });
      return;
    }
    req.user = user;
    next();
  });
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Admin access required' });
  }
};
