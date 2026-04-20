import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  // Force-Fix: Removed 'required' to prevent validation crashes
  address: { type: String }, 
  currentAddress: { type: String },
  residenceCountry: { type: String, required: true },
  destinationCountry: { type: String, required: true },
  segment: { 
    type: String, 
    required: true, 
    enum: ['conference', 'education', 'family', 'skills', 'sports', 'tech'] 
  },
  trackingId: { 
    type: String, 
    unique: true, 
    sparse: true, 
    default: () => `FLY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  },
  segmentSpecificData: {
    githubProfile: String,
    techStack: String,
    yearsExperience: String,
    portfolioUrl: String
  },
  isCompleted: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);