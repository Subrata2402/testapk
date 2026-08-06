import { Schema, model, Document } from 'mongoose';
import { encrypt, decrypt } from '../utils/crypto.js';
import { STRINGS } from '../constants/strings.js';

export interface IUser extends Document {
  email: string;
  name: string;
  picture?: string;
  googleId?: string;
  googleRefreshToken?: string;
  googleDriveFolderId?: string;
  role: 'user' | 'admin';
  fcmTokens?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, STRINGS.MODELS.USER.EMAIL_REQUIRED],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, STRINGS.MODELS.USER.NAME_REQUIRED],
      trim: true,
    },
    picture: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    googleRefreshToken: {
      type: String,
      get: decrypt,
      set: encrypt,
    },
    googleDriveFolderId: {
      type: String,
      get: decrypt,
      set: encrypt,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    fcmTokens: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

export const User = model<IUser>('User', userSchema);
export default User;
