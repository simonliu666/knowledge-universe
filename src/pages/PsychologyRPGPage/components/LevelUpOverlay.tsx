import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LevelUpOverlayProps {
  info: { level: number; title: string } | null
  onDismiss: () => void
}

export function LevelUpOverlay({ info, onDismiss }: LevelUpOverlayProps) {
  useEffect(() => {
    if (!info) return
    const timer = setTimeout(onDismiss, 2500)
    return () => clearTimeout(timer)
  }, [info, onDismiss])

  return (
    <AnimatePresence>
      {info && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs tracking-widest text-muted-foreground">LEVEL UP</span>
            <span className="text-7xl font-bold text-foreground">{info.level}</span>
            <div className="rounded border border-border bg-card/90 px-6 py-2 text-center">
              <p className="text-xs text-muted-foreground">解锁新称号</p>
              <p className="text-xl font-semibold text-foreground">{info.title}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
