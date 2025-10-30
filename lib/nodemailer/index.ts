import nodemailer from "nodemailer";
import {
  WELCOME_EMAIL_TEMPLATE,
  NEWS_SUMMARY_EMAIL_TEMPLATE,
} from "@/lib/nodemailer/templates";

import { createOrUpdateSubscription } from "@/lib/actions/subscription.actions";
import { connectToDatabase } from "@/database/mongoose";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL!,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
});

async function replaceTemplateVariables(
  template: string,
  variables: Record<string, string>,
  email: string
) {
  try {
    // Get user ID from email
    const db = (await connectToDatabase()).connection.db;
    const user = await db.collection("user").findOne({ email });
    if (!user) throw new Error("User not found");

    const userId = user.id || String(user._id);

    // Generate unsubscribe token and URL
    const unsubscribeToken = await createOrUpdateSubscription(userId, email);
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/unsubscribe/${unsubscribeToken}`;

    // Add unsubscribe URL to variables
    variables.unsubscribeUrl = unsubscribeUrl;

    // Replace all variables in template
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
    }
    return result;
  } catch (error) {
    console.error("Template variable replacement error:", error);
    return template;
  }
}

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = await replaceTemplateVariables(
    WELCOME_EMAIL_TEMPLATE,
    { name, intro },
    email
  );

  const mailOptions = {
    from: `"Stock-Market-Pulse" <developer41541@gmail.com>`,
    to: email,
    subject: `Welcome to Stock-Market-Pulse - your stock market toolkit is ready!`,
    text: "Thanks for joining Stock-Market-Pulse",
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};

export const sendNewsSummaryEmail = async ({
  email,
  date,
  newsContent,
}: {
  email: string;
  date: string;
  newsContent: string;
}): Promise<void> => {
  const htmlTemplate = await replaceTemplateVariables(
    NEWS_SUMMARY_EMAIL_TEMPLATE,
    { date, newsContent },
    email
  );

  const mailOptions = {
    from: `"Stock-Market-Pulse News" <developer41541@gmail.com>`,
    to: email,
    subject: `📈 Market News Summary Today - ${date}`,
    text: `Today's market news summary from Stock-Market-Pulse`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
