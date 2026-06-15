// Seitenleiste: Kapitel und Lektionen als klickbare Liste
import type { Chapter } from '../types'

interface SidebarProps {
  chapters: Chapter[]
  currentLessonId: number
  onSelect: (id: number) => void
  isOpen: boolean
  onToggle: () => void
}

// Farben pro Kategorie — alle aus der Lila-Familie, leicht variiert
const CATEGORY_COLORS: Record<string, string> = {
  'Grundlagen':     '#7c3aed',
  'Hooks':          '#9333ea',
  'Fortgeschritten':'#a855f7',
  'Praxisprojekt':  '#6d28d9',
}

function Sidebar({ chapters, currentLessonId, onSelect, isOpen, onToggle }: SidebarProps) {
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
        {/* Logo */}
        <div style={{
          padding: '20px 16px 16px', borderBottom: '1px solid #e6ddf3',
          background: '#ffffff',
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7c3aed' }}>
            ⚛ React Kurs
          </div>
          <div style={{ fontSize: '12px', color: '#9d8bc0', marginTop: '4px' }}>
            Vite + TypeScript · 31 Lektionen
          </div>
        </div>

        {/* Kapitel und Lektionen */}
        <nav style={{ padding: '8px 0' }}>
          {chapters.map(chapter => (
            <div key={chapter.title}>
              {/* Kapitel-Header */}
              <div style={{
                padding: '12px 16px 6px',
                fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                color: '#9d8bc0', letterSpacing: '0.08em',
              }}>
                {chapter.title}
              </div>

              {/* Lektionen */}
              {chapter.lessons.map(lesson => {
                const isActive = lesson.id === currentLessonId
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
                    {/* Lektion-Nummer */}
                    <span style={{
                      minWidth: '22px', height: '22px', borderRadius: '50%',
                      background: isActive ? color : '#e6ddf3',
                      color: isActive ? '#fff' : '#9d8bc0',
                      fontSize: '11px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontWeight: 600,
                    }}>
                      {lesson.id}
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
