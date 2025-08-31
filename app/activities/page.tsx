import ActivitiesBrowser from "@/components/ActivitiesBrowser";

export const metadata = {
  title: "Civil Construction Activities | Activity Guide",
  description: "Comprehensive visual guide to civil construction activities organized by construction phases for easy reference and exploration.",
};

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Construction Activity Reference</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Civil Construction
              <span className="block mt-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Activity Guide
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Comprehensive reference guide for construction activities across all phases 
              of civil engineering projects.
            </p>
          </div>
        </header>
        <ActivitiesBrowser />
      </div>
    </div>
  );
}

