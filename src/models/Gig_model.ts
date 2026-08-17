import mongoose, { Schema } from "mongoose"; // you forget it 


const GigsSchema = new Schema({
    Title:{
        type: String,
        required : true
    },
    Description:{
        type: String,
        required : false
    },
    Price:{
        type: Number,
        required : true
    },
    Category:{
        type: String,
        required : true
    },
    Owner:{
        type: String,
        required : true
    },
},{strict :false})
export const Gigs = mongoose.model('Mission',GigsSchema)

