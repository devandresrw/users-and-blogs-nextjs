import { NextResponse } from "next/server";
import { uploadAllBlogsService } from "@/lib/blogs/UploadAll.service";

export async function POST(req: Request) {
 try {
  const data = await req.json();
  const result = await uploadAllBlogsService(data);
  return NextResponse.json(result);
 } catch (error: any) {
  return NextResponse.json({ error: error.message }, { status: 400 });
 }
}