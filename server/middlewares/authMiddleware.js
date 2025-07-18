import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'

//This function checks if a request is authorized for a company user.
export const protectCompany =async (req,res,next)=>{

     //Getting the token from the request headers
    const token=req.headers.token
    // If no token is provided, the request is not authorized.
    if(!token){
        return res.json({success:false,message:'Not authorized,Login Again'})
    }
 
    try{
        // jwt.verify() decodes the token using the secret key from environment variables.
        // If the token is invalid or expired, it will throw an error.
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        //storing all the company data except for password
        req.company= await Company.findById(decoded.id).select('-password')

        //passing control
        next();
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}