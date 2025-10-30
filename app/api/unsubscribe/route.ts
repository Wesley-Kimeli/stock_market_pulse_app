import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import { Subscription } from "@/database/models/subscription.model";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Missing token parameter" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const subscription = await Subscription.findOneAndUpdate(
      { unsubscribeToken: token },
      { isSubscribed: false, updatedAt: new Date() },
      { new: true }
    );

    if (!subscription) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Redirect to the unsubscribed page
    return NextResponse.redirect(new URL("/unsubscribed", request.url));
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}
