import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'

export default function Navbar({ theme, onThemeToggle, clusters, activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 bg-[var(--color-bg-surface)]/95 backdrop-blur-xl border-b border-[var(--color-border)] shadow-sm'
          : 'py-4 bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-2.5 font-serif font-bold text-base text-[var(--color-text-primary)] no-underline"
          aria-label="MLN122 về đầu trang"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="28" height="28" rx="7" fill="var(--color-primary)" opacity="0.12"/>
            <path d="M8 20L14 8L20 20" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 16H18" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="hidden sm:inline">
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.05em' }}>
              MLN122
            </span>
            <span style={{ color: 'var(--color-text-primary)' }}>
              {' '}— Chương 3.1
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <button
            onClick={onThemeToggle}
            className="theme-toggle"
            aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-bg-muted)] border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Mở menu điều hướng"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[var(--color-bg-surface)] border-t border-[var(--color-border)]"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
              {clusters.map((cluster) => (
                <div key={cluster.id}>
                  <p className="nav-cluster-label mb-1">{cluster.label}</p>
                  <div className="flex flex-wrap gap-1">
                    {cluster.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { onNavigate(item.id); setMobileOpen(false) }}
                        className={`nav-item text-sm ${activeSection === item.id ? 'active' : ''}`}
                      >
                        <span className="nav-item-dot" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
