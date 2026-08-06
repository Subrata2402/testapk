import { Schema, model, Document, Types } from 'mongoose';
import { STRINGS } from '../constants/strings.js';

export interface IFeedback extends Document {
  userId: Types.ObjectId;
  category: 'bug' | 'feature_request' | 'other';
  rating: number;
  title: string;
  description: string;
  deviceInfo?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, STRINGS.MODELS.FEEDBACK.USER_ID_REQUIRED],
    },
    category: {
      type: String,
      enum: ['bug', 'feature_request', 'other'],
      required: [true, STRINGS.MODELS.FEEDBACK.CATEGORY_REQUIRED],
    },
    rating: {
      type: Number,
      required: [true, STRINGS.MODELS.FEEDBACK.RATING_REQUIRED],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: [true, STRINGS.MODELS.FEEDBACK.TITLE_REQUIRED],
      trim: true,
    },
    description: {
      type: String,
      required: [true, STRINGS.MODELS.FEEDBACK.DESCRIPTION_REQUIRED],
      trim: true,
    },
    deviceInfo: {
      type: Map,
      of: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = model<IFeedback>('Feedback', feedbackSchema);
export default Feedback;
