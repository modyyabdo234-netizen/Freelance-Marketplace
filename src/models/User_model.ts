import { Schema, model, Document, Types } from 'mongoose';
import {Gigs} from '../models/gigs.models'

export interface User extends Document{
    full_name:string,
    password:string,
    email:string,
    role: "Freelancer" | "Client"
    favorites: Types.ObjectId[];
}

const userSchema = new Schema<User>
({
    full_name : {type: String,required: true,trim: true},
    password : { type: String,required: true,trim: true},
    email : {    type: String,required: true,trim: true},
    role : {     type: String,required: true,enum: ["Freelancer","Client"]},
    favorites :[{type: Schema.Types.ObjectId ,required : false , ref : 'Gig'}]
})

export const User = model<User>("User", userSchema);