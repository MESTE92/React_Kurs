// Zeigt Code-Dateien mit klickbaren Tabs — eine Datei = ein Tab
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import * as Babel from '@babel/standalone'
import MonacoEditor from '@monaco-editor/react'
import { MemoryRouter, Routes, Route, Link, NavLink, useNavigate, useParams, Outlet, BrowserRouter } from 'react-router-dom'
import { Container, Row, Col, Button, Card, Badge, Alert, ListGroup, Nav, Navbar, Form, Table, Spinner, Modal } from 'react-bootstrap'
import type { CodeFile } from '../types'

interface CodeViewerProps {
  files: CodeFile[]
  preview?: string
  editMode: boolean
  onToggleEdit: () => void
  editedCodes: string[]
  onEditChange: (fileIndex: number, code: string) => void
  onResetEdit: () => void
}

// Live-Vorschau: kompiliert TSX mit Babel und rendert direkt in den DOM
function LivePreview({ files }: { files: CodeFile[] }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null)

  const { Component, error } = useMemo(() => {
    const codeFiles = files
      .filter(f => ['tsx', 'ts', 'jsx', 'js'].includes(f.language))
      .filter(f => !/^(main|index)\.[jt]sx?$/.test(f.name))
    const sorted = [
      ...codeFiles.filter(f => !f.name.toLowerCase().includes('app')),
      ...codeFiles.filter(f => f.name.toLowerCase().includes('app')),
    ]

    const parts: string[] = []
    for (const file of sorted) {
      try {
        const result = Babel.transform(file.code, {
          presets: [
            ['react', { runtime: 'classic' }],
            ['typescript', { isTSX: true, allExtensions: true }],
          ],
          filename: file.name,
        })
        let js = result.code ?? ''
        js = js.replace(/^import\b[\s\S]*?from\s+['"][^'"]*['"];?\s*\n?/gm, '')
        js = js.replace(/^import\s+['"][^'"]*['"];?\s*\n?/gm, '')
        js = js.replace(/\bexport\s+default\s+/g, '')
        js = js.replace(/\bexport\s+(const|let|var|function|class)\b/g, '$1')
        parts.push(js)
      } catch (e: unknown) {
        return { Component: null, error: e instanceof Error ? e.message : String(e) }
      }
    }

    const mainFile = sorted.at(-1)
    const match = mainFile?.code.match(/export\s+default\s+(?:function\s+|class\s+)?(\w+)/)
    const rootName = match?.[1] ?? 'App'

    try {
      const fn = new Function(
        'React',
        'useState', 'useEffect', 'useRef', 'useCallback', 'useMemo',
        'useContext', 'createContext', 'Fragment', 'useReducer', 'memo', 'forwardRef',
        'Routes', 'Route', 'Link', 'NavLink', 'useNavigate', 'useParams', 'Outlet', 'BrowserRouter',
        'Container', 'Row', 'Col', 'Button', 'Card', 'Badge', 'Alert', 'ListGroup', 'Nav', 'Navbar', 'Form', 'Table', 'Spinner', 'Modal',
        parts.join('\n\n') + '\nreturn ' + rootName
      )
      const Component = fn(
        React,
        React.useState, React.useEffect, React.useRef, React.useCallback, React.useMemo,
        React.useContext, React.createContext, React.Fragment, React.useReducer, React.memo, React.forwardRef,
        Routes, Route, Link, NavLink, useNavigate, useParams, Outlet, BrowserRouter,
        Container, Row, Col, Button, Card, Badge, Alert, ListGroup, Nav, Navbar, Form, Table, Spinner, Modal,
      ) as React.ComponentType
      return { Component, error: null }
    } catch (e: unknown) {
      return { Component: null, error: e instanceof Error ? e.message : String(e) }
    }
  }, [files])

  useEffect(() => {
    document.querySelector('style[data-lesson-preview]')?.remove()
    const cssFiles = files.filter(f => f.language === 'css')
    if (cssFiles.length > 0) {
      const raw = cssFiles.map(f => f.code).join('\n')
      const scoped = raw.replace(/([^{}@,]+)(,?)(?=\s*\{)/g, (_, sel, comma) => {
        const trimmed = sel.trim()
        if (!trimmed || trimmed.startsWith('@') || trimmed.startsWith('}')) return _
        return `.lp-root ${trimmed}${comma}`
      })
      const style = document.createElement('style')
      style.setAttribute('data-lesson-preview', '')
      style.textContent = scoped
      document.head.appendChild(style)
    }
    return () => { document.querySelector('style[data-lesson-preview]')?.remove() }
  }, [files])

  useEffect(() => {
    const mount = mountRef.current!
    rootRef.current = createRoot(mount)
    return () => { rootRef.current?.unmount(); rootRef.current = null }
  }, [])

  useEffect(() => {
    if (!rootRef.current || !Component) return
    rootRef.current.render(
      React.createElement(MemoryRouter, null, React.createElement(Component))
    )
  }, [Component])

  return (
    <div style={{ position: 'relative', minHeight: '80px' }}>
      <div
        ref={mountRef}
        className="lp-root"
        style={{ padding: '20px', fontFamily: 'system-ui,-apple-system,sans-serif', lineHeight: 1.6, color: '#1a1a2e' }}
      />
      {error && (
        <pre style={{
          position: 'absolute', inset: 0,
          color: '#ef4444', fontSize: '12px', padding: '16px',
          whiteSpace: 'pre-wrap', margin: 0, background: '#fff8f8',
        }}>
          {error}
        </pre>
      )}
    </div>
  )
}

