import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AchievementUnlockOverlayProps {
  info: { id: string; name: string; icon: string; description: string } | null
  onDismiss: () => void
}

export function AchievementUnlockOverlay({ info, onDismiss }: AchievementUnlockOverlayProps) {
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
          className="fixed inset-0 z-[99] flex items-center justify-center bg-black/60"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded border border-border bg-card/90">
              <span className="text-3xl">{info.icon}</span>
            </div>
            <div className="rounded border border-border bg-card/90 px-6 py-2 text-center">
              <p className="text-xs text-muted-foreground">成就解锁</p>
              <p className="text-lg font-semibold text-foreground">{info.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{info.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
