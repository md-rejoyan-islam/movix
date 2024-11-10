'use client'

import Link from "next/link"
import { Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">Content Not Found</h1>
          <p className="text-muted-foreground max-w-[600px] text-base sm:text-lg">
            Sorry, we couldn&apos;t find the TV show or movie you&apos;re looking for. It may have been removed or the URL might
            be incorrect.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/tv-shows">
            <Button variant="outline">Browse TV Shows</Button>
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          Error Code: 404 - Page Not Found
        </div>
      </div>
    </div>
  )
}