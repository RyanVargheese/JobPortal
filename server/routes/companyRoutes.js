import express from 'express'
import { ChangeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController'
import upload from '../config/multer'

const router=express.Router()

//Register
router.post('/register',upload.single('image'),registerCompany)

//Company Login
router.post('login',loginCompany)

//Get CompanyData

router.get('/company',getCompanyData)

//Post a Job

router.post('/post-job',postJob)

//get Applicants Data of Company

router.get('/applicants',getCompanyJobApplicants)

//getCompanyJobList
router.get('/list-jobs',getCompanyPostedJobs)

//change Application Status
router.post('/change-status',ChangeJobApplicationStatus)

//change applciation visibility
router.post('/change-visibility',changeJobVisibility)

export default router