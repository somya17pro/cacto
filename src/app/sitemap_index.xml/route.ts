import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect('https://cacto.cc/sitemap.xml', { status: 301 });
}
