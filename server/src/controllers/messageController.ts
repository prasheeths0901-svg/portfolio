import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/Message.js';

export const createMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields',
      });
      return;
    }

    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! I will get back to you shortly.',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      res.status(404).json({ success: false, message: 'Message not found' });
      return;
    }

    res.json({ success: true, message: 'Message marked as read', data: message });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404).json({ success: false, message: 'Message not found' });
      return;
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};
