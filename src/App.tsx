// Haupt-App: verbindet Sidebar + LessonView
import { useState, useMemo, useEffect } from 'react'
import { loader } from '@monaco-editor/react'
import { chapters } from './data/lessons'
import Sidebar from './components/Sidebar'
import LessonView from './components/LessonView'
import NotesPanel from './components/NotesPanel'

// Monaco sofort im Hintergrund laden — ist bereit bevor der User "Editieren" klickt
loader.init()

const allLessons = chapters.flatMap(ch => ch.lessons)
const totalLessons = allLessons.length

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

function getUserId(): string {
  let id = localStorage.getItem('rk_user_id')
  if (!id) { id = crypto.randomUUID(); localStorage.setItem('rk_user_id', id) }
  return id
}

function loadEditedCodes(userId: string): Record<number, string[]> {
  try {
    const raw = localStorage.getItem(`rk_edit_codes_${userId}`)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed.expiresAt < Date.now()) {
      localStorage.removeItem(`rk_edit_codes_${userId}`)
      return {}
    }
    return parsed.data ?? {}
  } catch { return {} }
}

function saveEditedCodes(userId: string, codes: Record<number, string[]>) {
  localStorage.setItem(`rk_edit_codes_${userId}`, JSON.stringify({
    data: codes,
    expiresAt: Date.now() + ONE_YEAR,
  }))
}

function App() {
  const [currentId, setCurrentId] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notesOpen, setNotesOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const userId = getUserId()
  const [editedCodes, setEditedCodes] = useState<Record<number, string[]>>(
    () => loadEditedCodes(userId)
  )

  const lesson = useMemo(
    () => allLessons.find(l => l.id === currentId) ?? allLessons[0],
    [currentId]
  )

  useEffect(() => {
    saveEditedCodes(userId, editedCodes)
  }, [editedCodes, userId])

  function goNext() {
    if (currentId < totalLessons) setCurrentId(id => id + 1)
  }
  function goPrev() {
    if (currentId > 1) setCurrentId(id => id - 1)
  }

  // Edits der aktuellen Lektion — falls noch keine: Originalcode als Startwert
  const currentEditedCodes = editedCodes[currentId] ?? lesson.files.map(f => f.code)

  function handleEditChange(fileIndex: number, code: string) {
    setEditedCodes(prev => {
      const current = prev[currentId] ?? lesson.files.map(f => f.code)
      const updated = [...current]
      updated[fileIndex] = code
      return { ...prev, [currentId]: updated }
    })
  }

  function handleResetEdit() {
    setEditedCodes(prev => {
      const next = { ...prev }
      delete next[currentId]
      return next
    })
  }

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: '#faf8fc', color: '#2d1b4e',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <Sidebar
        chapters={chapters}
        currentLessonId={currentId}
        onSelect={setCurrentId}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
      />

      <NotesPanel
        lessonId={currentId}
        isOpen={notesOpen}
        onToggle={() => setNotesOpen(o => !o)}
      />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <LessonView
          lesson={lesson}
          totalLessons={totalLessons}
          onPrev={goPrev}
          onNext={goNext}
          editMode={editMode}
          onToggleEdit={() => setEditMode(m => !m)}
          editedCodes={currentEditedCodes}
          onEditChange={handleEditChange}
          onResetEdit={handleResetEdit}
        />
      </div>
    </div>
  )
}

export default App
