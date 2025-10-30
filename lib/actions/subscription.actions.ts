"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Subscription } from "@/database/models/subscription.model";
import crypto from "crypto";

export async function generateUnsubscribeToken(
  userId: string,
  email: string
): Promise<string> {
  const data = `${userId}-${email}-${Date.now()}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}

export async function createOrUpdateSubscription(
  userId: string,
  email: string
): Promise<string> {
  try {
    await connectToDatabase();

    const unsubscribeToken = await generateUnsubscribeToken(userId, email);

    await Subscription.findOneAndUpdate(
      { email },
      {
        userId,
        email,
        isSubscribed: true,
        unsubscribeToken,
        updatedAt: new Date(),
      },
      { upsert: true }
    );

    return unsubscribeToken;
  } catch (err) {
    console.error("createOrUpdateSubscription error:", err);
    throw new Error("Failed to manage subscription");
  }
}

export async function unsubscribeUser(token: string): Promise<boolean> {
  try {
    await connectToDatabase();

    const subscription = await Subscription.findOneAndUpdate(
      { unsubscribeToken: token },
      { isSubscribed: false, updatedAt: new Date() }
    );

    return !!subscription;
  } catch (err) {
    console.error("unsubscribeUser error:", err);
    throw new Error("Failed to unsubscribe");
  }
}

export async function getSubscriptionStatus(email: string): Promise<boolean> {
  try {
    await connectToDatabase();

    const subscription = await Subscription.findOne({ email }).lean();
    return subscription?.isSubscribed ?? false;
  } catch (err) {
    console.error("getSubscriptionStatus error:", err);
    return false;
  }
}
