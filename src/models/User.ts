import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: [true, "Please provide your full name"] 
  },
  email: { 
    type: String, 
    required: [true, "Please provide an email"], 
    unique: true,
    lowercase: true, // Force lowercase to prevent login issues
    trim: true
  },
  password: { 
    type: String, 
    required: [true, "Please provide a password"] 
  },
  // Added fields for tracking and payment status
  trackingId: { 
    type: String 
  },
  paymentStatus: { 
    type: String, 
    default: 'pending' 
  },
  resetToken: { 
    type: String 
  },
  resetTokenExpiry: { 
    type: Date 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
}, { 
  timestamps: true // Automatically adds updatedAt and createdAt
});

// Important for Next.js: Check if the model exists before creating a new one
export default mongoose.models.User || mongoose.model('User', UserSchema);