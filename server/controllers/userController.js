import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary} from "cloudinary"


//Get user Data
export const getUserData=async (req,res)=>{

    const userId=req.auth.userId;

    try{

        const user= await User.findById(userId)

        if(!user)
            res.json({success:false,message:"User not found"})

        res.json({success:true,user})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }

}

//Apply For a Job
export const ApplyForAJob=async (req,res)=>{

    const {jobId} =req.body
    const userId=req.auth.userId

    try {
        const isAlreadyApplied=await JobApplication.find({jobId,userId})

        if(isAlreadyApplied.length >0)
            return res.json({success:false,message:'Already Applied'})

        const jobData=await Job.findById(jobId)

        if(!jobData)
            return res.json({success:false,message:'Job Not Found'})

        await JobApplication.create({
             companyId:jobData.companyId,
             userId,
             jobId,
             date:Date.now()
        })

        return res.json({success:true,message:'Applied Sucessfully'})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }

}

//Get user applied Application
export const getUserJobApplications=async (req,res)=>{

    try {
        
        const userId=req.auth.userId

        const application=await JobApplication.find({userId}).populate('companyId','name email image')
        .populate('jobId','title location description category level salary').exec()

        if(!application){
            return res.json({success:false,message:'No job Application'})
        }

        return res.json({success:true,application})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }

}

//Update user profile
export const updateUserResume=async (req,res)=>{
    
    try{
        const userId=req.auth.userId

        const resumeFile=req.file

        const userData=await User.findById(userId)

        if(resumeFile){
            const resumeUpload= await cloudinary.uploader.upload(resumeFile.path)

            userData.resume=resumeUpload.secure_url
        }

        await userData.save()

        return res.json({success:true,message:"Resume Update"})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}