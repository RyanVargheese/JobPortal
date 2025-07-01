import { Webhook } from "svix";
import User from "../models/User.js";

//API Controller function to Manage Clerk User Database

export const clerkWebHook=async (req,res)=>{
    try {

        console.log("--- Webhook Request Received ---");
        console.log("Request Headers:", req.headers);
        console.log("Request Body:", req.body);
        console.log("Raw Body (for verification):", req.rawBody);

        //Create Svik instance with clerk webhook Secret
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //Verifying Headers

         await whook.verify(req.rawBody, { //req.rawBody instead of JSON.stringify(req.body)
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        //Gettingdata from request body
        const { data, type } = req.body;

        switch(type){
            case 'user.created':{
                const userData={
                    _id:data.id,
                    email: data.email_addresses?.[0]?.email_address || '',
                    name:data.first_name+" "+data.last_name,
                    image:data.image_url,
                    resume: ''
                }
                console.log("User Data for Creation:", userData)
                await User.create(userData);
                res.json({})
                break;

            }
            case 'user.updated':{
                
                const userData={
                    email: data.email_addresses?.[0]?.email_address || '',
                    name:data.first_name+" "+data.last_name,
                    image:data.image_url
                }
                console.log("User Data for Update:", userData);
                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;

            }
            case 'user.deleted':{
                console.log("User ID for Deletion:", data.id);
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;

            }
            default :
            break;
        }
    }
    catch(error){

        console.log(error.message)
        res.json({success:false,message:'Webhooks Error'})

    }
}