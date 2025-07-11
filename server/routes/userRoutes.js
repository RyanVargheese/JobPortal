import express from 'express'
import { ApplyForAJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'

const router=express.Router()

// Get user data
router.get('/user',getUserData)

// Apply for a job
router.post('/apply',ApplyForAJob)

// Get applied jobs data
router.get('/applications',getUserJobApplications)

// Update user profile
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router