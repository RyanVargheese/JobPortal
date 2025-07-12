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
/*
The middleware function returned by clerkMiddleware() is Responsible for:

Authenticating Incoming Requests: It inspects incoming HTTP requests for authentication information (e.g., session cookies, authorization headers with JWTs) that Clerk uses.

Verifying Session/Token: It validates the provided authentication credentials against Clerk's backend to ensure they are legitimate and unexpired.

Populating req Object: If a request is successfully authenticated, it typically populates the req object with Clerk-specific authentication data, such as:

req.auth: An object containing authentication details like userId, sessionId, orgId, etc.

req.user: An object containing the full user profile data from Clerk.

req.organization: An object containing the organization data if the user is authenticated within an organization.

Handling Unauthenticated Requests: If a request is not authenticated or the authentication fails, clerkMiddleware() might respond with an HTTP error (e.g., 401 Unauthorized) or pass the request through, but without populating the req object, allowing subsequent route handlers to check for authentication status.
 */

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

