import { motion } from 'framer-motion'

export function SectionHeader({ cluster, number, title, subtitle }) {
  return (
    <div className="mb-8">
      <p className="section-cluster-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        Cụm {number} — {cluster}
      </p>
      <h2 className="section-title reveal">{title}</h2>
      {subtitle && <p className="section-lead reveal">{subtitle}</p>}
    </div>
  )
}
