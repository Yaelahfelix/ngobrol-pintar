import nodemailer from "nodemailer";
import QRCode from "qrcode";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ffelixhermawan@gmail.com",
    pass: "ikzvuxcbzbwrmagu",
  },
});

interface TicketData {
  nama: string;
  kotaAsal: string;
  noWhatsapp: string;
  noInvoice: string;
  idSeminar: string;
  email: string;
}

export async function sendTicketEmail(ticket: TicketData) {
  try {
    // Generate QR code sebagai buffer
    const qrBuffer = await QRCode.toBuffer(ticket.noInvoice);

    const mailOptions = {
      from: `"Ngobrol Pintar" <ffelixhermawan@gmail.com>`,
      to: ticket.email,
      subject: "E-Tiket Acara | Ngobrol Pintar",
      html: `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>E-Tiket</title>
        </head>
        <body style="margin:0; padding:0; font-family:Arial, sans-serif;">
          <div style="max-width:600px;margin:auto;border:1px solid #eaeaea;padding:20px;">
            <h2 style="text-align:center;color:#2563eb;">E-Tiket Seminar</h2>

            <p>Halo <strong>${ticket.nama}</strong>,</p>
            <p>Terima kasih telah mendaftar acara di platform kami. Berikut adalah detail tiket Anda:</p>

            <table style="width:100%;border-collapse:collapse;margin-top:20px;">
              <tr><td><strong>Nama</strong></td><td>: ${ticket.nama}</td></tr>
              <tr><td><strong>Kota Asal</strong></td><td>: ${ticket.kotaAsal}</td></tr>
              <tr><td><strong>No WhatsApp</strong></td><td>: ${ticket.noWhatsapp}</td></tr>
              <tr><td><strong>ID Tiket</strong></td><td>: ${ticket.noInvoice}</td></tr>
              <tr><td><strong>ID Seminar</strong></td><td>: ${ticket.idSeminar}</td></tr>
            </table>

            <div style="margin-top:30px;text-align:center;">
              <img src="cid:qrcode" alt="QR Code Tiket" style="width:200px;height:auto;" />
              <p style="margin-top:10px;font-size:14px;">Scan QR Code di atas untuk masuk acara.</p>
            </div>

            <hr style="margin-top:30px;" />

            <p style="font-size:12px;color:#777;text-align:center;margin-top:30px;">
              Email ini dikirim secara otomatis. Mohon tidak membalas pesan ini.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `Halo ${ticket.nama},\n\nBerikut adalah detail tiket Anda:\nNama: ${ticket.nama}\nKota Asal: ${ticket.kotaAsal}\nNo WhatsApp: ${ticket.noWhatsapp}\nID Tiket: ${ticket.noInvoice}\nID Seminar: ${ticket.idSeminar}\n\nAnda dapat scan QR Code tersebut untuk masuk acara.\n\nSalam hormat,\nPUDAM Bayuangga`,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrBuffer,
          encoding: "base64",
          cid: "qrcode", // sesuaikan dengan src img
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email tiket berhasil dikirim");
  } catch (error) {
    console.error("Gagal mengirim email:", error);
  }
}
