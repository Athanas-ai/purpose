import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useCreateResponse } from "@/hooks/use-response";

interface ProposalButtonsProps {
  onResponse: (answer: "YES" | "NO") => void;
}

export function ProposalButtons({ onResponse }: ProposalButtonsProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const createResponse = useCreateResponse();

  const handleYesClick = () => {
    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffffff', '#f0f0f0', '#e0e0e0'] // Minimal monochrome confetti
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffffff', '#f0f0f0', '#e0e0e0']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Send response to API
    createResponse.mutate({ answer: "YES", attempts });
    
    // Notify parent
    onResponse("YES");
  };

  const moveNoButton = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120; // Approx width
    const buttonHeight = 50; // Approx height
    
    // Calculate safe area (screen bounds minus padding)
    // Using fixed values to ensure it stays somewhat central but erratic
    const maxMoveX = Math.min(window.innerWidth / 2 - buttonWidth, 150);
    const maxMoveY = Math.min(window.innerHeight / 3 - buttonHeight, 200);

    const newX = (Math.random() - 0.5) * 2 * maxMoveX;
    const newY = (Math.random() - 0.5) * 2 * maxMoveY;

    setNoButtonPosition({ x: newX, y: newY });
    setAttempts(prev => prev + 1);
  };

  const handleNoClick = () => {
    // In case they manage to click it (e.g. keyboard nav or very fast tap)
    createResponse.mutate({ answer: "NO", attempts: attempts + 1 });
    onResponse("NO");
  };

  // Messages based on attempts
  const getNervousText = () => {
    if (attempts >= 8) return "Maybe this is a sign.";
    if (attempts >= 5) return "It really does not want to be pressed.";
    if (attempts >= 2) return "That button seems nervous.";
    return null;
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={containerRef}>
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12 relative z-10 min-h-[200px] justify-center">
        {/* YES BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-12 py-4 rounded-full font-medium text-lg tracking-wide
            bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]
            hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
            transition-shadow duration-300
          "
          onClick={handleYesClick}
        >
          Yes
        </motion.button>

        {/* NO BUTTON */}
        <motion.div
          animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative inline-block"
        >
          <button
            className="
              px-10 py-4 rounded-full font-medium text-lg tracking-wide
              bg-transparent border border-white/20 text-white/60
              hover:bg-white/5 hover:text-white hover:border-white/40
              transition-colors duration-200
            "
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={handleNoClick}
          >
            No
          </button>
        </motion.div>
      </div>

      {/* Nervous Text */}
      <div className="h-8 mt-8 text-center">
        <AnimatePresence mode="wait">
          {getNervousText() && (
            <motion.p
              key={attempts >= 8 ? "sign" : attempts >= 5 ? "really" : "nervous"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-white/40 font-light tracking-widest uppercase"
            >
              {getNervousText()}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
