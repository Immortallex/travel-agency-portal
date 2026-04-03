import { NextResponse } from 'next/server';

/**
 * Secure Admin Authentication Route
 * Verifies credentials against Vercel Environment Variables
 */
export async function POST(req: Request) {
  try {
    // 1. Extract credentials from the login form request
    const { username, password } = await req.json();

    // 2. Access your secret keys from Vercel Environment Variables
    const VALID_ADMIN_USER = process.env.ADMIN_USER;
    const VALID_ADMIN_PASS = process.env.ADMIN_PASS;

    // 3. Logic: If keys are missing in Vercel, reject for safety
    if (!VALID_ADMIN_USER || !VALID_ADMIN_PASS) {
      console.error("❌ Admin credentials not found in Environment Variables.");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    // 4. Secure Comparison
    if (username === VALID_ADMIN_USER && password === VALID_ADMIN_PASS) {
      console.log(`✅ Admin login successful for user: ${username}`);
      return NextResponse.json({ 
        success: true, 
        message: "Authentication successful" 
      });
    }

    // 5. Rejection for incorrect credentials
    console.warn(`⚠️ Unauthorized admin login attempt with user: ${username}`);
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );

  } catch (error) {
    // Handle unexpected server errors
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
