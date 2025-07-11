import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebHook } from './controllers/webhooks.js'

import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'

// Initialize express

/*establishes the Server
returs a json in response
*/
const app=express()   
                      

//connectDB
await connectDB()
await connectCloudinary()

//Middlewares
app.use(cors())
app.use(express.json({
  // This 'verify' function saves the raw request body to req.rawBody
  verify: (req, res, buf) => {
    req.rawBody = buf.toString(); // Store the raw buffer as a string
  },
}));
app.use(clerkMiddleware())

//Routes
app.get('/',(req,res)=>res.send("API Working"))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks',clerkWebHook)

app.use('/api/Company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)

//Port
const PORT=process.env.PORT || 5001

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
});

