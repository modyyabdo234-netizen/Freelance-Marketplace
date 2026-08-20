import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
    gig: Types.ObjectId;
    client: Types.ObjectId;
    order: Types.ObjectId;
    rating: number;
    comment: string;
}

const reviewSchema = new Schema<IReview>(
    {
    gig: { type: Schema.Types.ObjectId, ref: 'Gig', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    },
{ timestamps: true }
);

export const Review = model<IReview>('Review', reviewSchema);