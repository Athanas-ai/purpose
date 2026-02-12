import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProposalButtons } from "@/components/ProposalButtons";

export default function Home() {
  const [response, setResponse] = useState<"YES" | "NO" | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!response ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto text-center z-10"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="mb-12 space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-white tracking-tight leading-tight">
                One honest question.
              </h1>
              <p className="text-xl md:text-2xl text-white/50 font-light font-sans tracking-wide">
                Will you be my Valentine?
              </p>
            </motion.div>

            <ProposalButtons onResponse={setResponse} />
          </motion.div>
        ) : response === "YES" ? (
          <motion.div
            key="yes-response"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center z-10 space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-white">
              You just made my day.
            </h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="w-16 h-[1px] bg-white/30 mx-auto" 
            />
            <p className="text-lg text-white/40 font-light tracking-widest uppercase">
              See you soon
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="no-response"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center z-10"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white/80">
              Thank you for being honest.
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer / Copyright - minimal */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-white/10 text-xs font-light tracking-widest">
        2025
      </div>
    </div>
  );
}
