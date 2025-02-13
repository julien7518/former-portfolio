import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, subject, messageContent } =
      await req.json();

    if (!firstName || !lastName || !email || !subject || !messageContent) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const discordWebhookURL = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookURL) {
      return NextResponse.json(
        { error: "Webhook URL is not set." },
        { status: 500 }
      );
    }

    const payload = {
      embeds: [
        {
          title: "📩 Nouveau message !",
          description: "Quelqu'un a envoyé un message par le site.\n",
          color: 0x5865f2,
          fields: [
            {
              name: "👤 Nom",
              value: `_${firstName} ${lastName}_`,
              inline: true,
            },
            {
              name: "✉️ Email",
              value: `\`${email}\``,
              inline: true,
            },
            {
              name: "📌 Sujet",
              value: `\`${subject}\``,
              inline: false,
            },
            {
              name: "📝 Message",
              value: `\`\`\`${messageContent}\`\`\``,
              inline: false,
            },
          ],
          footer: {
            text: "Formulaire de contact - Portfolio",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const response = await fetch(discordWebhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to send message to Discord" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message envoyé à Discord !" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
