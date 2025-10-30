import { NextRequest, NextResponse } from "next/server";
import { unsubscribeUser } from "@/lib/actions/subscription.actions";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;
    const success = await unsubscribeUser(token);

    if (!success) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    return NextResponse.redirect(new URL("/unsubscribed", request.url));
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}
