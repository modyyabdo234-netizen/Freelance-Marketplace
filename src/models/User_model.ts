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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - full_name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         full_name:
 *           type: string
 *           description: user name
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *         password:
 *           type: string
 *           format: password
 *           description: Hashed password
 *         role:
 *           type: string
 *           enum: [Freelancer, Client]
 *           description: User role 
 *         favorites:
 *           type: array
 *           description: array of favorited Gig 
 *           items:
 *             type: string
 *             format: objectid
 *       example: 
 *          full_name: "jana ahmed"
 *          email: "jana@example.com"
 *          password: "$2b$10$e8I.k3.GZ2L2Y1..."
 *          role: "Freelancer"
 *          favorites: ["65abc1234567890abcdef123", "65abc9876543210fedcba321"]
 */

export const User = model<User>("User", userSchema);