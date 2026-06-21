import MindMapView from './MindMapView'
import { chapterData } from '../../services/ragService'

export default function MindMapPage() {
  return (
    <div className="page-wrapper">
      <aside className="sidebar-nav" role="navigation" aria-label="Điều hướng bài học">
        <nav>
          <div className="nav-cluster">
            <div className="nav-cluster-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Mind Map
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Bản đồ tư duy tự động tạo từ nội dung bài học Chương {chapterData.chapterNumber}.
              Di chuyển và phóng to/thu nhỏ để xem chi tiết.
            </p>
          </div>
        </nav>
      </aside>

      <main className="main-content" role="main">
        <div className="hero-section" style={{ padding: '2rem 3rem' }}>
          <h1 className="chapter-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            Mind Map — {chapterData.chapterTitle}
          </h1>
          <p className="chapter-subtitle">
            Bản đồ tư duy tự động tạo từ nội dung bài học. Mỗi nút đại diện cho một phần kiến thức.
          </p>
        </div>
        <div className="mind-map-page-content">
          <MindMapView />
        </div>
      </main>
    </div>
  )
}
