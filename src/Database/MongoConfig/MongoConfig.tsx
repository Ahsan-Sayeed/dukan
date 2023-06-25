import mongoose from "mongoose";

mongoose.connect('mongodb+srv://dukan:eiDMBW66SZsHZRSD@cluster0.48fmuml.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("database connected")
})
.catch(err=>{
    console.log(err);
})