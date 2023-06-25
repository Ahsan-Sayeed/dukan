import mongoose, { Schema } from "mongoose";
import "../../MongoConfig/MongoConfig";

const schema = new Schema({
    title: String,
    desc: String
})

export const collection = mongoose.model('TodoTable',schema);