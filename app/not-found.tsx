import { Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#04152d] ">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-[#da2b4a]">
            Content Not Found
          </h1>
          <p className="text-white max-w-[600px] text-base sm:text-lg opacity-90">
            Sorry, we couldn&apos;t find the TV show or movie you&apos;re
            looking for. It may have been removed or the URL might be incorrect.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button className="bg-[#da2b4a] hover:bg-[#f44363]">
              <Home className="mr-2 h-4 w-4 " />
              Back to Home
            </Button>
          </Link>
          <Link href="/tv-shows">
            <Button variant="outline" className="hover:bg-white/90">
              Browse TV Shows
            </Button>
          </Link>
        </div>
        <div className="text-sm text-white opacity-60">
          Error Code: 404 - Page Not Found
        </div>
      </div>
    </div>
  );
}
