import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  key?: React.Key;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.2 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      exit={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : -8,
        transition: {
          duration: shouldReduceMotion ? 0.15 : 0.32,
          ease: [0.32, 0, 0.67, 0],
        },
      }}
      className="w-full flex-1 flex flex-col overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
}
