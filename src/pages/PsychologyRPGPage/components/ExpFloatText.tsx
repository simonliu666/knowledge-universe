import { motion, AnimatePresence } from "framer-motion"
import type { IExpGainEvent } from "@/types"

interface ExpFloatTextProps {
  gains: IExpGainEvent[]
}

export function ExpFloatText({ gains }: ExpFloatTextProps) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[98] flex flex-col items-end gap-1.5">
      <AnimatePresence>
        {gains.map((gain) => (
          <motion.div
            key={gain.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -30 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex items-center gap-2 rounded border border-border bg-card/90 px-2.5 py-1"
          >
            <span className="text-sm font-semibold text-success-text">
              +{gain.amount} EXP
            </span>
            <span className="text-xs text-muted-foreground">{gain.reason}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
