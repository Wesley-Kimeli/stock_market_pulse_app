import { connectToDatabase } from "@/database/mongoose";
import { Subscription } from "@/database/models/subscription.model";

async function testUnsubscribe(email: string) {
  await connectToDatabase();
  const sub = await Subscription.findOne({ email });
  if (!sub) {
    console.log(`No subscription found for ${email}`);
    return;
  }
  console.log(`Subscription for ${email}:`);
  console.log(`  isSubscribed: ${sub.isSubscribed}`);
  console.log(`  unsubscribeToken: ${sub.unsubscribeToken}`);
  if (!sub.isSubscribed) {
    console.log("User is unsubscribed. Test passed.");
  } else {
    console.log("User is still subscribed. Test failed.");
  }
}

// Usage: node scripts/test-unsubscribe.js user@example.com
const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/test-unsubscribe.js user@example.com");
  process.exit(1);
}
testUnsubscribe(email).then(() => process.exit(0));
