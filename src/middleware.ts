import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';

  const botKeywords = [
    'bot', 'crawl', 'slurp', 'spider', 'WhatsApp', 'TelegramBot', 'BOT',
    'Slackbot', 'Viber', 'Discordbot', 'SkypeUriPreview'
  ];

  if (botKeywords.some(keyword => userAgent.toLowerCase().includes(keyword.toLowerCase()))) {
    return new NextResponse('Forbidden: Bots are not allowed', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*'
};