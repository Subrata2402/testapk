import mongoose from 'mongoose';
import { getAllUsers } from './dist/controllers/admin.controller.js';
import { env } from './dist/config/env.js';

async function run() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    
    const req = {};
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        console.log('Response Status:', this.statusCode);
        console.log('Response Data:', JSON.stringify(data, null, 2));
      }
    };
    const next = (err) => {
      console.error('Next called with error:', err);
    };

    await getAllUsers(req, res, next);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
