import { Card, CardContent } from "@/components/ui/card";

export default function LoadingCard({ style }: { style?: string }) {
  return (
    <Card
      className={`${style} overflow-hidden w-full bg-transparent border-none  `}
    >
      <div className="relative">
        {/* Poster skeleton */}
        <div className="aspect-[2/3]  animate-pulse rounded-lg bg-[#1f467c95]" />

        {/* Rating badge skeleton */}
        <div className="absolute  -bottom-3 left-2 w-10 h-10 rounded-full bg-[#1f467c95] animate-pulse" />

        {/* Genre tags skeleton */}
      </div>

      <CardContent className="py-4 px-0 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 w-3/4 bg-[#1f467c95] animate-pulse rounded" />

        {/* Date skeleton */}
        <div className="h-4 w-1/2 bg-[#1f467c95] animate-pulse rounded" />
      </CardContent>
    </Card>
  );
}
