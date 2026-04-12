import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // Force userId to String to handle IDs coming from localStorage without casting errors
  userId: { type: String, required: true },
  
  category: { 
    type: String, 
    enum: ['Education', 'Tech', 'Sports', 'Conference', 'Family', 'Other', 'Skills'], 
    required: true 
  },
  
  uniqueId: { type: String, required: true, unique: true }, // The FP-2026-XXXX-XXXX code
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Unpaid' },
  
  // details stores all form-specific inputs (dob, gender, stack, etc.)
  details: { type: Object, required: true },

  // Files: Passport remains required, CV is now OPTIONAL to prevent crashes
  passportUrl: { type: String, required: true },
  cvUrl: { type: String, required: false, default: "" },
  
  submittedAt: { type: Date, default: Date.now },
});

// Use existing model if available to prevent re-compilation errors in Next.js
export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);