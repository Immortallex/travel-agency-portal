import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Application from "@/models/Application";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const application = await Application.findOne({ uniqueId: params.id.toUpperCase() });

    if (!application) {
      return NextResponse.json({ error: "Invalid Unique ID" }, { status: 404 });
    }

    return NextResponse.json({ 
      status: application.status, 
      category: application.category,
      payment: application.paymentStatus 
    });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
