import mongoose from 'mongoose'
export const start= async()=>{
    try{
        //await mongoose.connect("mongodb://auth-mongo-srv:27017/workspace")
        await mongoose.connect("mongodb://localhost/workspace")
        console.log("server connected to db")
    }
    catch(err)
    {
        console.log("errrrrrrrrrrrrrrrrrrrr")
       console.error(err) 
    }
}
