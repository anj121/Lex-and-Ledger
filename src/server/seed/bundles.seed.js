import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Bundle from '../models/Bundle.js';

dotenv.config();

const bundles = [ /* tumhara bundle array exactly yahin paste */ ];

const seedBundles = async () => {
  try {
    await mongoose.connect("mongodb+srv://ag450081_db_user:TyJJEeGpMWb1JEOq@cluster0.r2k2uyx.mongodb.net/test");
    await Bundle.deleteMany();
    await Bundle.insertMany(bundles);
    console.log('✅ Bundles seeded');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedBundles();
