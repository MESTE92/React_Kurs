// Zeigt Code-Dateien mit klickbaren Tabs — eine Datei = ein Tab
import { useState } from 'react'
import type { CodeFile } from '../types'

interface CodeViewerProps {
  files: CodeFile[]
  preview?: string
}

// Wendet Regex nur auf Textnodes an — überspringt bereits gesetzte HTML-Spans
function sr(html: string, regex: RegExp, replacement: string): string {
  return html.split(/(<[^>]*>)/).map(part =>
    part.startsWith('<') ? part : part.replace(regex, replacement)
  ).join('')
}

// Klammern pro Verschachtelungstiefe einfärben
// {} immer grün (JSX-Expressions), () [] tiefen-basiert
// Inhalt innerhalb bereits gesetzter <span>-Tags wird übersprungen
function colorizeBrackets(html: string): string {
  const COLORS = ['#ffd700', '#c586c0', '#9cdcfe']
  const CURLY = '#4ade80'
  const stack: number[] = []
  let result = ''
  let i = 0
  let spanDepth = 0

  while (i < html.length) {
    if (html[i] === '<') {
      const end = html.indexOf('>', i)
      if (end === -1) { result += html.slice(i); break }
      const tag = html.slice(i, end + 1)
      if (tag.startsWith('<span')) spanDepth++
      else if (tag.startsWith('</span')) spanDepth--
      result += tag
      i = end + 1
      continue
    }
    if (spanDepth > 0) {
      result += html[i++]
      continue
    }
    const ch = html[i]
    if ('([{'.includes(ch)) {
      const color = ch === '{' ? CURLY : COLORS[stack.length % COLORS.length]
      stack.push(stack.length)
      result += `<span style="color:${color}">${ch}</span>`
    } else if (')]}'.includes(ch)) {
      const depth = stack.length > 0 ? stack.pop()! : 0
      const color = ch === '}' ? CURLY : COLORS[depth % COLORS.length]
      result += `<span style="color:${color}">${ch}</span>`
    } else {
      result += ch
    }
    i++
  }
  return result
}

