"use client";

import { useEffect, useMemo, useState } from "react";
import { 
  Building2, 
  Hammer, 
  HardHat, 
  Wrench, 
  Zap, 
  Home, 
  TreePine, 
  Shield,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import activitiesData from "@/data/activities.json";

type ActivityData = {
  phases: {
    name: string;
    categories: { name: string; items: string[] }[];
  }[];
};

const allData = activitiesData as ActivityData;

const phaseIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Site Preparation & Foundation Phase": Building2,
  "Substructure Phase": Hammer,
  "Superstructure Phase": HardHat,
  "Roofing Phase": Home,
  "Masonry & Finishing Phase": Wrench,
  "MEP Services (Parallel Phases)": Zap,
  "External Works & Landscaping": TreePine,
  "Quality, Safety & Handover": Shield,
};

const phaseColors: Record<string, string> = {
  "Site Preparation & Foundation Phase": "from-amber-500/20 to-orange-500/20 border-amber-500/30",
  "Substructure Phase": "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
  "Superstructure Phase": "from-green-500/20 to-emerald-500/20 border-green-500/30",
  "Roofing Phase": "from-purple-500/20 to-violet-500/20 border-purple-500/30",
  "Masonry & Finishing Phase": "from-pink-500/20 to-rose-500/20 border-pink-500/30",
  "MEP Services (Parallel Phases)": "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
  "External Works & Landscaping": "from-green-600/20 to-teal-500/20 border-green-600/30",
  "Quality, Safety & Handover": "from-red-500/20 to-orange-600/20 border-red-500/30",
};

export default function ActivitiesBrowser() {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const phases = useMemo(() => allData.phases, []);

  const displayPhases = useMemo(() => {
    if (selectedPhase) {
      return phases.filter(p => p.name === selectedPhase);
    }
    return phases;
  }, [phases, selectedPhase]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <PhaseNavigation 
          phases={phases} 
          selectedPhase={selectedPhase} 
          onPhaseSelect={setSelectedPhase} 
        />
        
        <div className="grid grid-cols-1 gap-8">
          {displayPhases.map((phase, phaseIndex) => (
            <PhaseSection key={phase.name} phase={phase} index={phaseIndex} />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

function PhaseNavigation({ 
  phases, 
  selectedPhase, 
  onPhaseSelect 
}: { 
  phases: ActivityData['phases'];
  selectedPhase: string | null;
  onPhaseSelect: (phase: string | null) => void;
}) {
  return (
    <Card className="bg-gradient-to-r from-background to-muted/20 border-0 shadow-lg">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-3">
          <Activity className="h-8 w-8 text-primary" />
          Construction Phases Overview
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          {selectedPhase ? `Viewing ${selectedPhase}` : 'Select a phase to view its activities'}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onPhaseSelect(null)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105",
              "flex flex-col items-center gap-3 group",
              !selectedPhase 
                ? "bg-primary/10 border-primary text-primary" 
                : "border-muted-foreground/20 hover:border-primary/50"
            )}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-center">All Phases</span>
            <Badge variant="outline" className="text-xs">
              {phases.length}
            </Badge>
          </button>
          
          {phases.map((phase) => {
            const Icon = phaseIcons[phase.name] || Building2;
            const isSelected = selectedPhase === phase.name;
            const totalActivities = phase.categories.reduce((sum, cat) => sum + cat.items.length, 0);
            
            return (
              <Tooltip key={phase.name}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onPhaseSelect(phase.name)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105",
                      "flex flex-col items-center gap-3 group",
                      isSelected 
                        ? "bg-primary/10 border-primary text-primary shadow-lg" 
                        : "border-muted-foreground/20 hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      "bg-gradient-to-br transition-all duration-300",
                      isSelected ? "from-primary/30 to-primary/50" : "from-muted/50 to-muted/70"
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-center leading-tight">
                      {phase.name.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {totalActivities}
                    </Badge>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{phase.name}</p>
                  <p className="text-xs text-muted-foreground">{totalActivities} activities</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function PhaseSection({ phase, index }: { phase: ActivityData['phases'][0]; index: number }) {
  const Icon = phaseIcons[phase.name] || Building2;
  const colorClass = phaseColors[phase.name] || "from-gray-500/20 to-gray-600/20 border-gray-500/30";
  
  return (
    <Card className={cn(
      "overflow-hidden animate-slide-up bg-gradient-to-br",
      colorClass
    )} style={{ animationDelay: `${index * 0.15}s` }}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-foreground mb-1">
              {phase.name}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{phase.categories.length} categories</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{phase.categories.reduce((sum, cat) => sum + cat.items.length, 0)} activities</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phase.categories.map((category, catIndex) => (
            <CategoryCard 
              key={category.name} 
              category={category} 
              index={catIndex}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryCard({ 
  category, 
  index
}: { 
  category: { name: string; items: string[] };
  index: number;
}) {
  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]",
      "bg-background/80 backdrop-blur-sm border-2",
      "animate-scale-in"
    )} style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground leading-tight">
            {category.name}
          </CardTitle>
          <Badge variant="secondary" className="text-xs font-medium">
            {category.items.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-64">
          <div className="space-y-2 pr-4">
            {category.items.map((item, itemIndex) => (
              <div 
                key={itemIndex} 
                className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-muted-foreground/10"
              >
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-foreground leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}