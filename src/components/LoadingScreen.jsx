import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + Math.random() * 12 + 6
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ pointerEvents: progress >= 100 ? 'none' : 'auto' }}
      aria-live="polite"
      aria-label="Đang tải nội dung"
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="40" height="40" rx="10" fill="var(--color-primary)" opacity="0.15"/>
        <path d="M12 30L20 10L28 30" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 24H26" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round"/>
      </svg>

      <div className="loading-title">MLN122</div>
      <div className="loading-subtitle">Giá trị thặng dư</div>

      <div className="loading-bar-track" role="progressbar" aria-valuenow={Math.round(Math.min(progress, 100))} aria-valuemin={0} aria-valuemax={100}>
        <div className="loading-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>

      <div className="loading-subtitle">{Math.round(Math.min(progress, 100))}%</div>
    </motion.div>
  )
}
