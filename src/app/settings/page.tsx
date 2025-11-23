"use client";

import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { useDhuhaStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { resetProgress } = useDhuhaStore();
  const router = useRouter();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    resetProgress();
    router.replace("/");
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8 max-w-xl mx-auto w-full"
      >
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-black font-serif tracking-tight">Settings</h2>
          <p className="text-muted-foreground font-medium">Manage your preferences</p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-black">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Resetting your progress will clear all your streaks and history. This action cannot be undone.
            </p>
            
            {!confirmReset ? (
              <Button variant="outline" onClick={() => setConfirmReset(true)} className="w-full border-2 border-black hover:cursor-pointer">
                Reset Progress
              </Button>
            ) : (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                <p className="text-sm font-bold text-destructive text-center">Are you sure?</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setConfirmReset(false)} className="flex-1 hover:cursor-pointer">
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleReset} className="flex-1 hover:cursor-pointer">
                    Yes, Reset All
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground font-medium">
          <p>Barakah Quest v0.1.0</p>
          <p>Built with ❤️ for the Ummah</p>
        </div>
      </motion.div>
    </Layout>
  );
}
