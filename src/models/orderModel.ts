import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  gig: Types.ObjectId;
  client: Types.ObjectId;
  freelancer: Types.ObjectId;
  status: 'Pending' | 'Accepted' | 'Completed';
  price: number;
}


const orderSchema = new Schema<IOrder>(
  {
    gig: { type: Schema.Types.ObjectId, ref: 'Gig', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    freelancer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Completed'],
      default: 'Pending', 
    },
    price: { type: Number, required: true },
  },
  { timestamps: true } 
);
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - gig
 *         - client
 *         - freelancer
 *         - price
 *       properties:
 *         gig:
 *           type: string
 *           format: objectid
 *           description: gig id
 *         client:
 *           type: string
 *           format: objectid
 *           description: client id
 *         freelancer:
 *           type: string
 *           format: objectid
 *           description: freelancer id
 *         status:
 *           type: string
 *           enum: [Pending, Accepted, Completed]
 *           default: Pending
 *           description: current state of the order
 *         price:
 *           type: number
 *           description: Order price
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         gig: "65abc9876543210fedcba321"
 *         client: "65abc1112223334445556667"
 *         freelancer: "65abc7778889990001112223"
 *         status: "Pending"
 *         price: 150
 *         createdAt: "2026-08-20T20:30:00.000Z"
 *         updatedAt: "2026-08-20T20:30:00.000Z"
 */

export default mongoose.model<IOrder>('Order', orderSchema);