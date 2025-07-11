import mongoose from 'mongoose'

// Function to connect to mongoDB Database
const connectDB= async () =>{

    /*Establishing a listener*/
    mongoose.connection.on('connected',()=>console.log('Database connected'))

    /* the statement that makes the connection*/
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)

}

export default connectDB