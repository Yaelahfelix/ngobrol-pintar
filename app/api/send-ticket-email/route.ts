// app/api/send-ticket-email/route.ts
import { NextRequest } from "next/server";
import { sendTicketEmail } from "./lib";

export async function POST(req: NextRequest) {
  const ticketData = await req.json();

  try {
    await sendTicketEmail(ticketData);
    return new Response(
      JSON.stringify({ success: true, message: "Email tiket terkirim" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Gagal mengirim email" }),
      { status: 500 }
    );
  }
}
