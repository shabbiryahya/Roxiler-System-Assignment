const dotenv=require("dotenv");
dotenv.config();
const mongoose=require("mongoose");
const connectDataBase=async()=>{
    try {
       let response= await  mongoose.connect(process.env.LOCAL_MONGODB_URL);
       console.log("Data Base Connected");

       return response;

        
    } catch (error) {
        console.log(error);
        
    }

   

}
module.exports= connectDataBase;