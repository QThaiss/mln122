import { motion } from 'framer-motion'
import { ArrowLeft, Map } from 'lucide-react'
import MindMap from '../components/MindMap'

export default function MindMapPage({ onBack, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="page-wrapper"
      style={{ display: 'flex', minHeight: '100vh' }}
    >
      <aside className="sidebar-nav" role="navigation" aria-label="Điều hướng bài học">
        <nav>
          <div className="nav-cluster">
            <div className="nav-cluster-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Map size={14} />
              Sơ đồ bài học
            </div>
          </div>
        </nav>
      </aside>

      <main className="main-content" role="main">
        <div className="section-wrapper" style={{ paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <button
              onClick={onBack}
              className="btn btn-outline"
              style={{ padding: '0.5rem 0.75rem' }}
              aria-label="Quay lại"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <p className="section-cluster-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Công cụ học tập
              </p>
              <h1 className="section-title" style={{ marginBottom: 0 }}>
                Sơ đồ tư duy
              </h1>
            </div>
          </div>

          <p className="section-lead">
            Sơ đồ tư duy tự động tạo từ nội dung bài học. Nhấp vào mỗi nút để xem chi tiết phần tương ứng.
          </p>

          <MindMap onNavigate={onNavigate} />

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Nhấp vào nút <strong style={{ color: 'var(--color-text-primary)' }}>phần</strong> (màu trắng) để nhảy đến nội dung tương ứng
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Dùng <strong style={{ color: 'var(--color-text-primary)' }}>Ctrl + Cuộn chuột</strong> để phóng to/thu nhỏ
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-primary-dark)', flexShrink: 0 }} />
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Kéo thả để di chuyển sơ đồ
              </span>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  )
}
