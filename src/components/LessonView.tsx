// Rendert den Inhalt einer einzelnen Lektion
import { useState, useEffect } from 'react'
import type { Lesson } from '../types'
import CodeViewer from './CodeViewer'

interface LessonViewProps {
  lesson: Lesson
  totalLessons: number
  onPrev: () => void
  onNext: () => void
  editMode: boolean
  onToggleEdit: () => void
  editedCodes: string[]
  onEditChange: (fileIndex: number, code: string) => void
  onResetEdit: () => void
  isCompleted: boolean
  onToggleComplete: () => void
}

// Keyframe-Animation einmalig in den DOM injizieren
function injectAnimationStyle() {
  if (document.getElementById('rk-progress-style')) return
  const style = document.createElement('style')
  style.id = 'rk-progress-style'
  style.textContent = `
    @keyframes rk-pop {
      0%   { transform: scale(1); }
      40%  { transform: scale(1.13); }
      70%  { transform: scale(0.96); }
      100% { transform: scale(1); }
    }
    .rk-pop { animation: rk-pop 0.38s ease; }
  `
  document.head.appendChild(style)
}

function renderExplanation(text: string) {
  const parts = text.split('\n')
  return parts.map((line, i) => {
    const formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    const withCode = formatted.replace(/`([^`]+)`/g, (_, m) => {
      const escaped = m.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return `<code style="background:#f3edfb;padding:2px 6px;border-radius:3px;font-size:0.9em;color:#7c3aed">${escaped}</code>`
    })
    return (
      <p key={i} style={{ marginBottom: '8px', lineHeight: '1.7', color: '#6b5b8c' }}
         dangerouslySetInnerHTML={{ __html: withCode }} />
    )
  })
}

const CATEGORY_COLORS: Record<string, string> = {
  'Grundlagen':      '#7c3aed',
  'Hooks':           '#9333ea',
  'Fortgeschritten': '#a855f7',
  'Praxisprojekt':   '#6d28d9',
}

function LessonView({ lesson, totalLessons, onPrev, onNext, editMode, onToggleEdit, editedCodes, onEditChange, onResetEdit, isCompleted, onToggleComplete }: LessonViewProps) {
  const color = CATEGORY_COLORS[lesson.category] ?? '#7c3aed'
  const progress = Math.round((lesson.id / totalLessons) * 100)
  const [popAnim, setPopAnim] = useState(false)

  useEffect(() => { injectAnimationStyle() }, [])

  function handleToggleComplete() {
    const willComplete = !isCompleted
    onToggleComplete()
    if (willComplete) {
      setPopAnim(false)
      // kurzes Timeout damit die Klasse neu gesetzt wird auch wenn sie schon drauf war
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPopAnim(true))
      })
      setTimeout(() => setPopAnim(false), 400)
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

      {/* Progress Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: '#9d8bc0' }}>Fortschritt</span>
          <span style={{ fontSize: '12px', color: '#9d8bc0' }}>Lektion {lesson.id} / {totalLessons}</span>
        </div>
        <div style={{ height: '4px', background: '#e6ddf3', borderRadius: '2px' }}>
          <div style={{
            height: '100%', width: `${progress}%`, background: color,
            borderRadius: '2px', transition: 'width 0.3s',
          }} />
        </div>
      </div>

      {/* Kategorie-Badge + Titel */}
      <div style={{ marginBottom: '8px' }}>
        <span style={{
          fontSize: '11px', padding: '3px 10px', borderRadius: '12px',
          background: `${color}1f`, color: color, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          {lesson.category}
        </span>
      </div>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#2d1b4e', marginBottom: '20px' }}>
        {lesson.title}
      </h1>

      {/* Lernziele */}
      {lesson.learningGoals && lesson.learningGoals.length > 0 && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderLeft: '4px solid #16a34a',
          borderRadius: '8px', padding: '16px', marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(22,163,74,0.06)',
        }}>
          <h3 style={{ fontSize: '13px', color: '#15803d', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            🎯 Nach dieser Lektion kannst du...
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {lesson.learningGoals.map((goal, i) => (
              <li key={i} style={{ color: '#166534', fontSize: '13.5px', marginBottom: '4px', lineHeight: 1.6 }}>
                {goal}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Erklärungstext */}
      <div style={{
        background: '#ffffff', border: `1px solid ${color}33`,
        borderRadius: '8px', padding: '20px', marginBottom: '20px',
        borderLeft: `4px solid ${color}`,
        boxShadow: '0 1px 3px rgba(124,58,237,0.06)',
      }}>
        {renderExplanation(lesson.explanation)}
      </div>

      {/* Key Points */}
      {lesson.keyPoints && lesson.keyPoints.length > 0 && (
        <div style={{
          background: '#f7f3fc', border: '1px solid #e6ddf3',
          borderRadius: '8px', padding: '16px', marginBottom: '20px',
        }}>
          <h3 style={{ fontSize: '13px', color: '#9d8bc0', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            📌 Merke dir
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {lesson.keyPoints.map((point, i) => (
              <li key={i} style={{ color: '#6b5b8c', fontSize: '13.5px', marginBottom: '4px' }}>
                <code style={{ fontSize: '0.9em' }}
                      dangerouslySetInnerHTML={{
                        __html: point.replace(/`([^`]+)`/g, '<span style="color:#7c3aed">$1</span>')
                      }} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Code-Dateien mit Tabs */}
      {lesson.files.length > 0 && (
        <div>
          <h3 style={{ fontSize: '14px', color: '#9d8bc0', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            💻 Code
          </h3>
          <CodeViewer
            files={lesson.files}
            editMode={editMode}
            onToggleEdit={onToggleEdit}
            editedCodes={editedCodes}
            onEditChange={onEditChange}
            onResetEdit={onResetEdit}
          />
        </div>
      )}

      {/* Navigation */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e6ddf3',
      }}>
        <button
          onClick={onPrev}
          disabled={lesson.id === 0}
          style={{
            padding: '10px 20px', borderRadius: '6px', cursor: lesson.id === 0 ? 'not-allowed' : 'pointer',
            background: lesson.id === 0 ? '#f3edfb' : '#ffffff',
            color: lesson.id === 0 ? '#c9bce0' : '#2d1b4e',
            border: '1px solid #e6ddf3', fontSize: '14px',
          }}
        >
          ← Vorherige
        </button>

        {/* Abgeschlossen-Toggle — Mitte der Navigationsleiste */}
        <button
          onClick={handleToggleComplete}
          className={popAnim ? 'rk-pop' : ''}
          style={{
            padding: '10px 24px',
            borderRadius: '24px',
            border: isCompleted ? 'none' : '2px solid #d1d5db',
            background: isCompleted ? '#16a34a' : 'transparent',
            color: isCompleted ? '#fff' : '#6b7280',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.25s, color 0.25s, border-color 0.25s, box-shadow 0.25s',
            boxShadow: isCompleted ? '0 2px 12px rgba(22,163,74,0.35)' : 'none',
          }}
        >
          <span style={{ fontSize: '16px' }}>{isCompleted ? '✓' : '○'}</span>
          {isCompleted ? 'Abgeschlossen' : 'Als Abgeschlossen markieren'}
        </button>

        <button
          onClick={onNext}
          disabled={lesson.id === totalLessons}
          style={{
            padding: '10px 20px', borderRadius: '6px',
            cursor: lesson.id === totalLessons ? 'not-allowed' : 'pointer',
            background: lesson.id === totalLessons ? '#f3edfb' : color,
            color: lesson.id === totalLessons ? '#c9bce0' : '#fff',
            border: 'none', fontSize: '14px', fontWeight: 600,
          }}
        >
          Nächste →
        </button>
      </div>
    </div>
  )
}

export default LessonView
