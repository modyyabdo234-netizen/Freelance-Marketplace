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
/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - gig
 *         - client
 *         - order
 *         - rating
 *         - comment
 *       properties:
 *         gig:
 *           type: string
 *           format: objectid
 *           description: gig id
 *         client:
 *           type: string
 *           format: objectid
 *           description: client id
 *         order:
 *           type: string
 *           format: objectid
 *           description: order id
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Rating score between 1 and 5
 *         comment:
 *           type: string
 *           description: Review text comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         gig: "65abc9876543210fedcba321"
 *         client: "65abc1112223334445556667"
 *         order: "65abc5556667778889990001"
 *         rating: 5
 *         comment: "Great experience! High performance code and fast delivery."
 *         createdAt: "2026-08-20T20:30:00.000Z"
 *         updatedAt: "2026-08-20T20:30:00.000Z"
 */
export const Review = model<IReview>('Review', reviewSchema);