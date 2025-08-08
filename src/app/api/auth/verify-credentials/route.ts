import { NextRequest, NextResponse } from 'next/server';
import { verifyUserCredentials } from '@/lib/auth/login.service';

export async function POST(request: NextRequest) {
 try {
  const credentials = await request.json();
  const user = await verifyUserCredentials(credentials);

  if (user) {
   return NextResponse.json(user);
  } else {
   return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
 } catch (error) {
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}