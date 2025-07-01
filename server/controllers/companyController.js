import Company from "../models/Company.js";
import bcrypt from 'bcrypt'

//Register a new Company
export const registerCompany=async (req,res)=>{

    const {name,email,password}=req.body

    const image=req.file;

    if(!name || !email||!password ||!image){
       return res.json({success:false,message:"Missing Details"}) 
    }

    try{
        const companyExists = await Company.findOne({email})

        if(companyExists){
            return res.json({success:false,message:"Company Already Registered"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashPassword=bcrypt.hash(password,salt)

    }
    catch(error){

    }

}

//Company Log-in
export const loginCompany=async (req,res)=>{

}

//Get Company Data
export const getCompanyData =async (req,res)=>{

}

//Post a new Job
export const postJob=async (req,res)=>{

}

//Get Company Job Applicants
export const getCompanyJobApplicants=async (req,res)=>{


}

//Get Company Posted Jobs
export const getCompanyPostedJobs=async (req,res)=>{

}

//Chnage Job Applicantion Status
export const ChangeJobApplicationStatus =async (req,res)=>{

}

//export const changeJobVisibility
export const changeJobVisibility= async (req,res)=>{
    
}