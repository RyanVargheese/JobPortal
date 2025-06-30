import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebHook } from './controllers/webhooks.js'

// Initialize express
const app=express()

//connectDB
await connectDB()

//Middlewares
app.use(cors())
app.use(express.json({
  // This 'verify' function saves the raw request body to req.rawBody
  verify: (req, res, buf) => {
    req.rawBody = buf.toString(); // Store the raw buffer as a string
  },
}));

//Routes
app.get('/',(req,res)=>res.send("API Working"))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks',clerkWebHook)

//Port
const PORT=process.env.PORT || 5001

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
});