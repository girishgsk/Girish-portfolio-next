"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Cycles through roles. All roles also exist in sr-only text so crawlers read them. */
export function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden className="relative inline-flex h-[1.35em] overflow-hidden align-bottom">
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-accent"
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}
