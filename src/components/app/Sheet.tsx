"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "./icons";

export default function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/35"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="absolute inset-x-0 bottom-0 z-50 max-h-[82%] overflow-y-auto rounded-t-[28px] bg-white px-5 pb-8 pt-2 no-scrollbar"
          >
            <div className="mx-auto mt-2 h-[4px] w-[44px] shrink-0 rounded-full bg-[#dcdbde]" />
            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-[18px] font-extrabold text-ir-text">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close sheet"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ir-text active:bg-black/5"
              >
                <ChevronLeft className="h-4 w-4 rotate-[-90deg]" />
              </button>
            </div>
            <div className="mt-3">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
