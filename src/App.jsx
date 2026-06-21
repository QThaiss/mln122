import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUp, Moon, Sun, BookOpen, BarChart2, List, Brain, Layers, HelpCircle } from 'lucide-react'
import { useScrollReveal } from './hooks/useScrollReveal'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ObjectivesSection from './components/ObjectivesSection'
import ClusterOne from './components/ClusterOne'
import ClusterTwo from './components/ClusterTwo'
import ClusterThree from './components/ClusterThree'
import ClusterFour from './components/ClusterFour'
import Footer from './components/Footer'
import AIChatProvider from './components/AIChat/AIChatProvider'
import MindMapPage from './components/MindMap/MindMapPage'
import FlashcardPage from './components/Flashcards/FlashcardPage'
import QuizPage from './components/Quiz/QuizPage'
import { chapterData } from './services/ragService'

const NAV_CLUSTERS = [
  {
    id: 'cluster1',
    label: 'Tổng quan',
    icon: <BookOpen size={14} />,
    items: [
      { id: 'objectives', label: 'Mục tiêu' },
      { id: 'intro', label: 'Dẫn nhập' },
    ],
  },
  {
    id: 'cluster2',
    label: 'Cơ chế tạo GTD',
    icon: <BarChart2 size={14} />,
    items: [
      { id: 'formula', label: 'Công thức T-H-T\'' },
      { id: 'contradiction', label: 'Mâu thuẫn' },
      { id: 'labor', label: 'Hàng hóa SLĐ' },
      { id: 'production', label: 'Quá trình SX' },
      { id: 'example', label: 'Ví dụ' },
    ],
  },
  {
    id: 'cluster3',
    label: 'Công cụ phân tích',
    icon: <BarChart2 size={14} />,
    items: [
      { id: 'capital', label: 'Tư bản c/v' },
      { id: 'salary', label: 'Tiền công' },
      { id: 'rate-mass', label: 'Tỷ suất & KL' },
      { id: 'methods', label: 'Phương pháp' },
    ],
  },
  {
    id: 'cluster4',
    label: 'Ôn tập',
    icon: <List size={14} />,
    items: [
      { id: 'summary', label: 'Tổng kết' },
      { id: 'keywords', label: 'Từ khóa' },
      { id: 'quiz', label: 'Quiz' },
    ],
  },
]

function TopNav({ theme, onThemeToggle, clusters, activeSection, onNavigate }) {
  return (
    <Navbar
      theme={theme}
      onThemeToggle={onThemeToggle}
      clusters={clusters}
      activeSection={activeSection}
      onNavigate={onNavigate}
    />
  )
}

function PageNav({ clusters, activeSection, onNavigate }) {
  return (
    <aside className="sidebar-nav" role="navigation" aria-label="Điều hướng bài học">
      <nav>
        {clusters.map((cluster) => (
          <div key={cluster.id} className="nav-cluster">
            <div className="nav-cluster-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {cluster.icon}
                {cluster.label}
              </span>
            </div>
            {cluster.items.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="nav-item-dot" />
                {item.label}
              </button>
            ))}
          </div>
        ))}
        <div className="nav-cluster">
          <div className="nav-cluster-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Layers size={14} />
              Công cụ học
            </span>
          </div>
          <Link to="/mindmap" className="nav-item">
            <Brain size={14} />
            Mind Map
          </Link>
          <Link to="/flashcards" className="nav-item">
            <Layers size={14} />
            Flashcards
          </Link>
          <Link to="/quiz" className="nav-item">
            <HelpCircle size={14} />
            Quiz
          </Link>
        </div>
      </nav>
    </aside>
  )
}

function HomePage() {
  const [theme, setTheme] = useState('light')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('objectives')

  useScrollReveal('.reveal', 0.1)

  const handleThemeToggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      return next
    })
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)
      setShowBackToTop(scrollTop > 400)

      const sections = NAV_CLUSTERS.flatMap((c) => c.items.map((i) => i.id))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(id)
  }

  return (
    <>
      <LoadingScreen />

      <div
        className="progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      <TopNav
        theme={theme}
        onThemeToggle={handleThemeToggle}
        clusters={NAV_CLUSTERS}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <motion.button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="Quay về đầu trang"
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Quay về đầu trang"
      >
        <ArrowUp size={18} />
      </motion.button>

      <div className="page-wrapper">
        <PageNav
          clusters={NAV_CLUSTERS}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        <main className="main-content" role="main">
          <HeroSection onStart={() => scrollToSection('objectives')} />
          <ObjectivesSection />
          <ClusterOne />
          <ClusterTwo />
          <ClusterThree />
          <ClusterFour />
          <Footer />
        </main>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AIChatProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mindmap" element={<MindMapPage />} />
          <Route path="/flashcards" element={
            <>
              <FlashcardPage />
              <FloatingNav />
            </>
          } />
          <Route path="/quiz" element={
            <>
              <QuizPage />
              <FloatingNav />
            </>
          } />
        </Routes>
      </AIChatProvider>
    </BrowserRouter>
  )
}

function FloatingNav() {
  return (
    <div className="floating-nav-links">
      <Link to="/" className="floating-nav-btn">
        <BookOpen size={15} />
        Bài học
      </Link>
      <Link to="/mindmap" className="floating-nav-btn">
        <Brain size={15} />
        Mind Map
      </Link>
      <Link to="/flashcards" className="floating-nav-btn">
        <Layers size={15} />
        Flashcards
      </Link>
      <Link to="/quiz" className="floating-nav-btn">
        <HelpCircle size={15} />
        Quiz
      </Link>
    </div>
  )
}

import FloatingChatButton from './components/AIChat/FloatingChatButton'

export default App
