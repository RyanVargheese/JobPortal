import express from 'express'
import { ChangeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'

const router=express.Router()

//Register
router.post('/register',upload.single('image'),registerCompany)

//Company Login
router.post('/login',loginCompany)

//Get CompanyData

router.get('/company',protectCompany,getCompanyData)

//Post a Job

router.post('/post-job',protectCompany,postJob)

//get Applicants Data of Company

router.get('/applicants',protectCompany,getCompanyJobApplicants)

//getCompanyJobList
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

//change Application Status
router.post('/change-status',protectCompany,ChangeJobApplicationStatus)

//change applciation visibility
router.post('/change-visibility',protectCompany,changeJobVisibility)

export default router