import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="28" height="28" rx="7" fill="var(--color-primary)" opacity="0.12"/>
            <path d="M8 20L14 8L20 20" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 16H18" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
          MLN122 — Chương 3.1
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
          Lý luận của C. Mác về giá trị thặng dư
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          Kinh tế Chính trị Mác - Lênin
        </p>
      </div>
    </footer>
  )
}
