import { Schema, model, Document } from 'mongoose';

export interface User extends Document{
    full_name:string,
    password:string,
    email:string,
    role: "Freelancer" | "Client"
}

const userSchema = new Schema<User>
({
    full_name : {type: String,required: true,trim: true},
    password : { type: String,required: true,trim: true},
    email : {    type: String,required: true,trim: true},
    role : {     type: String,required: true,enum: ["Freelancer","Client"]}
})

export const User = model<User>("User", userSchema);