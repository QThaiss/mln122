import { Link } from 'react-router-dom'
import { ArrowLeft, Map, Move, ZoomIn } from 'lucide-react'
import MindMapView from './MindMapView'
import { chapterData } from '../../services/ragService'

export default function MindMapPage() {
  return (
    <div className="mindmap-workspace">
      <header className="mindmap-toolbar">
        <Link to="/" className="mindmap-back-button">
          <ArrowLeft size={17} aria-hidden="true" />
          <span>Quay lại bài học</span>
        </Link>

        <div className="mindmap-toolbar-title">
          <span className="mindmap-toolbar-kicker">
            <Map size={14} aria-hidden="true" />
            Bản đồ tư duy
          </span>
          <h1>Chương {chapterData.chapterNumber}</h1>
        </div>

        <div className="mindmap-toolbar-meta" aria-label="Thông tin sơ đồ">
          <span>12</span>
          <small>Nút kiến thức</small>
        </div>
      </header>

      <main className="mindmap-stage" role="main">
        <section className="mindmap-intro" aria-labelledby="mindmap-title">
          <div>
            <p className="mindmap-eyebrow">Khám phá sơ đồ</p>
            <h2 id="mindmap-title">{chapterData.chapterTitle}</h2>
            <p>Bắt đầu từ trung tâm, sau đó kéo sơ đồ hoặc phóng to để theo dõi từng nhánh kiến thức.</p>
          </div>
          <div className="mindmap-gesture-hint" aria-label="Hướng dẫn thao tác">
            <span><Move size={15} aria-hidden="true" /> Kéo để di chuyển</span>
            <span><ZoomIn size={15} aria-hidden="true" /> Cuộn để phóng to</span>
          </div>
        </section>

        <div className="mindmap-canvas" aria-label="Sơ đồ tư duy chương học">
          <MindMapView />
        </div>

        <p className="mindmap-caption">Sơ đồ được tạo từ các chủ điểm trọng tâm của bài học.</p>
      </main>
    </div>
  )
}
