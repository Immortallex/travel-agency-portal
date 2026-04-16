import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  // Changed to 'address' to match frontend and added 'currentAddress' as fallback
  address: { type: String, required: true },
  currentAddress: { type: String }, 
  residenceCountry: { type: String, required: true },
  destinationCountry: { type: String, required: true },
  segment: { 
    type: String, 
    required: true, 
    enum: ['conference', 'education', 'family', 'skills', 'sports', 'tech'] 
  },
  // Added uniqueId with sparse: true to "force fix" the E11000 error
  uniqueId: { 
    type: String, 
    unique: true, 
    sparse: true, 
    default: () => `FLY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  },
  segmentSpecificData: {
    // Education / Skills / Tech fields
    githubProfile: String,
    techStack: String,
    yearsExperience: String,
    portfolioUrl: String,
    studyProgramme: String,
    fieldOfStudy: String,
    trade: String,
    certification: String,
    // Family fields
    maritalStatus: String,
    dependentsList: [mongoose.Schema.Types.Mixed],
    // Conference fields
    conferenceName: String,
    organization: String
  },
  isCompleted: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);