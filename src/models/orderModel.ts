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

export default mongoose.model<IOrder>('Order', orderSchema);