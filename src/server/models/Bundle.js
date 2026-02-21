import mongoose from 'mongoose';

const bundleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    longDescription: {
      type: String
    },
    price: {
      type: String,
      required: true
    },
    originalPrice: {
      type: String
    },
    savings: {
      type: String
    },
    duration: {
      type: String
    },
    popular: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String // frontend icon key (rocket, building etc)
    },
    color: {
      type: String
    },
    features: [String],
    includes: [String],
    process: [String],
    benefits: [String],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Bundle', bundleSchema);
