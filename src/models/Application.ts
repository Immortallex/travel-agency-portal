import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Unpaid' },
  details: { type: mongoose.Schema.Types.Mixed, required: true }, // Stores all form questions
  passportUrl: { type: String, required: true },
  cvUrl: { type: String, default: "" }, 
  submittedAt: { type: Date, default: Date.now },
}, { 
  strict: false, // Core fix: accepts all questions/fields
  timestamps: true 
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);