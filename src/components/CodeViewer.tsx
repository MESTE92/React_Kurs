// Zeigt Code-Dateien mit klickbaren Tabs — eine Datei = ein Tab
import { useState } from 'react'
import type { CodeFile } from '../types'

interface CodeViewerProps {
  files: CodeFile[]
}

// Syntax-Highlighting: Farben pro Token-Typ
function highlight(code: string, lang: string): string {
  if (lang === 'bash') {
    return code
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/(#.+)/g, '<span style="color:#6a9955">$1</span>')
  }

  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return escaped
    // Strings
    .replace(/(`[^`]*`)/g, '<span style="color:#ce9178">$1</span>')
    .replace(/('[^']*')/g, '<span style="color:#ce9178">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span style="color:#ce9178">$1</span>')
    // Kommentare
    .replace(/(\/\/.*)/g, '<span style="color:#6a9955">$1</span>')
    // Keywords
    .replace(/\b(import|export|from|default|function|return|const|let|var|if|else|for|while|async|await|try|catch|finally|new|type|interface|extends|implements|class|null|undefined|true|false|typeof|instanceof)\b/g,
      '<span style="color:#569cd6">$1</span>')
    // Types
    .replace(/\b(string|number|boolean|void|never|any|unknown|ReactNode|ReactElement)\b/g,
      '<span style="color:#4ec9b0">$1</span>')
    // JSX-Tags
    .replace(/(&lt;\/?[A-Z][a-zA-Z]*)/g, '<span style="color:#4ec9b0">$1</span>')
}

// Sprach-Label für Tab
const LANG_LABELS: Record<string, string> = {
  tsx: 'TSX', ts: 'TS', css: 'CSS', json: 'JSON', html: 'HTML', bash: 'BASH',
}

function CodeViewer({ files }: CodeViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const activeFile = files[activeIndex]

  function handleCopy() {
    navigator.clipboard.writeText(activeFile.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      borderRadius: '8px', overflow: 'hidden',
      border: '1px solid #e6ddf3', marginTop: '16px',
    }}>
      {/* Tab-Leiste */}
      <div style={{
        display: 'flex', background: '#1e1e2e', overflowX: 'auto',
        borderBottom: '1px solid #2d2d44',
      }}>
        {files.map((file, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              padding: '8px 16px', border: 'none', cursor: 'pointer',
              background: i === activeIndex ? '#252540' : 'transparent',
              color: i === activeIndex ? '#e2e8f0' : '#888',
              borderBottom: i === activeIndex ? '2px solid #a78bfa' : '2px solid transparent',
              fontSize: '13px', whiteSpace: 'nowrap', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            {/* Label zeigt die Sprache DIESER Datei — nicht der aktiven */}
            <span style={{
              fontSize: '10px', padding: '1px 5px',
              background: i === activeIndex ? '#7c3aed' : '#333',
              borderRadius: '3px', color: '#fff',
            }}>
              {LANG_LABELS[file.language] ?? file.language.toUpperCase()}
            </span>
            {file.name}
          </button>
        ))}

        {/* Copy-Button rechts */}
        <button
          onClick={handleCopy}
          style={{
            marginLeft: 'auto', padding: '8px 14px', background: 'transparent',
            border: 'none', color: copied ? '#4ade80' : '#888',
            cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap',
          }}
        >
          {copied ? '✓ Kopiert' : '📋 Kopieren'}
        </button>
      </div>

      {/* Code-Bereich — bewusst dunkel für Kontrast zur hellen Seite */}
      <div style={{
        background: '#1a1a2e', padding: '20px', overflowX: 'auto', maxHeight: '480px',
        overflowY: 'auto',
      }}>
        <pre style={{ margin: 0, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '13.5px', lineHeight: '1.7', color: '#e2e8f0' }}>
          <code
            dangerouslySetInnerHTML={{
              __html: highlight(activeFile.code, activeFile.language),
            }}
          />
        </pre>
      </div>
    </div>
  )
}

export default CodeViewer
