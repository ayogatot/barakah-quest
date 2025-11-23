"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Character } from "@/components/Character";
import { Button } from "@/components/Button";
import { useDhuhaStore, Habit } from "@/lib/store";
import { getTodayDateString } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Flame } from "lucide-react";
import { MotivationalQuote } from "@/components/MotivationalQuote";

export default function DashboardPage() {
  const { habits, markCompleted, checkStreak } = useDhuhaStore();

  useEffect(() => {
    checkStreak();
  }, [checkStreak]);

  return (
    <Layout>
      <div className="relative min-h-full pb-20 space-y-8">
        <div className="text-center space-y-2 md:text-left">
          <h2 className="text-4xl font-black text-black font-serif tracking-tight">My Garden</h2>
          <p className="text-muted-foreground font-medium">Nurture your daily habits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(habits).map((habit) => (
            <HabitCard key={habit.id} habit={habit} onComplete={() => markCompleted(habit.id)} />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <MotivationalQuote />
        </div>
      </div>
    </Layout>
  );
}

function HabitCard({ habit, onComplete }: { habit: Habit; onComplete: () => void }) {
  const isCompletedToday = habit.lastCompletedDate === getTodayDateString();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
    >
      {/* Plant Area */}
      <div className="relative h-48 bg-blue-100 border-b-2 border-black flex items-center justify-center p-4">
        <div className="scale-75 transform origin-bottom">
          <Character stage={habit.evolutionStage} />
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Flame className="text-orange-500 fill-orange-500" size={14} />
          <span className="text-xs font-bold text-black">{habit.streak}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
        <div>
          <h3 className="font-black text-xl text-black font-serif">{habit.name}</h3>
          <p className="text-sm font-bold text-muted-foreground">Stage {habit.evolutionStage}: {getStageName(habit.evolutionStage)}</p>
        </div>

        <AnimatePresence mode="wait">
          {isCompletedToday ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-100 text-black p-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <CheckCircle size={16} />
              <span>Completed Today</span>
            </motion.div>
          ) : (
            <motion.div
              key="action"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Button 
                onClick={onComplete} 
                className="w-full"
              >
                Mark Complete
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function getStageName(stage: number) {
  switch (stage) {
    case 0: return "Seed";
    case 1: return "Sprout";
    case 2: return "Small Plant";
    case 3: return "Growing Plant";
    case 4: return "Healthy Tree";
    case 5: return "Sacred Tree";
    default: return "Unknown";
  }
}
