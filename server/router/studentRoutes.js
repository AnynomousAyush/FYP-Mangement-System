import express from 'express';
import {
    downloadFiles,
     getAvailableSupervisors,
     getDashboardStats,
     getFeedback,
     getStudentProject,
     getSupervisor,
     requestSupervisor,
     submitProposal,
     uploadFiles,
    } from '../controllers/studentController.js';
import multer from 'multer';
import { isAuthenticated, isAuthorized } from '../middlewares/authMiddleware.js';
import { handleUploadError, upload } from '../middlewares/upload.js';


const router = express.Router();

router.get(
    "/project",
    isAuthenticated,
    isAuthorized("Student"),
    getStudentProject
);

router.post(
    "/project-proposal",
    isAuthenticated,
    isAuthorized("Student"),
    submitProposal
);

router.post(
    "/upload/:projectId",
    isAuthenticated,
    isAuthorized("Student"),
    upload.array("files", 10),
    handleUploadError,
    uploadFiles 
);

router.get(
    "/fetch-supervisors",
    isAuthenticated,
    isAuthorized("Student"),
    getAvailableSupervisors
);

router.get(
    "/supervisor",
    isAuthenticated,
    isAuthorized("Student"),
    getSupervisor,
);

router.post(
    "/request-supervisors",
    isAuthenticated,
    isAuthorized("Student"),
    requestSupervisor,
);

router.get(
    "/feedback/:projectId",
    isAuthenticated,
    isAuthorized("Student"),
    getFeedback,
);

router.get(
    "/fetch-dashboard-stats",
    isAuthenticated,
    isAuthorized("Student"),
    getDashboardStats,
);

router.get(
    "/download/:projectId/:fileId",
    isAuthenticated,
    isAuthorized("Student"),
    downloadFiles,
);




export default router;