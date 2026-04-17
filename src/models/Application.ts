import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  // FIX: Frontend sends 'address', so we use 'address' here instead of currentAddress
  address: { type: String, required: true }, 
  residenceCountry: { type: String, required: true },
  destinationCountry: { type: String, required: true },
  segment: { 
    type: String, 
    required: true, 
    enum: ['conference', 'education', 'family', 'skills', 'sports', 'tech'] 
  },
  // CRITICAL FIX: Add uniqueId with 'sparse' to stop the 500 Duplicate Key Error
  uniqueId: { 
    type: String, 
    unique: true, 
    sparse: true, 
    default: () => `FLY-${Math.floor(100000 + Math.random() * 900000)}`
  },
  segmentSpecificData: {
    githubProfile: String,
    techStack: String,
    yearsExperience: String,
    portfolioUrl: String,
    // Adding extra fields you might need for other segments
    studyProgramme: String,
    fieldOfStudy: String,
    trade: String,
    certification: String
  },
  isCompleted: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);