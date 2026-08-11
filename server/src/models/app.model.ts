import mongoose, { Schema, Document } from 'mongoose';
import { IRelease } from './release.model.js';
import { STRINGS } from '../constants/strings.js';

export interface IMember {
  email: string;
  role: 'Owner' | 'Developer' | 'Tester';
  status: 'Pending' | 'Accepted';
  name?: string;
}

export interface IApp extends Document {
  name: string;
  packageName: string;
  description: string;
  category: string;
  icon: string;
  downloads: string;
  rating: string;
  activeUsers: string;
  screenshots: string[];
  releases: IRelease[];
  releasesCount?: number;
  members: IMember[];
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>({
  email: { type: String, required: true },
  role: { type: String, enum: ['Owner', 'Developer', 'Tester'], required: true },
  status: { type: String, enum: ['Pending', 'Accepted'], default: 'Pending' },
  name: { type: String },
});

const AppSchema = new Schema<IApp>(
  {
    name: { type: String, required: true, trim: true },
    packageName: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, default: STRINGS.MODELS.APP.DEFAULT_CATEGORY },
    icon: { type: String, default: STRINGS.MODELS.APP.DEFAULT_ICON },
    downloads: { type: String, default: STRINGS.MODELS.APP.DEFAULT_DOWNLOADS },
    rating: { type: String, default: STRINGS.MODELS.APP.DEFAULT_RATING },
    activeUsers: { type: String, default: STRINGS.MODELS.APP.DEFAULT_ACTIVE_USERS },
    screenshots: {
      type: [String],
      default: STRINGS.MODELS.APP.DEFAULT_SCREENSHOTS as unknown as string[],
    },
    members: { type: [MemberSchema], required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate for releases
AppSchema.virtual('releases', {
  ref: 'Release',
  localField: '_id',
  foreignField: 'appId',
  options: { sort: { buildNumber: -1 } },
});

// Virtual populate for releases count
AppSchema.virtual('releasesCount', {
  ref: 'Release',
  localField: '_id',
  foreignField: 'appId',
  count: true,
});

export const App = mongoose.model<IApp>('App', AppSchema);
