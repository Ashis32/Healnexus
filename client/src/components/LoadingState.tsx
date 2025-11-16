import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className="p-4 md:p-6">
              <div className="space-y-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-12 w-full" />
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 md:p-6 col-span-full">
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-80 w-full" />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="p-4 md:p-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-64 w-full" />
          </Card>
          <Card className="p-4 md:p-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-64 w-full" />
          </Card>
        </div>
      </div>
    </div>
  );
}
