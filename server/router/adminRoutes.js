import express from 'express';
import { createStudent, deleteStudent, updateStudent } from '../controllers/adminController.js';
import multer from 'multer';
import { isAuthenticated, isAuthorized } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/create-student", isAuthenticated, isAuthorized('admin'), createStudent);

router.put("/update-student/:id", isAuthenticated, isAuthorized('admin'), updateStudent);

router.delete("/delete-student/:id", isAuthenticated, isAuthorized('admin'), deleteStudent);

export default router;