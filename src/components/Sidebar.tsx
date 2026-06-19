// Seitenleiste: Kapitel und Lektionen als klickbare Liste
import type { Chapter } from '../types'

interface SidebarProps {
  chapters: Chapter[]
  currentLessonId: number
  onSelect: (id: number) => void
  isOpen: boolean
  onToggle: () => void
  completedIds: Set<number>
}

const CATEGORY_COLORS: Record<string, string> = {
  'Grundlagen':     '#7c3aed',
  'Hooks':          '#9333ea',
  'Fortgeschritten':'#a855f7',
  'Praxisprojekt':  '#6d28d9',
}

function Sidebar({ chapters, currentLessonId, onSelect, isOpen, onToggle, completedIds }: SidebarProps) {
  const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)
  const completedCount = completedIds.size

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        style={{
          display: 'none',
          position: 'fixed', top: '12px', left: '12px', zIndex: 200,
          background: '#7c3aed', border: 'none', borderRadius: '6px',
          color: '#fff', padding: '8px 12px', cursor: 'pointer', fontSize: '18px',
        }}
        className="mobile-toggle"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside style={{
        width: '280px', minWidth: '280px', background: '#f3edfb',
        borderRight: '1px solid #e6ddf3', overflowY: 'auto',
        height: '100vh', position: 'sticky', top: 0,
        transition: 'transform 0.2s',
      }}>
        {/* Logo + Fortschritt */}
        <div style={{
          padding: '20px 16px 16px', borderBottom: '1px solid #e6ddf3',
          background: '#ffffff',
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7c3aed' }}>
            ⚛ React Kurs
          </div>
          <div style={{ fontSize: '12px', color: '#9d8bc0', marginTop: '4px' }}>
            Vite + TypeScript · {totalLessons} Lektionen
          </div>

          {/* Fortschrittsanzeige */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '11px', color: '#9d8bc0' }}>Abgeschlossen</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: completedCount > 0 ? '#16a34a' : '#9d8bc0' }}>
                {completedCount} / {totalLessons}
              </span>
            </div>
            <div style={{ height: '4px', background: '#e6ddf3', borderRadius: '2px' }}>
              <div style={{
                height: '100%',
                width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%`,
                background: '#16a34a',
                borderRadius: '2px',
                transition: 'width 0.4s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Kapitel und Lektionen */}
        <nav style={{ padding: '8px 0' }}>
          {chapters.map(chapter => (
            <div key={chapter.title}>
              <div style={{
                padding: '12px 16px 6px',
                fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                color: '#9d8bc0', letterSpacing: '0.08em',
              }}>
                {chapter.title}
              </div>

              {chapter.lessons.map(lesson => {
                const isActive = lesson.id === currentLessonId
                const isDone = completedIds.has(lesson.id)
                const color = CATEGORY_COLORS[lesson.category] ?? '#7c3aed'
                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelect(lesson.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      width: '100%', padding: '8px 16px', border: 'none',
                      background: isActive ? `${color}1f` : 'transparent',
                      color: isActive ? color : '#6b5b8c',
                      cursor: 'pointer', textAlign: 'left', fontSize: '13.5px',
                      borderLeft: `3px solid ${isActive ? color : 'transparent'}`,
                      transition: 'all 0.15s',
                    }}
                  >
                    {/* Lektion-Nummer / Abgeschlossen-Indikator */}
                    <span style={{
                      minWidth: '22px', height: '22px', borderRadius: '50%',
                      background: isDone ? '#16a34a' : isActive ? color : '#e6ddf3',
                      color: isDone || isActive ? '#fff' : '#9d8bc0',
                      fontSize: isDone ? '13px' : '11px',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontWeight: 600,
                      transition: 'background 0.3s',
                      flexShrink: 0,
                    }}>
                      {isDone ? '✓' : lesson.id}
                    </span>
                    {lesson.title}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
