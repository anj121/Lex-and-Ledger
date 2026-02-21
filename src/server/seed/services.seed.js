import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';

dotenv.config();

const services = [
  {
    name: 'Company Registration',
    description: 'Complete company registration service including all legal formalities',
    category: 'Company Formation',
    price: '₹15,000',
    duration: '7-10 days',
    features: 'GST Registration, PAN, Bank Account, Digital Signature',
    requirements: 'Aadhar, PAN, Address Proof, Business Plan',
    faq: 'Q: How long does company registration take? A: 7-10 business days.',
    status: 'active'
  },
  {
    name: 'Income Tax Filing',
    description: 'Professional income tax return filing service',
    category: 'Tax Services',
    price: '₹2,500',
    duration: '2-3 days',
    features: 'ITR Preparation, E-filing, Acknowledgment, Support',
    requirements: 'Form 16, Bank Statements, Investment Proofs',
    faq: 'Q: Can I file without Form 16? A: Yes.',
    status: 'active'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect("mongodb+srv://ag450081_db_user:TyJJEeGpMWb1JEOq@cluster0.r2k2uyx.mongodb.net/test");
    await Service.deleteMany();
    await Service.insertMany(services);
    console.log('Services seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
