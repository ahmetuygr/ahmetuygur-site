import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, country, email, area, weight, models } = body;

    if (!company || !country || !email || !area || !weight) {
      return NextResponse.json(
        { ok: false, message: "Please complete all required quote fields." },
        { status: 400 }
      );
    }

    const selectedModels = Array.isArray(models) ? models : [];
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !port || !user || !pass) {
      return NextResponse.json({
        ok: false,
        configured: false,
        message: "E-posta SMTP bilgileri henüz tanımlanmadı. İsteğinizi e-posta uygulamanızla gönderebilirsiniz.",
        mailto: buildMailto({ company, country, email, area, weight, selectedModels }),
      }, { status: 202 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: { user, pass },
    });

    const recipients = ["info@ahmetuygur.com", "sales@ahmetuygur.com"];
    const submittedAt = new Date().toLocaleString("en-GB", { timeZone: "Europe/Istanbul" });
    const safeCompany = escapeHtml(String(company));
    const safeCountry = escapeHtml(String(country));
    const safeEmail = escapeHtml(String(email));
    const safeArea = escapeHtml(String(area));
    const safeWeight = escapeHtml(String(weight));
    const safeModels = escapeHtml(selectedModels.join(", ") || "Not selected");

    const mailText = [
      "ahmetuygur B2B TEKLİF TALEBİ",
      "",
      `Firma: ${company}`,
      `Ülke: ${country}`,
      `E-posta: ${email}`,
      `Hedef metraj: ${area} m²`,
      `Gramaj: ${weight}`,
      `Seçili modeller: ${selectedModels.length ? selectedModels.join(", ") : "Seçilmedi"}`,
      `Gönderim zamanı: ${submittedAt}`,
    ].join("\n");

    await transporter.sendMail({
      from: process.env.MAIL_FROM || user,
      to: recipients.join(", "),
      replyTo: String(email),
      subject: `B2B Teklif Talebi | ${company} | ${selectedModels.join(", ") || "Genel"}`,
      text: mailText,
      html: `
        <div style="font-family:Arial,sans-serif;color:#171717;line-height:1.6">
          <h1 style="color:#800021;margin-bottom:24px">Yeni B2B Teklif Talebi</h1>
          <table style="border-collapse:collapse;width:100%;max-width:680px">
            <tr><td style="padding:10px;border-bottom:1px solid #eee;width:180px"><b>Firma</b></td><td style="padding:10px;border-bottom:1px solid #eee">${safeCompany}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee"><b>Ülke</b></td><td style="padding:10px;border-bottom:1px solid #eee">${safeCountry}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee"><b>E-posta</b></td><td style="padding:10px;border-bottom:1px solid #eee"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee"><b>Hedef metraj</b></td><td style="padding:10px;border-bottom:1px solid #eee">${safeArea} m²</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee"><b>Gramaj</b></td><td style="padding:10px;border-bottom:1px solid #eee">${safeWeight}</td></tr>
            <tr><td style="padding:10px;border-bottom:1px solid #eee"><b>Seçili modeller</b></td><td style="padding:10px;border-bottom:1px solid #eee">${safeModels}</td></tr>
            <tr><td style="padding:10px"><b>Gönderim zamanı</b></td><td style="padding:10px">${escapeHtml(submittedAt)} (İstanbul)</td></tr>
          </table>
          <p style="margin-top:24px;color:#666">Bu talep ahmetuygur.com B2B teklif formundan gönderildi.</p>
        </div>`,
    });

    return NextResponse.json({ ok: true, configured: true, message: "Quote request sent successfully." });
  } catch (error) {
    console.error("Quote request mail error:", error);
    return NextResponse.json({
      ok: false,
      configured: true,
      message: "E-posta gönderilemedi. Lütfen SMTP ayarlarını veya ağ bağlantısını kontrol edin.",
    }, { status: 500 });
  }
}

function buildMailto({ company, country, email, area, weight, selectedModels }: { company: unknown; country: unknown; email: unknown; area: unknown; weight: unknown; selectedModels: string[] }) {
  const subject = encodeURIComponent(`ahmetuygur B2B Quote - ${company}`);
  const body = encodeURIComponent([
    `Company: ${company}`,
    `Country: ${country}`,
    `E-mail: ${email}`,
    `Target area: ${area} m²`,
    `Weight: ${weight}`,
    `Selected models: ${selectedModels.join(", ") || "Not selected"}`,
  ].join("\n"));
  return `mailto:info@ahmetuygur.com,sales@ahmetuygur.com?subject=${subject}&body=${body}`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}
