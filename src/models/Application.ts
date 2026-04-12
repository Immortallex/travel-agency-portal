import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // Use String instead of ObjectId to prevent casting errors from localStorage IDs
  userId: { type: String, required: true },
  
  category: { 
    type: String, 
    required: true 
  },
  
  uniqueId: { type: String, required: true, unique: true },
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Unpaid' },
  
  // Accept any object structure for form details
  details: { type: mongoose.Schema.Types.Mixed, required: true },

  // File URLs: Only Passport is strictly required to force the save
  passportUrl: { type: String, required: true },
  cvUrl: { type: String, default: "" }, 
  
  submittedAt: { type: Date, default: Date.now },
}, { 
  strict: false, // FORCE FIX: Allows saving fields even if not defined above
  timestamps: true 
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);