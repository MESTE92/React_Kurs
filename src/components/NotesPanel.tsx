import { useState, useEffect } from 'react'

type Note = {
  id: string
  title: string
  content: string
  expanded: boolean
}

type NotesStore = Record<string, Note[]>

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

function getUserId(): string {
  let id = localStorage.getItem('rk_user_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('rk_user_id', id)
  }
  return id
}

function loadNotes(userId: string): NotesStore {
  try {
    const raw = localStorage.getItem(`rk_notes_${userId}`)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed.expiresAt < Date.now()) {
      localStorage.removeItem(`rk_notes_${userId}`)
      return {}
    }
    return parsed.data ?? {}
  } catch {
    return {}
  }
}

function saveNotes(userId: string, notes: NotesStore) {
  localStorage.setItem(`rk_notes_${userId}`, JSON.stringify({
    data: notes,
    expiresAt: Date.now() + ONE_YEAR,
  }))
}

// ── Einzelner Notizzettel ──────────────────────────────────────────────────

interface NoteCardProps {
  note: Note
  onUpdate: (id: string, changes: Partial<Note>) => void
  onDelete: (id: string) => void
}

function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  return (
    <div style={{
      background: '#fefce8',
      border: '1px solid #fde68a',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      flexShrink: 0,
    }}>
      {/* Kopfzeile */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '8px 10px',
        borderBottom: note.expanded ? '1px solid #fde68a' : 'none',
        background: '#fffbeb',
      }}>
        <button
          onClick={() => onUpdate(note.id, { expanded: !note.expanded })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#92400e', padding: 0, fontSize: '11px', flexShrink: 0 }}
        >
          {note.expanded ? '▾' : '▸'}
        </button>
        <input
          value={note.title}
          onChange={e => onUpdate(note.id, { title: e.target.value })}
          style={{
            flex: 1, border: 'none', background: 'transparent',
            fontSize: '13px', fontWeight: 600, color: '#78350f',
            outline: 'none', minWidth: 0,
          }}
        />
        <button
          onClick={() => onDelete(note.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b45309', fontSize: '16px', padding: 0, lineHeight: 1, flexShrink: 0 }}
          title="Notiz löschen"
        >
          ×
        </button>
      </div>

      {/* Inhalt */}
      {note.expanded && (
        <textarea
          value={note.content}
          onChange={e => onUpdate(note.id, { content: e.target.value })}
          placeholder="Notiz eingeben..."
          style={{
            display: 'block', width: '100%', minHeight: '80px',
            padding: '8px 10px', border: 'none', background: 'transparent',
            fontSize: '12px', color: '#78350f', resize: 'vertical',
            outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
            boxSizing: 'border-box',
          }}
        />
      )}
    </div>
  )
}

// ── Haupt-Panel ────────────────────────────────────────────────────────────

interface NotesPanelProps {
  lessonId: number
  isOpen: boolean
  onToggle: () => void
}

function NotesPanel({ lessonId, isOpen, onToggle }: NotesPanelProps) {
  const [userId] = useState(getUserId)
  const [allNotes, setAllNotes] = useState<NotesStore>(() => loadNotes(getUserId()))

  const key = String(lessonId)
  const notes = allNotes[key] ?? []

  // Bei jeder Änderung speichern
  useEffect(() => {
    saveNotes(userId, allNotes)
  }, [allNotes, userId])

  function addNote() {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Neue Notiz',
      content: '',
      expanded: true,
    }
    setAllNotes(prev => ({ ...prev, [key]: [...(prev[key] ?? []), newNote] }))
  }

  function updateNote(id: string, changes: Partial<Note>) {
    setAllNotes(prev => ({
      ...prev,
      [key]: (prev[key] ?? []).map(n => n.id === id ? { ...n, ...changes } : n),
    }))
  }

  function deleteNote(id: string) {
    setAllNotes(prev => ({ ...prev, [key]: (prev[key] ?? []).filter(n => n.id !== id) }))
  }

  return (
    <div style={{ display: 'flex', height: '100vh', flexShrink: 0 }}>

      {/* Panel (slide in/out) */}
      <aside style={{
        width: isOpen ? '280px' : '0px',
        minWidth: isOpen ? '280px' : '0px',
        overflow: 'hidden',
        transition: 'width 0.2s ease, min-width 0.2s ease',
        background: '#fffef5',
        borderRight: isOpen ? '1px solid #fde68a' : 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px', borderBottom: '1px solid #fde68a',
          background: '#fefce8', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0, whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#78350f' }}>
            📝 Notizen — Lektion {lessonId}
          </span>
          <button
            onClick={addNote}
            style={{
              background: '#fbbf24', color: '#78350f', border: 'none',
              borderRadius: '6px', padding: '4px 10px', fontSize: '12px',
              fontWeight: 700, cursor: 'pointer',
            }}
          >
            + Neu
          </button>
        </div>

        {/* Scrollbarer Notizen-Bereich */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '12px',
          display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          {notes.length === 0 && (
            <p style={{
              fontSize: '12px', color: '#a16207',
              textAlign: 'center', marginTop: '24px', lineHeight: 1.6,
            }}>
              Noch keine Notizen für diese Lektion.<br />
              Klick <strong>+ Neu</strong> um eine anzulegen.
            </p>
          )}
          {notes.map(note => (
            <NoteCard key={note.id} note={note} onUpdate={updateNote} onDelete={deleteNote} />
          ))}
        </div>
      </aside>

      {/* Schmaler Toggle-Tab */}
      <button
        onClick={onToggle}
        title={isOpen ? 'Notizen schließen' : 'Notizen öffnen'}
        style={{
          width: '22px', flexShrink: 0, background: '#fefce8',
          border: 'none', borderRight: '1px solid #fde68a',
          cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#92400e', fontSize: '10px', fontWeight: 600,
          writingMode: 'vertical-rl', letterSpacing: '0.1em',
          userSelect: 'none',
        }}
      >
        {isOpen ? '◂ Notizen' : 'Notizen ▸'}
      </button>

    </div>
  )
}

export default NotesPanel
