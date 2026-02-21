import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
      enum: [
        'Company Formation',
        'Tax Services',
        'Legal Services',
        'Compliance',
        'Financial Planning',
        'Documentation',
        'Consultation',
        'Other'
      ]
    },
    price: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
   
     features: [
      {
        type: String,
        required: true
      }
    ],
   requirements: [
      {
        type: String,
        required: true
      }
    ],

       faq: [
      {
        question: {
          type: String,
          required: true
        },
        answer: {
          type: String,
          required: true
        }
      }
    ],

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
