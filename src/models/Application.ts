import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // Using String to accommodate different ID formats from localStorage
  userId: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Education', 'Tech', 'Sports', 'Conference', 'Family', 'Skills'], 
    required: true 
  },
  uniqueId: { type: String, required: true, unique: true }, 
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Unpaid' },
  
  // This object captures all unique fields from various forms
  details: { type: Object, required: true },

  // S3 URLs for required documents
  passportUrl: { type: String, required: true },
  cvUrl: { type: String, required: true },
  
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);