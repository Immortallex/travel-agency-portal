import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // Changed to String to prevent Mongoose casting crashes with localStorage IDs
  userId: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Education', 'Tech', 'Sports', 'Conference', 'Family', 'Other', 'Skills'], 
    required: true 
  },
  uniqueId: { type: String, required: true, unique: true },
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Unpaid' },
  
  details: { type: Object, required: true },

  // CV is NO LONGER REQUIRED to prevent submission crashes
  passportUrl: { type: String, required: true },
  cvUrl: { type: String, required: false }, 
  
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);