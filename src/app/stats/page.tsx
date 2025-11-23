"use client";

import { Layout } from "@/components/Layout";
import { useDhuhaStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StatsPage() {
  const { habits } = useDhuhaStore();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedHabitId, setSelectedHabitId] = useState<string>("dhuha");

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  if (!currentDate) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const selectedHabit = habits[selectedHabitId];
  const history = selectedHabit ? selectedHabit.history : [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8 max-w-2xl mx-auto w-full"
      >
        <motion.div variants={item} className="text-center space-y-2">
           <h2 className="text-4xl font-black text-black font-serif tracking-tight">Your Journey</h2>
           <p className="text-muted-foreground font-medium">Track your consistency over time</p>
        </motion.div>

        {/* Habit Selector */}
        <motion.div variants={item} className="flex overflow-x-auto p-4 gap-3 md:justify-center no-scrollbar">
          {Object.values(habits).map((habit) => (
            <button
              key={habit.id}
              onClick={() => setSelectedHabitId(habit.id)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border-2 hover:cursor-pointer",
                selectedHabitId === habit.id
                  ? "bg-primary text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                  : "bg-white text-muted-foreground border-black/20 hover:border-black hover:text-black"
              )}
            >
              {habit.name}
            </button>
          ))}
        </motion.div>

        <motion.div variants={item} className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 max-w-lg mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-1.5 hover:bg-muted rounded-xl border-2 border-transparent hover:border-black hover:cursor-pointer transition-all">
              <ChevronLeft className="text-black" size={20} strokeWidth={2.5} />
            </button>
            <span className="font-black text-lg text-black uppercase tracking-widest">{monthName} {year}</span>
            <button onClick={nextMonth} className="p-1.5 hover:bg-muted rounded-xl border-2 border-transparent hover:border-black hover:cursor-pointer transition-all">
              <ChevronRight className="text-black" size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="text-[10px] md:text-xs font-black text-black/40 uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {days.map((day, index) => {
              if (!day) return <div key={index} />;
              
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isCompleted = history.includes(dateStr);
              const isToday = dateStr === new Date().toLocaleDateString("en-CA");

              return (
                <div
                  key={index}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-lg text-xs md:text-sm font-bold transition-all duration-300 border-2",
                    isCompleted 
                      ? "bg-primary text-black border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" 
                      : "bg-transparent text-muted-foreground border-transparent hover:border-black/20",
                    isToday && !isCompleted && "border-black text-black bg-accent"
                  )}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
             <p className="text-xs text-muted-foreground uppercase tracking-wider font-black">Total Days</p>
             <p className="text-3xl font-black text-black">{history.length}</p>
          </div>
           <div className="bg-white p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
             <p className="text-xs text-muted-foreground uppercase tracking-wider font-black">Current Streak</p>
             <p className="text-3xl font-black text-orange-500">{selectedHabit?.streak || 0}</p>
          </div>
           <div className="bg-white p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
             <p className="text-xs text-muted-foreground uppercase tracking-wider font-black">Completion Rate</p>
             <p className="text-3xl font-black text-blue-500">{Math.round((history.length / daysInMonth) * 100)}%</p>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
