"use client";

import { useState } from "react";
import { LightModernDashboard } from "@/components/LightModernDashboard";
import { DarkProDashboard } from "@/components/DarkProDashboard";
import { AIAssistiveDashboard } from "@/components/AIAssistiveDashboard";
import TestGlobals from "@/components/TestGlobals";
import { Button } from "@/components/ui/button";

export default function App() {
  const [activeDesign, setActiveDesign] = useState<"light" | "dark" | "ai" | "test">(
    "test"
  );

  return (
    <div className="min-h-screen">
      {/* Design Switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
        <Button
          onClick={() => setActiveDesign("light")}
          variant={activeDesign === "light" ? "default" : "outline"}
          size="sm"
        >
          Light Modern
        </Button>
        <Button
          onClick={() => setActiveDesign("dark")}
          variant={activeDesign === "dark" ? "default" : "outline"}
          size="sm"
        >
          Dark Pro
        </Button>
        <Button
          onClick={() => setActiveDesign("ai")}
          variant={activeDesign === "ai" ? "default" : "outline"}
          size="sm"
        >
          AI Assistive
        </Button>
      </div>

      {/* Render active design */}
      {activeDesign === "light" && <LightModernDashboard />}
      {activeDesign === "dark" && <DarkProDashboard />}
      {activeDesign === "ai" && <AIAssistiveDashboard />}
      {activeDesign === "test" && <TestGlobals />}
    </div>
  );
}
