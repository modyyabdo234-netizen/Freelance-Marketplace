import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IGig extends Document {
  Title: string;
  Description?: string; 
  Price: number;
  Category: string;
  Owner: Types.ObjectId; 
}

const GigsSchema = new Schema<IGig>(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: false,
    },
    Price: {
      type: Number,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Owner: {
      type: Schema.Types.ObjectId ,
      ref : 'User',
      required: true,
    },
  },{strict :false})
/**
 * @swagger
 * components:
 *   schemas:
 *     Gigs:
 *       type: object
 *       required:
 *         - Title
 *         - Price
 *         - Category
 *         - Owner
 *       properties:
 *         Title:
 *           type: string
 *           description: the gig title
 *         Price:
 *           type: number
 *           description: the gig price
 *         Category:
 *           type: string
 *           description: the gig category
 *         Owner:
 *           type: string
 *           format: objectid
 *           description: the gig owner
 *         Description:
 *           type: string
 *           description: the gig description
 *       example:
 *         Title: "Responsive React & TypeScript Landing Page"
 *         Description: "Building fully responsive, clean, and interactive single-page applications using React, TypeScript, and Tailwind CSS with fast rendering performance."
 *         Price: 85
 *         Category: "Web Development"
 *         Owner: "jana ahmed"
 */

export const Gigs = mongoose.model<IGig>('Gigs', GigsSchema);