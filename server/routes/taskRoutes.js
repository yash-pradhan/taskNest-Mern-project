import express from 'express';
import { addTask, getTasks, editTask, removeTask } from '../controllers/taskController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes with verifyToken middleware
router.post('/', verifyToken, addTask);
router.get('/', verifyToken, getTasks);
router.put('/:id', verifyToken, editTask);
router.delete('/:id', verifyToken, removeTask);

export default router;
