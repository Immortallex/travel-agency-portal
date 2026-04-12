import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  currentAddress: { type: String, required: true },
  residenceCountry: { type: String, required: true },
  destinationCountry: { type: String, required: true },
  segment: { 
    type: String, 
    required: true, 
    enum: ['conference', 'education', 'family', 'skills', 'sports', 'tech'] 
  },
  // This stores the unique questions for each page (e.g., GitHub for Tech)
  segmentSpecificData: { type: Map, of: String }, 
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);