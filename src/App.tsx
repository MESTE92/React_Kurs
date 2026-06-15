// Haupt-App: verbindet Sidebar + LessonView
import { useState, useMemo } from 'react'
import { chapters } from './data/lessons'
import Sidebar from './components/Sidebar'
import LessonView from './components/LessonView'

// Alle Lektionen als flaches Array
const allLessons = chapters.flatMap(ch => ch.lessons)
const totalLessons = allLessons.length

function App() {
  const [currentId, setCurrentId] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Aktuelle Lektion aus ID ermitteln
  const lesson = useMemo(
    () => allLessons.find(l => l.id === currentId) ?? allLessons[0],
    [currentId]
  )

  function goNext() {
    if (currentId < totalLessons) setCurrentId(id => id + 1)
  }
  function goPrev() {
    if (currentId > 1) setCurrentId(id => id - 1)
  }

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: '#faf8fc', color: '#2d1b4e',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Sidebar */}
      <Sidebar
        chapters={chapters}
        currentLessonId={currentId}
        onSelect={setCurrentId}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
      />

      {/* Haupt-Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <LessonView
          lesson={lesson}
          totalLessons={totalLessons}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>
    </div>
  )
}

export default App