// Wendet Regex nur auf Textnodes an — überspringt bereits gesetzte HTML-Spans
function sr(html: string, regex: RegExp, replacement: string): string {
  return html.split(/(<[^>]*>)/).map(part =>
    part.startsWith('<') ? part : part.replace(regex, replacement)
  ).join('')
}

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
    r = sr(r, /\b(div|span|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|button|input|form|label|nav|header|footer|main|section|article|table|tr|td|th|img|pre|code|body|html)\b/g, '<span style="color:#ffd700">$1</span>')
    r = sr(r, /(@[a-zA-Z-]+)/g,               '<span style="color:#569cd6">$1</span>')
    r = sr(r, /\b([a-z][a-z0-9-]+)(?=\s*:)/g, '<span style="color:#9cdcfe">$1</span>')
    return colorizeBrackets(r)
  }

  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  let r = escaped.replace(
    /\{(\/\*[\s\S]*?\*\/)\}/g,
    '<span style="color:#6a9955">{$1}</span>'
  )
  // Kommentare zuerst — sonst brechen String-Spans den Kommentar auf
  r = sr(r, /(\/\/.*)/g,              '<span style="color:#6a9955">$1</span>')
  r = r.replace(/(`[^`]*`)/g, '<span style="color:#ce9178">$1</span>')
  r = sr(r, /('[^']*')/g,              '<span style="color:#ce9178">$1</span>')
  r = sr(r, /("(?:[^"\\]|\\.)*")/g,   '<span style="color:#ce9178">$1</span>')
  r = sr(r, /\bfunction\s+([A-Za-z_$][A-Za-z0-9_$]*)/g,
    'function <span style="color:#e879f9">$1</span>')
  r = sr(r, /\b(const|let)\s+([A-Z][A-Za-z0-9_$]*)\s*=/g,
    '$1 <span style="color:#e879f9">$2</span> =')
  r = sr(r, /\b(import|export|from|default|function|return|const|let|var|if|else|for|while|async|await|try|catch|finally|new|type|interface|extends|implements|class|null|undefined|true|false|typeof|instanceof)\b/g,
    '<span style="color:#569cd6">$1</span>')
  r = sr(r, /\b(string|number|boolean|void|never|any|unknown|ReactNode|ReactElement)\b/g,
    '<span style="color:#4ec9b0">$1</span>')
  r = sr(r, /(&lt;\/?a(?=[\s&]))/g,      '<span style="color:#4ade80">$1</span>')
  r = sr(r, /(&lt;\/?[A-Za-z][a-zA-Z0-9]*(?:\.[A-Za-z][a-zA-Z0-9]*)*)/g, '<span style="color:#f97316">$1</span>')
  r = sr(r, /(&lt;\/?&gt;)/g, '<span style="color:#f97316">$1</span>')
  r = sr(r, /(\/&gt;|&gt;)/g, '<span style="color:#f97316">$1</span>')

  return colorizeBrackets(r)
}

const LANG_LABELS: Record<string, string> = {
  tsx: 'TSX', ts: 'TS', css: 'CSS', json: 'JSON', html: 'HTML', bash: 'BASH',
}

// Monaco-Sprache pro Dateiendung
function monacoLang(language: string): string {
  if (language === 'tsx' || language === 'ts') return 'typescript'
  if (language === 'css') return 'css'
  if (language === 'html') return 'html'
  if (language === 'json') return 'json'
  return 'plaintext'
}

const OUTPUT_TAB = -1

function CodeViewer({ files, editMode, onToggleEdit, editedCodes, onEditChange, onResetEdit }: CodeViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const isOutput = activeIndex === OUTPUT_TAB
  const activeFile = isOutput ? null : files[activeIndex]
  const activeEditedCode = isOutput ? '' : (editedCodes[activeIndex] ?? files[activeIndex]?.code ?? '')

  // Live-Preview bekommt editierte Codes im Editier-Modus, sonst Originale
  const previewFiles = useMemo(() => files.map((f, i) => ({
    ...f,
    code: editMode ? (editedCodes[i] ?? f.code) : f.code,
  })), [files, editMode, editedCodes])

  const previewKey = useMemo(
    () => files.map(f => f.name).join('|'),
    [files]
  )

  function handleCopy() {
    const code = editMode ? activeEditedCode : activeFile?.code
    if (!code) return
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (!activeFile) return
    const code = editMode ? activeEditedCode : activeFile.code
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = activeFile.name
    a.click()
    URL.revokeObjectURL(url)
  }

  // Monaco: JSX-Support aktivieren und Fehler-Squiggles für fehlende Imports deaktivieren
  function handleMonacoBeforeMount(monaco: Parameters<NonNullable<React.ComponentProps<typeof MonacoEditor>['beforeMount']>>[0]) {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
    })
    // Semantische Fehler (fehlende Imports) ausblenden — Syntax-Feedback kommt vom Live-Output
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })
  }

  return (
    <div style={{
      borderRadius: '8px', overflow: 'hidden',
      border: '1px solid #e6ddf3', marginTop: '16px',
    }}>
      {/* Tab-Leiste */}
      <div style={{
        display: 'flex', background: '#1e1e2e', overflowX: 'auto',
        borderBottom: '1px solid #2d2d44', alignItems: 'center',
      }}>
        {/* Datei-Tabs */}
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

        {/* Output-Tab */}
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
          }}>▶</span>
          Output
        </button>

        {/* Rechte Seite: Toggle + Reset + Kopieren */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '12px', flexShrink: 0 }}>

          {/* Kopieren-Button */}
          {!isOutput && (
            <button
              onClick={handleCopy}
              style={{
                padding: '4px 10px', background: 'transparent',
                border: 'none', color: copied ? '#4ade80' : '#888',
                cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap',
              }}
            >
              {copied ? '✓ Kopiert' : '📋'}
            </button>
          )}

          {/* Download-Button */}
          {!isOutput && (
            <button
              onClick={handleDownload}
              title={`${activeFile?.name} herunterladen`}
              style={{
                padding: '4px 10px', background: 'transparent',
                border: 'none', color: '#888',
                cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap',
              }}
            >
              💾
            </button>
          )}

          {/* Reset-Button — nur im Editier-Modus */}
          {editMode && (
            <button
              onClick={onResetEdit}
              title="Originalcode wiederherstellen"
              style={{
                padding: '4px 10px', background: 'transparent',
                border: '1px solid #555', borderRadius: '5px',
                color: '#f87171', cursor: 'pointer', fontSize: '12px',
                whiteSpace: 'nowrap',
              }}
            >
              ↺ Reset
            </button>
          )}

          {/* Mode-Toggle: Read Only / Editieren */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: editMode ? '#666' : '#c4b5fd', fontWeight: 600, whiteSpace: 'nowrap' }}>
              Read Only
            </span>
            <button
              onClick={onToggleEdit}
              title={editMode ? 'Zurück zu Read Only' : 'Code bearbeiten'}
              style={{
                width: '36px', height: '18px', borderRadius: '9px',
                background: editMode ? '#7c3aed' : '#444',
                border: 'none', cursor: 'pointer', position: 'relative',
                transition: 'background 0.2s', padding: 0, flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute', top: '2px',
                left: editMode ? '20px' : '2px',
                width: '14px', height: '14px', borderRadius: '50%',
                background: '#fff', transition: 'left 0.2s',
                display: 'block',
              }} />
            </button>
            <span style={{ fontSize: '11px', color: editMode ? '#c4b5fd' : '#666', fontWeight: 600, whiteSpace: 'nowrap' }}>
              Editieren
            </span>
          </div>
        </div>
      </div>

      {/* Inhalt */}
      {isOutput ? (
        <div style={{ background: '#fff', minHeight: '200px' }}>
          <LivePreview key={previewKey} files={previewFiles} />
        </div>
      ) : editMode ? (
        // Monaco Editor im Editier-Modus
        <MonacoEditor
          height="480px"
          language={monacoLang(activeFile?.language ?? 'tsx')}
          value={activeEditedCode}
          onChange={value => onEditChange(activeIndex, value ?? '')}
          theme="vs-dark"
          beforeMount={handleMonacoBeforeMount}
          options={{
            fontSize: 13.5,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'off',
            padding: { top: 16 },
          }}
        />
      ) : (
        // Read Only — Syntax-Highlighting wie bisher
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
