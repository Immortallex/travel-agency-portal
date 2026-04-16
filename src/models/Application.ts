import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  // CHANGE THIS LINE from currentAddress to address
  address: { type: String, required: true }, 
  residenceCountry: { type: String, required: true },
  destinationCountry: { type: String, required: true },
  segment: { 
    type: String, 
    required: true, 
    enum: ['conference', 'education', 'family', 'skills', 'sports', 'tech'] 
  },
  segmentSpecificData: {
    githubProfile: String,
    techStack: String,
    yearsExperience: String,
    portfolioUrl: String
  },
  uniqueId: { 
    type: String, 
    unique: true, 
    sparse: true, 
    default: () => `FLY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  },
  isCompleted: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);