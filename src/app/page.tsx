"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { useDhuhaStore } from "@/lib/store";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const router = useRouter();
  const { hasStarted, setHasStarted } = useDhuhaStore();

  useEffect(() => {
    if (hasStarted) {
      router.replace("/dashboard");
    }
  }, [hasStarted, router]);

  const handleStart = () => {
    setHasStarted();
    router.push("/dashboard");
  };

  if (hasStarted) return null; // Prevent flash

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary font-serif">Barakah Quest</h1>
          <p className="text-lg text-muted-foreground">Let’s grow your spiritual consistency</p>
        </div>

        <div className="py-8">
          <div className="w-40 h-40 bg-white rounded-full mx-auto flex items-center justify-center shadow-xl border-4 border-secondary/30">
             <span className="text-6xl">🌱</span>
          </div>
        </div>

        <Button size="lg" onClick={handleStart} className="w-full max-w-xs text-lg shadow-lg shadow-primary/20 hover:cursor-pointer">
          Start Journey
        </Button>
      </motion.div>
    </div>
  );
}
