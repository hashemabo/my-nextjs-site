import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'edge'; // Use Edge Runtime for better performance

export async function POST(request: NextRequest) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram environment variables are not set.');
      return NextResponse.json(
        { ok: false, error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    const { name, address, phone, notes, cart, total, location } = await request.json();

    if (!name || !address || !phone || !cart || cart.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Missing required order information.' },
        { status: 400 }
      );
    }

    let messageText = `📦 *طلب جديد من متجر قوة الصقر*\n\n`;
    messageText += `*الاسم:* ${name}\n`;
    messageText += `*الهاتف:* ${phone}\n`;
    messageText += `*العنوان:* ${address}\n`;
    
    if (location && location.latitude && location.longitude) {
      const mapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      messageText += `*📍 الموقع:* [افتح على خرائط جوجل](${mapsLink})\n`;
    }

    if (notes) {
      messageText += `*ملاحظات:* ${notes}\n`;
    }
    messageText += `\n------------------------------------\n\n`;

    cart.forEach((item: any) => {
      messageText += `*المنتج:* ${item.name}\n`;
      messageText += `*الكمية:* ${item.quantity}\n`;
      messageText += `*السعر:* ${item.prices.sar.toFixed(2)} ريال\n`;
      messageText += `------------------------------------\n`;
    });

    messageText += `\n💰 *الإجمالي: ${total.toFixed(2)} ريال سعودي*`;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();

    if (!result.ok) {
        console.error('Telegram API Error:', result);
        return NextResponse.json({ ok: false, error: 'Failed to send message to Telegram.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
    
  } catch (error) {
    console.error('Failed to process order:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { ok: false, error: `Internal Server Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
