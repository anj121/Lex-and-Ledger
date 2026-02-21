import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
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
    required: [true, 'Service price is required'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Service duration is required'],
    trim: true
  },
  features: {
    type: String,
    required: [true, 'Service features are required'],
    trim: true
  },
  requirements: {
    type: String,
    required: [true, 'Service requirements are required'],
    trim: true
  },
  faq: {
    type: String,
    trim: true,
    maxlength: [1000, 'FAQ cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Index for better search performance
serviceSchema.index({ name: 'text', description: 'text', category: 'text' });

// Virtual for formatted creation date
serviceSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString('en-IN');
});

// Ensure virtual fields are serialized
serviceSchema.set('toJSON', { virtuals: true })

export default mongoose.model('Service', serviceSchema)
