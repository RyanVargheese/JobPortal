import { Webhook } from "svix";
import User from "../models/User.js";

//API Controller function to Manage Clerk User Database

export const clerkWebHook=async (req,res)=>{
    try {

        console.log("--- Webhook Request Received ---");
        console.log("Request Headers:", req.headers); // <<<--- ADD THIS LINE
        console.log("Request Body:", req.body);
        
        //Create Svik instance with clerk webhook Secret
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //Verifying Headers

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svik-timestamp":req.headers["svix-timestamp"],
            "svik-signature":req.headers["svix-signature"]
        })

        //Gettingdata from request body
        const {data,body}=req.body

        switch(type){
            case 'user.created':{
                const userData={
                    _id:data.id,
                    email:data.email_addresses[0].email_addresses,
                    name:data.first_name+" "+data.last_name,
                    image:data.image_url,
                    resume: ''
                }

                await User.create(userData);
                res.json({})
                break;

            }
            case 'user.updated':{
                
                const userData={
                    email:data.email_addresses[0].email_addresses,
                    name:data.first_name+" "+data.last_name,
                    image:data.image_url
                }

                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;

            }
            case 'user.deleted':{
                
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