// Syntax-Highlighting: Farben pro Token-Typ
function highlight(code: string, lang: string): string {
  if (lang === 'bash') {
    return code
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/(#.+)/g, '<span style="color:#6a9955">$1</span>')
  }

  if (lang === 'css') {
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    let r = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#6a9955">$1</span>')
    r = sr(r, /(\.[a-zA-Z][a-zA-Z0-9_-]*)/g,  '<span style="color:#ffd700">$1</span>')
    r = sr(r, /(@[a-zA-Z-]+)/g,               '<span style="color:#569cd6">$1</span>')
    r = sr(r, /\b([a-z][a-z0-9-]+)(?=\s*:)/g, '<span style="color:#9cdcfe">$1</span>')
    return colorizeBrackets(r)
  }

  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // JSX-Kommentare {/* ... */} zuerst — verhindert dass Keywords darin eingefärbt werden
  let r = escaped.replace(
    /\{(\/\*[\s\S]*?\*\/)\}/g,
    '<span style="color:#6a9955">{$1}</span>'
  )

  // Backtick-Strings auf rohem Text — noch keine Spans vorhanden
  r = r.replace(/(`[^`]*`)/g, '<span style="color:#ce9178">$1</span>')

  // Ab hier sr(): jede Regel überspringt bereits gesetzte <span>-Tags
  r = sr(r, /('[^']*')/g,              '<span style="color:#ce9178">$1</span>')
  r = sr(r, /("(?:[^"\\]|\\.)*")/g,   '<span style="color:#ce9178">$1</span>')
  r = sr(r, /(\/\/.*)/g,              '<span style="color:#6a9955">$1</span>')
  r = sr(r, /\bfunction\s+([A-Za-z_$][A-Za-z0-9_$]*)/g,
    'function <span style="color:#e879f9">$1</span>')
  r = sr(r, /\b(const|let)\s+([A-Z][A-Za-z0-9_$]*)\s*=/g,
    '$1 <span style="color:#e879f9">$2</span> =')
  r = sr(r, /\b(import|export|from|default|function|return|const|let|var|if|else|for|while|async|await|try|catch|finally|new|type|interface|extends|implements|class|null|undefined|true|false|typeof|instanceof)\b/g,
    '<span style="color:#569cd6">$1</span>')
  r = sr(r, /\b(string|number|boolean|void|never|any|unknown|ReactNode|ReactElement)\b/g,
    '<span style="color:#4ec9b0">$1</span>')
  // <a> und </a> → grün (vor dem allgemeinen lowercase-Tag-Pass)
  r = sr(r, /(&lt;\/?a(?=[\s&]))/g,      '<span style="color:#4ade80">$1</span>')
  // Uppercase-Komponenten und lowercase-HTML-Tags → orange
  r = sr(r, /(&lt;\/?[A-Za-z][a-zA-Z0-9]*)/g, '<span style="color:#f97316">$1</span>')

  return colorizeBrackets(r)
}

// Sprach-Label für Tab
const LANG_LABELS: Record<string, string> = {
  tsx: 'TSX', ts: 'TS', css: 'CSS', json: 'JSON', html: 'HTML', bash: 'BASH',
}

// HTML-Rahmen für den Output-iframe
function buildPreviewDoc(content: string): string {
  return `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;padding:24px;color:#1a1a2e;background:#fff;line-height:1.6}
h1{font-size:22px;font-weight:700;margin-bottom:8px}
h2{font-size:17px;font-weight:600;margin-bottom:6px}
p{color:#555;margin-bottom:6px}
a{color:#7c3aed;text-decoration:none}a:hover{text-decoration:underline}
button{cursor:pointer;font-family:inherit;background:#f3f4f6;border:1px solid #d1d5db;padding:5px 14px;border-radius:5px;font-size:14px}
button:hover{background:#e5e7eb}
input,select{font-family:inherit;padding:6px 10px;border:1px solid #d1d5db;border-radius:4px;font-size:14px;outline:none}
input:focus{border-color:#7c3aed}
ul,ol{padding-left:20px}li{margin-bottom:4px;color:#555}
nav{display:flex;gap:16px;margin-top:6px}
footer{color:#888;font-size:13px}
header{border-bottom:1px solid #e5e7eb;padding-bottom:12px;margin-bottom:12px}
</style></head><body>${content}</body></html>`
}

const OUTPUT_TAB = -1

function CodeViewer({ files, preview }: CodeViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const isOutput = activeIndex === OUTPUT_TAB
  const activeFile = isOutput ? null : files[activeIndex]

  function handleCopy() {
    if (!activeFile) return
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

        {/* Output-Tab — nur wenn preview vorhanden */}
        {preview && (
          <button
            onClick={() => setActiveIndex(OUTPUT_TAB)}
            style={{
              padding: '8px 16px', border: 'none', cursor: 'pointer',
              background: isOutput ? '#0f2a1a' : 'transparent',
              color: isOutput ? '#4ade80' : '#4ade80aa',
              borderBottom: isOutput ? '2px solid #4ade80' : '2px solid transparent',
              fontSize: '13px', whiteSpace: 'nowrap', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <span style={{
              fontSize: '10px', padding: '1px 5px',
              background: isOutput ? '#166534' : '#333',
              borderRadius: '3px', color: '#4ade80',
            }}>
              ▶
            </span>
            Output
          </button>
        )}

        {/* Copy-Button rechts — nur bei Code-Tabs */}
        {!isOutput && (
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
        )}
      </div>

      {/* Output-Vorschau */}
      {isOutput && preview ? (
        <div style={{ background: '#fff', height: '320px' }}>
          <iframe
            srcDoc={buildPreviewDoc(preview)}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            sandbox="allow-scripts"
            title="Output-Vorschau"
          />
        </div>
      ) : (
        /* Code-Bereich */
        <div style={{
          background: '#1a1a2e', padding: '20px', overflowX: 'auto', maxHeight: '480px',
          overflowY: 'auto',
        }}>
          <pre style={{ margin: 0, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '13.5px', lineHeight: '1.7', color: '#e2e8f0' }}>
            <code dangerouslySetInnerHTML={{
              __html: highlight(activeFile!.code, activeFile!.language),
            }} />
          </pre>
        </div>
      )}
    </div>
  )
}

export default CodeViewer
