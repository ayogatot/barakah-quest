import { motion } from "framer-motion";
import { EvolutionStage } from "@/lib/store";
import Image from 'next/image'
import SeedImage from '@/assets/seed.png'
import SproutImage from '@/assets/sprout.png'
import SmallPlantImage from '@/assets/small-plant.png'
import GrowingPlantImage from '@/assets/growing-plant.png'
import HealthyTreeImage from '@/assets/healthy-tree.png'
import SacredTreeImage from '@/assets/sacred-tree.png'

interface CharacterProps {
  stage: EvolutionStage;
}

export function Character({ stage }: CharacterProps) {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <motion.div
        key={stage}
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-full flex items-center justify-center"
      >
        {stage === 0 && <Seed />}
        {stage === 1 && <Sprout />}
        {stage === 2 && <SmallPlant />}
        {stage === 3 && <GrowingPlant />}
        {stage === 4 && <HealthyTree />}
        {stage === 5 && <SacredTree />}
      </motion.div>
    </div>
  );
}

function Seed() {
  return (
    <Image src={SeedImage} alt="Seed" className="w-16 h-16 drop-shadow-lg" />
  );
}

function Sprout() {
  return (
    // <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-lg">
    //   <path d="M50 80 Q50 50 50 50" stroke="#4CAF50" strokeWidth="4" fill="none" />
    //   <path d="M50 50 Q30 30 30 50" fill="#81C784" />
    //   <path d="M50 50 Q70 30 70 50" fill="#81C784" />
    // </svg>
    <Image src={SproutImage} alt="Sprout" className="w-24 h-24 drop-shadow-lg" />
  );
}

function SmallPlant() {
  return (
    // <svg viewBox="0 0 100 100" className="w-40 h-40 drop-shadow-lg">
    //   <path d="M50 90 L50 40" stroke="#5D4037" strokeWidth="4" />
    //   <circle cx="50" cy="40" r="20" fill="#66BB6A" />
    //   <circle cx="35" cy="50" r="15" fill="#81C784" />
    //   <circle cx="65" cy="50" r="15" fill="#81C784" />
    // </svg>
    <Image src={SmallPlantImage} alt="Small Plant" className="w-32 h-32 drop-shadow-lg" />
  );
}

function GrowingPlant() {
  return (
    // <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-lg">
    //   <path d="M50 90 L50 30" stroke="#5D4037" strokeWidth="6" />
    //   <circle cx="50" cy="30" r="25" fill="#43A047" />
    //   <circle cx="30" cy="50" r="20" fill="#66BB6A" />
    //   <circle cx="70" cy="50" r="20" fill="#66BB6A" />
    //   <circle cx="50" cy="60" r="15" fill="#81C784" />
    // </svg>
    <Image src={GrowingPlantImage} alt="Growing Plant" className="w-32 h-32 drop-shadow-lg" />
  );
}

function HealthyTree() {
  return (
    // <svg viewBox="0 0 100 100" className="w-56 h-56 drop-shadow-xl">
    //   <path d="M50 90 L50 20" stroke="#3E2723" strokeWidth="8" />
    //   <circle cx="50" cy="30" r="35" fill="#2E7D32" />
    //   <circle cx="25" cy="50" r="25" fill="#388E3C" />
    //   <circle cx="75" cy="50" r="25" fill="#388E3C" />
    //   <circle cx="50" cy="60" r="20" fill="#4CAF50" />
    //   <circle cx="30" cy="25" r="15" fill="#66BB6A" />
    //   <circle cx="70" cy="25" r="15" fill="#66BB6A" />
    // </svg>
    <Image src={HealthyTreeImage} alt="Healthy Tree" className="w-32 h-32 drop-shadow-lg" />
  );
}

function SacredTree() {
  return (
    // <svg viewBox="0 0 100 100" className="w-64 h-64 drop-shadow-2xl">
    //   {/* Glow effect */}
    //   <circle cx="50" cy="50" r="45" fill="#FFD700" opacity="0.2" className="animate-pulse" />
      
    //   <path d="M50 90 L50 20" stroke="#3E2723" strokeWidth="10" />
    //   <circle cx="50" cy="30" r="40" fill="#1B5E20" />
    //   <circle cx="20" cy="50" r="30" fill="#2E7D32" />
    //   <circle cx="80" cy="50" r="30" fill="#2E7D32" />
    //   <circle cx="50" cy="60" r="25" fill="#388E3C" />
      
    //   {/* Flowers */}
    //   <circle cx="30" cy="30" r="5" fill="#E91E63" />
    //   <circle cx="70" cy="30" r="5" fill="#E91E63" />
    //   <circle cx="50" cy="15" r="5" fill="#E91E63" />
    //   <circle cx="20" cy="50" r="5" fill="#E91E63" />
    //   <circle cx="80" cy="50" r="5" fill="#E91E63" />
      
    //   {/* Sparkles */}
    //   <circle cx="40" cy="40" r="2" fill="#FFD700" className="animate-ping" />
    //   <circle cx="60" cy="20" r="2" fill="#FFD700" className="animate-ping delay-300" />
    // </svg>
    <Image src={SacredTreeImage} alt="Sacred Tree" className="w-32 h-32 drop-shadow-lg" />
  );
}
