import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnsubscribedPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12 space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-100">
          You've Been Unsubscribed
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
          You will no longer receive email updates from Stock Market Pulse. You
          can resubscribe at any time by updating your preferences in your
          account settings.
        </p>
      </div>
      <div className="space-x-4">
        <Link href="/sign-in" passHref>
          <Button>Sign In to Manage Preferences</Button>
        </Link>
        <Link href="/" passHref>
          <Button variant="outline">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
