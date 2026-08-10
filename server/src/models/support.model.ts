import { Schema, model, Document } from 'mongoose';

export interface ISupport extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

const supportSchema = new Schema<ISupport>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Support = model<ISupport>('Support', supportSchema);
export default Support;
