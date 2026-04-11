import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Education', 'Tech', 'Sports', 'Conference', 'Family', 'Other', 'Humanitarian'], 
    required: true 
  },
  uniqueId: { type: String, required: true, unique: true }, 
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Unpaid' },
  
  // This stores all the specific form data (years of exp, tech stack, etc.)
  details: { type: Object, required: true },

  // Files are REQUIRED in your schema
  passportUrl: { type: String, required: true },
  cvUrl: { type: String, required: true },
  
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);