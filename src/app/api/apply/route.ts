import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Application from '@/models/Application';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    // 1. Extract common fields
    const { 
      userId, fullName, email, tel, dateOfBirth, 
      currentAddress, residenceCountry, destinationCountry, segment 
    } = data;

    // 2. Extract segment-specific fields into a separate object
    const segmentSpecificData = { ...data };
    const commonKeys = ['userId', 'fullName', 'email', 'tel', 'dateOfBirth', 'currentAddress', 'residenceCountry', 'destinationCountry', 'segment'];
    commonKeys.forEach(key => delete segmentSpecificData[key]);

    // 3. Create or Update the application
    // We use findOneAndUpdate to allow users to save "unfinished" applications
    const application = await Application.findOneAndUpdate(
      { userId, segment, isCompleted: false },
      {
        fullName,
        email,
        tel,
        dateOfBirth: new Date(dateOfBirth),
        currentAddress,
        residenceCountry,
        destinationCountry,
        segmentSpecificData,
        isCompleted: false, // Remains false until payment is confirmed
        status: 'pending'
      },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, applicationId: application._id }, { status: 201 });
  } catch (error: any) {
    console.error("Save Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}