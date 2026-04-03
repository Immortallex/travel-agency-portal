import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const VALID_USER = process.env.ADMIN_USER;
    const VALID_PASS = process.env.ADMIN_PASS;

    if (username === VALID_USER && password === VALID_PASS) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
