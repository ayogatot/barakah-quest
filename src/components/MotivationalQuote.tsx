import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const quotes = [
  "Alhamdulillah! May Allah bless your day 🌸",
  "Consistency is beloved to Allah, even if small.",
  "The brightness of your day starts with Dhuha.",
  "A charity for every joint in your body.",
  "May this prayer bring you peace and barakah.",
  "Keep growing your spiritual garden 🌱",
  "Allah loves those who turn to Him.",
  "Dhuha: The prayer of the repentant (Awwabin).",
  "Shine with the light of Dhuha ✨",
  "Build your palace in Jannah, brick by brick.",
  "Small steps lead to great journeys.",
  "Your heart finds rest in remembrance of Allah.",
];

export function MotivationalQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-4 bg-white/60 rounded-xl border border-border/50 shadow-sm"
    >
      <p className="text-primary font-medium italic">"{quote}"</p>
    </motion.div>
  );
}
