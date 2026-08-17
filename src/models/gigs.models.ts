import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IGig extends Document {
  Title: string;
  Description?: string; 
  Price: number;
  Category: string;
  Owner: string; 
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
      type: String, 
      required: true,
    },
  },{strict :false})


export const Gigs = mongoose.model<IGig>('Gigs', GigsSchema);