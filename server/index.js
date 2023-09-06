const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const  connectDataBase  = require("./models/connectDataBase");
const app=express();
const apiRoutes = require('./routes/api');
const morgan=require("morgan")
dotenv.config();

const PORT = process.env.PORT || 3001;




app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/api', apiRoutes);


connectDataBase().then((response)=>{
    app.listen(PORT,()=>{

        console.log(`Server is running on http://localhost:${PORT}/ `);
    })


}).catch((error)=>{

console.log(error);

})


