import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['Education', 'Tech', 'Sports', 'Conference', 'Family', 'Other'], required: true },
  uniqueId: { type: String, required: true, unique: true }, // The FP-2026-XXXX-XXXX code
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Unpaid' },
  
  // Sports Specific Fields (Optional if other category)
  sportType: { type: String }, // Football or Basketball
  stats: {
    height: { type: String },
    position: { type: String },
    highlightVideo: { type: String } // Optional link
  },

  // Files (Stored as URLs from Cloudinary/S3)
  passportUrl: { type: String, required: true },
  cvUrl: { type: String, required: true },
  
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
