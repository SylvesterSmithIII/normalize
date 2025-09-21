"use client";

import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 overflow-hidden">

      {/* Tape 1 */}
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: "100vw" }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute top-1/3 left-0 w-full -rotate-6 z-20 pointer-events-none"
      >
        <div className="bg-yellow-400 border-4 border-black px-1 sm:px-6 py-1 sm:py-3 shadow-xl text-black text-xs sm:text-lg md:text-2xl font-extrabold tracking-widest rounded-none flex justify-center select-none overflow-x-auto" style={{whiteSpace: 'normal'}}>
          <span className="block min-w-full text-center">
            🚧 CONSTRUCTION TAPE - COMING SOON 🚧 CONSTRUCTION TAPE - COMING SOON 🚧
          </span>
        </div>
      </motion.div>

      {/* Tape 2 */}
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: "-100vw" }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute top-1/2 left-0 w-full rotate-6 z-20 pointer-events-none"
      >
        <div className="bg-yellow-400 border-4 border-black px-1 sm:px-6 py-1 sm:py-3 shadow-xl text-black text-xs sm:text-lg md:text-2xl font-extrabold tracking-widest rounded-none flex justify-center select-none overflow-x-auto" style={{whiteSpace: 'normal'}}>
          <span className="block min-w-full text-center">
            🚧 CONSTRUCTION TAPE - COMING SOON 🚧 CONSTRUCTION TAPE - COMING SOON 🚧
          </span>
        </div>
      </motion.div>

      {/* Message behind tape */}
      <div className="relative z-0 text-center px-4 pt-32 sm:pt-40">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-black mb-4 sm:mb-6 opacity-60">
          Blog Coming Soon
        </h1>
        <p className="mt-2 sm:mt-4 text-black text-base sm:text-lg md:text-xl max-w-sm sm:max-w-lg mx-auto opacity-60">
          We’re working on something exciting. Stay tuned!
        </p>
      </div>
    </div>
  );
}
