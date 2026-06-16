import type { Chapter } from '../types';

export const chapters: Chapter[] = [
  // ─────────────────────────────────────────────
  // KAPITEL 1: GRUNDLAGEN
  // ─────────────────────────────────────────────
  {
    title: '1. Grundlagen',
    lessons: [
      {
        id: 1,
        title: 'Was ist React?',
        category: 'Grundlagen',
        explanation: `**React** ist eine JavaScript-Bibliothek von Meta zum Bauen von Benutzeroberflächen.
React zerlegt eine UI in kleine, wiederverwendbare **Komponenten** — ähnlich wie Python-Klassen, die du kombinierst.
Vite ist das Build-Tool: es startet einen Dev-Server und kompiliert TypeScript zu JavaScript.`,
        keyPoints: [
          'React = UI-Bibliothek, kein vollständiges Framework',
          'TypeScript = JavaScript + statische Typen',
          'Vite = schnelles Build-Tool (ersetzt CRA)',
          'Komponenten = wiederverwendbare UI-Bausteine',
        ],
        preview: `<div>
  <h1>Hallo React!</h1>
  <p>Das ist meine erste React-App mit Vite + TypeScript.</p>
</div>`,
        files: [
          {
            name: 'main.tsx',
            language: 'tsx',
            code: `// Einstiegspunkt der App — wird einmal ausgeführt
import { StrictMode } from 'react'        // Aktiviert Entwicklungs-Warnungen
import { createRoot } from 'react-dom/client' // Verbindet React mit dem DOM
import App from './App.tsx'               // Importiert die Root-Komponente
import './index.css'                      // Globale CSS-Styles

// Hängt die React-App in das <div id="root"> in index.html
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `// Die Root-Komponente — der Startpunkt deiner UI
function App() {
  return (
    // JSX braucht genau ein Wurzelelement — div dient hier als äußere Hülle
    <div>
      <h1>Hallo React!</h1>
      <p>Das ist meine erste React-App mit Vite + TypeScript.</p>
    </div>
  )
}

export default App  // export default = App kann in main.tsx importiert werden`,
          },
          {
            name: 'index.html',
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <title>React Kurs</title>
  </head>
  <body>
    <!-- React rendert alles in dieses div -->
    <div id="root"></div>
    <!-- Vite lädt main.tsx automatisch -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
          },
        ],
      },
      {
        id: 2,
        title: 'JSX — JavaScript + HTML',
        category: 'Grundlagen',
        explanation: `**JSX** ist eine Syntax-Erweiterung: du schreibst HTML-ähnlichen Code direkt in JavaScript/TypeScript.
TypeScript kompiliert JSX zu normalen \`React.createElement()\`-Aufrufen — du siehst davon nichts.
Wichtig: JSX ist kein echtes HTML. Attribute heißen anders (z.B. \`className\` statt \`class\`).`,
        preview: `<div>
  <h1>Hallo, Steven!</h1>
  <p>Eingeloggt</p>
  <span style="color:blue;font-size:18px">Blauer Text</span>
</div>`,
        keyPoints: [
          'JSX = HTML-Syntax in JS/TS-Dateien',
          'className statt class (class ist JS-Keyword)',
          'htmlFor statt for',
          'Jede Komponente muss genau ein Root-Element zurückgeben',
          'Leere Tags <> </> als Container wenn kein div gewünscht',
        ],
        files: [
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import './App.css'

function App() {
  const name = "Steven"          // JS-Variable
  const isLoggedIn = true        // Boolean

  return (
    // Kein echtes HTML — wird zu JS kompiliert
    <div className="container">  {/* React: className — HTML: class (class ist JS-Keyword) */}

      {/* Variablen in JSX immer in {} schreiben — ohne {} würde "name" als Text ausgegeben */}
      <h1>Hallo, {name}!</h1>

      {/* Ternärer Operator = if/else in einer Zeile: Bedingung ? wahr : falsch */}
      <p>{isLoggedIn ? "Eingeloggt" : "Bitte anmelden"}</p>

      {/* className statt style="" — Styles besser in externe .css auslagern, nicht inline */}
      <span className="highlight-text">
        Blauer Text
      </span>

    </div>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `
.highlight-text {
  color: blue;
  font-size: 18px;
}
`,
          },
        ],
      },
      {
        id: 3,
        title: 'Komponenten — Funktionen als UI',
        category: 'Grundlagen',
        explanation: `Eine **Komponente** ist eine TypeScript-Funktion, die JSX zurückgibt.
Name beginnt immer mit **Großbuchstabe** — React unterscheidet so zwischen HTML-Tags (\`div\`) und Komponenten (\`Button\`).
Komponenten können andere Komponenten enthalten — so entsteht ein **Komponentenbaum**.`,
        preview: `<header style="border-bottom:1px solid #e5e7eb;padding-bottom:12px;margin-bottom:12px">
  <h1>Meine App</h1>
  <nav><a href="#">Home</a><a href="#">Über uns</a></nav>
</header>
<main style="padding:4px 0 12px"><p>Hauptinhalt hier</p></main>
<footer><p>© 2025 Meine App</p></footer>`,
        keyPoints: [
          'Funktion → gibt JSX zurück → Komponente',
          'Großbuchstabe am Anfang ist Pflicht',
          'Komponenten sind composable — ineinander verschachtelbar',
          'Eine Datei = eine Komponente (Konvention)',
        ],
        files: [
          {
            name: 'Header.tsx',
            language: 'tsx',
            code: `// Eigene Komponente — wiederverwendbarer UI-Block
function Header() {
  return (
    <header className="app-header">
      <h1>Meine App</h1>
      <nav className="app-nav">
        <a href="/">Home</a>
        <a href="/about">Über uns</a>
      </nav>
    </header>
  )
}

export default Header`,
          },
          {
            name: 'Footer.tsx',
            language: 'tsx',
            code: `function Footer() {
  return (
    <footer className="app-footer">
      <p>© 2025 Meine App</p>
    </footer>
  )
}

export default Footer`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `// Importiert und kombiniert Komponenten
import Header from './Header'   // Named: ./Header.tsx
import Footer from './Footer'
import './App.css'              // Styles für alle Komponenten dieser App

function App() {
  return (
    // Fragment <> als Root statt unnötigem div
    <>
      <Header />          {/* Komponente als selbst-schließender Tag */}
      <main className="app-main">
        <p>Hauptinhalt hier</p>
      </main>
      <Footer />
    </>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.app-header {
  background: #1e1e2e;
  padding: 16px 24px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-header h1 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #a78bfa;
}

.app-nav {
  display: flex;
  gap: 12px;
}

.app-nav a {
  color: #c4b5fd;
  text-decoration: none;
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 4px;
}

.app-nav a:hover {
  background: #ffffff22;
}

.app-main {
  padding: 12px 4px;
  color: #374151;
}

.app-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  color: #9ca3af;
  font-size: 13px;
  text-align: center;
}`,
          },
        ],
      },
      {
        id: 4,
        title: 'Props — Daten an Komponenten übergeben',
        category: 'Grundlagen',
        explanation: `**Props** (Properties) sind Parameter, die du einer Komponente von außen mitgibst — wie Funktionsargumente.
Die Komponente empfängt Props als Objekt. Mit TypeScript definierst du ein **Interface** für die erlaubten Props.
Props fließen immer **von oben nach unten** (Parent → Child) — niemals umgekehrt.`,
        preview: `<div style="display:flex;gap:16px;flex-wrap:wrap">
  <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;min-width:180px">
    <h2>React lernen</h2>
    <p>Schritt für Schritt</p>
    <span style="background:#7c3aed;color:#fff;padding:2px 10px;border-radius:12px;font-size:12px">Neu</span>
  </div>
  <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;min-width:180px">
    <h2>TypeScript</h2>
    <p>Typen für JavaScript</p>
  </div>
</div>`,
        keyPoints: [
          'Props = Eingabe-Parameter einer Komponente',
          'Datenfluss: immer Parent → Child (Einbahnstraße)',
          'Interface definiert erlaubte Props + Typen',
          'Optionale Props mit ? markieren',
          'Props sind readonly — nie direkt verändern',
        ],
        files: [
          {
            name: 'Card.tsx',
            language: 'tsx',
            code: `import './Card.css'

// Interface definiert erlaubte Props und deren Typen
interface CardProps {
  title: string           // Pflicht-Prop
  description: string     // Pflicht-Prop
  badge?: string          // Optionale Prop (?)
}

// Props-Objekt wird destructured empfangen
function Card({ title, description, badge }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      {/* Badge nur rendern wenn übergeben wurde */}
      {badge && <span className="badge">{badge}</span>}
    </div>
  )
}

export default Card`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import Card from './Card'

function App() {
  return (
    <div>
      {/* Props wie HTML-Attribute übergeben */}
      <Card
        title="React lernen"
        description="Schritt für Schritt"
        badge="Neu"
      />

      <Card
        title="TypeScript"
        description="Typen für JavaScript"
      />
    </div>
  )
}

export default App`,
          },
          {
            name: 'Card.css',
            language: 'css',
            code: `.card {
  border: 1px solid #e6ddf3;
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 12px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.08);
}

.card h2 {
  font-size: 17px;
  font-weight: 700;
  color: #2d1b4e;
  margin: 0 0 6px;
}

.card p {
  color: #6b5b8c;
  font-size: 14px;
  margin: 0 0 12px;
}

.badge {
  display: inline-block;
  background: #7c3aed;
  color: #fff;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}`,
          },
        ],
      },
      {
        id: 5,
        title: 'Props — children',
        category: 'Grundlagen',
        explanation: `**children** ist ein spezielles Prop: alles was zwischen öffnendem und schließendem Tag steht.
So baust du Layout-Komponenten (Container, Card, Modal), die beliebigen Inhalt umhüllen.
In TypeScript nutzt du \`React.ReactNode\` als Typ für children.`,
        preview: `<div style="display:flex;flex-direction:column;gap:12px">
  <div style="background:lightblue;padding:16px;border-radius:8px">
    <h2>Titel im Kasten</h2>
    <p>Beliebiger Inhalt hier drin</p>
  </div>
  <div style="background:lightyellow;padding:16px;border-radius:8px">
    <p>Anderer Inhalt — gleiche Komponente</p>
  </div>
</div>`,
        keyPoints: [
          'children = Inhalt zwischen den Tags der Komponente',
          'Typ: React.ReactNode (alles was React rendern kann)',
          'Ermöglicht flexible "Wrapper"-Komponenten',
        ],
        files: [
          {
            name: 'Box.tsx',
            language: 'tsx',
            code: `import { ReactNode } from 'react'  // TypeScript: ReactNode importieren — gibt Typsicherheit für children
import './Box.css'

interface BoxProps {
  color?: string          // optionale Hintergrundfarbe — ? heißt: muss nicht übergeben werden
  children: ReactNode     // alles was zwischen <Box>...</Box> steht
}

function Box({ color = 'lightgray', children }: BoxProps) {
  return (
    // style-Prop direkt setzen — backgroundColor nimmt den color-Wert entgegen
    <div className="box" style={{ backgroundColor: color }}>
      {children}   {/* Inhalt kommt von außen — Box weiß nicht was drin ist */}
    </div>
  )
}

export default Box`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import Box from './Box'

function App() {
  return (
    <div>
      {/* Alles zwischen den Tags wird als children übergeben */}
      <Box color="lightblue">
        <h2>Titel im Kasten</h2>
        <p>Beliebiger Inhalt hier drin</p>
      </Box>

      <Box color="lightyellow">
        <p>Anderer Inhalt — gleiche Komponente</p>
      </Box>
    </div>
  )
}

export default App`,
          },
          {
            name: 'Box.css',
            language: 'css',
            code: `.box {
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
}`,
          },
        ],
      },
      {
        id: 6,
        title: 'props.children — Der CSS-Wrapper',
        category: 'Grundlagen',
        explanation: `**props.children** ist der Inhalt den du zwischen die Tags einer Komponente schreibst.
Jede Komponente bekommt \`children\` automatisch — du musst es nur im Interface als \`ReactNode\` deklarieren und dann rendern.
Ein CSS-Wrapper ist das klassische Beispiel: er gibt dem Inhalt einen Rahmen, ohne selbst zu wissen was drin ist.`,
        keyPoints: [
          '`children` muss im Interface als `ReactNode` deklariert werden',
          'Zugriff via `props.children` oder kürzer per Destructuring `{ children }`',
          '`ReactNode` deckt alles ab: Text, JSX-Elemente, Arrays, null',
          'Wrapper-Muster: Styling in der Komponente — Inhalt kommt von außen',
        ],
        files: [
          {
            name: 'Wrapper.tsx',
            language: 'tsx',
            code: `import { ReactNode } from 'react'
import './Wrapper.css'

interface WrapperProps {
  variant?: 'primary' | 'secondary'   // Union Type — nur diese zwei Werte sind erlaubt, ? = optional (default greift sonst)
  children: ReactNode   // ReactNode = alles was React rendern kann (Text, JSX, Arrays...)
}

// { children } ist Destructuring von props — gleiches Ergebnis wie props.children, nur kürzer
function Wrapper({ variant = 'primary', children }: WrapperProps) {
  return (
    // CSS-Klasse steuert das Styling — der Inhalt kommt komplett von außen
    <div className={\`wrapper wrapper--\${variant}\`}>
      {children}   {/* was zwischen <Wrapper>...</Wrapper> steht, landet hier */}
    </div>
  )
}

export default Wrapper`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import Wrapper from './Wrapper'

function App() {
  return (
    <div>
      {/* Alles zwischen den Tags wird zu props.children */}
      <Wrapper variant="primary">
        <h2>Primary Wrapper</h2>
        <p>Dieser Inhalt ist props.children</p>
      </Wrapper>

      {/* Mehrere Elemente sind erlaubt — children wird intern ein Array */}
      <Wrapper variant="secondary">
        <p>Zweiter Wrapper</p>
        <small>Gleiche Komponente, anderes Variant-Prop</small>
      </Wrapper>
    </div>
  )
}

export default App`,
          },
          {
            name: 'Wrapper.css',
            language: 'css',
            code: `.wrapper {
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.wrapper--primary {
  background: #f0e6ff;
  border-left: 4px solid #7c3aed;
}

.wrapper--secondary {
  background: #e0f2fe;
  border-left: 4px solid #0ea5e9;
}`,
          },
        ],
      },
      {
        id: 7,
        title: 'useState — Zustand in Komponenten',
        category: 'Grundlagen',
        explanation: `**useState** ist ein React Hook — eine Funktion die einer Komponente "Gedächtnis" gibt.
Ohne State würde React nichts neu rendern wenn sich Daten ändern. State löst das.
Immer über den Setter verändern (\`setCount\`), nie direkt die Variable — sonst kein Re-render.`,
        preview: `<div>
  <h1 style="margin-bottom:12px">State-Demo</h1>
  <div style="display:inline-flex;flex-direction:column;align-items:center;gap:8px;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-right:12px">
    <p>Zähler: <strong>0</strong></p>
    <div style="display:flex;gap:8px"><button>+1</button><button>Reset</button></div>
  </div>
  <div style="display:inline-flex;flex-direction:column;align-items:center;gap:8px;border:1px solid #e5e7eb;border-radius:8px;padding:16px">
    <p>Zähler: <strong>0</strong></p>
    <div style="display:flex;gap:8px"><button>+1</button><button>Reset</button></div>
  </div>
</div>`,
        keyPoints: [
          'useState gibt [wert, setter]-Paar zurück',
          'Setter-Aufruf → React rendert Komponente neu',
          'TypeScript: Typ wird aus initialem Wert abgeleitet',
          'Direkte Mutation des State = Fehler, immer Setter nutzen',
        ],
        files: [
          {
            name: 'Counter.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'  // Hook importieren

function Counter() {
  // useState(0) → initialer Wert 0
  // count = aktueller Wert, setCount = Funktion zum Ändern
  const [count, setCount] = useState<number>(0)

  function handleIncrement() {
    setCount(count + 1)  // Setter aufrufen → Re-render
  }

  function handleReset() {
    setCount(0)          // Zurück auf Startwert
  }

  return (
    <div>
      <p>Zähler: {count}</p>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Counter`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import Counter from './Counter'

function App() {
  return (
    <div>
      <h1>State-Demo</h1>
      {/* Jede Counter-Instanz hat eigenen State */}
      <Counter />
      <Counter />
    </div>
  )
}

export default App`,
          },
        ],
      },
      {
        id: 8,
        title: 'useState — mit Objekten und Arrays',
        category: 'Grundlagen',
        explanation: `State kann jeden Typ halten: Strings, Numbers, Objekte, Arrays.
Bei Objekten und Arrays **niemals** direkt mutieren — immer neue Kopien erstellen (Spread-Operator \`...\`).
React erkennt Änderungen über Referenzvergleich — nur eine neue Referenz löst Re-render aus.`,
        preview: `<div style="display:flex;flex-direction:column;gap:10px;max-width:320px">
  <input placeholder="Name" style="display:block">
  <p>Name: <strong></strong></p>
  <button style="align-self:flex-start">Tag hinzufügen</button>
  <ul><li>Tag 1</li><li>Tag 2</li></ul>
</div>`,
        keyPoints: [
          'Spread ... erstellt flache Kopie: { ...obj, key: newVal }',
          'Arrays: [...arr, newItem] statt arr.push()',
          'Objekte: { ...obj, name: "neu" } statt obj.name = "neu"',
        ],
        files: [
          {
            name: 'Form.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

interface User {
  name: string
  email: string
}

function Form() {
  // State als Objekt
  const [user, setUser] = useState<User>({ name: '', email: '' })

  // State als Array
  const [tags, setTags] = useState<string[]>([])

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Spread: kopiert alle alten Felder, überschreibt nur name
    setUser({ ...user, name: e.target.value })
  }

  function addTag() {
    // Spread: altes Array + neues Element
    setTags([...tags, 'Tag ' + (tags.length + 1)])
  }

  return (
    <div>
      <input value={user.name} onChange={handleNameChange} placeholder="Name" />
      <p>Name: {user.name}</p>

      <button onClick={addTag}>Tag hinzufügen</button>
      <ul>
        {tags.map((tag, i) => <li key={i}>{tag}</li>)}
      </ul>
    </div>
  )
}

export default Form`,
          },
        ],
      },
      {
        id: 9,
        title: 'Event Handling',
        category: 'Grundlagen',
        explanation: `Events in React funktionieren wie in JavaScript — aber mit camelCase (\`onClick\` statt \`onclick\`).
Handler-Funktionen erhhalten ein **Event-Objekt** mit Infos über das Event (z.B. den Wert eines Inputs).
TypeScript erwartet den richtigen Event-Typ — VS Code schlägt ihn beim Hover vor.`,
        keyPoints: [
          'camelCase: onClick, onChange, onSubmit, onKeyDown',
          'Handler als Referenz übergeben: onClick={handleClick} (kein ()), ',
          'Arrow-Function inline wenn nötig: onClick={() => setOpen(true)}',
          'e.preventDefault() unterbindet Standard-Browser-Verhalten',
        ],
        files: [
          {
            name: 'EventDemo.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

function EventDemo() {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // ChangeEvent: für Input-Felder
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)  // e.target.value = aktueller Eingabewert
  }

  // MouseEvent: für Klicks
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('Klick auf:', e.currentTarget)
    setSubmitted(true)
  }

  // FormEvent: für Formulare
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()   // Verhindert Seiten-Reload
    alert('Abgeschickt: ' + text)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={handleChange}
        placeholder="Eingabe..."
      />
      <button type="button" onClick={handleClick}>
        Klick mich
      </button>
      <button type="submit">Abschicken</button>
      {submitted && <p>Button wurde geklickt!</p>}
    </form>
  )
}

export default EventDemo`,
          },
        ],
      },
      {
        id: 10,
        title: 'Conditional Rendering',
        category: 'Grundlagen',
        explanation: `React rendert nur was du zurückgibst — du kannst mit normalen JS-Bedingungen steuern was angezeigt wird.
Die drei gängigen Muster: **ternärer Operator**, **&&-Kurzschluss**, **early return**.
\`null\` oder \`undefined\` rendern nichts — nützlich um Elemente auszublenden.`,
        keyPoints: [
          'Ternär: condition ? <A /> : <B />',
          'Kurzschluss: condition && <A /> (false = nichts)',
          'Early return: if (!data) return <Loading />',
          'null zurückgeben = Element verstecken',
        ],
        files: [
          {
            name: 'UserStatus.tsx',
            language: 'tsx',
            code: `interface UserStatusProps {
  isLoggedIn: boolean
  isAdmin: boolean
  name?: string
}

function UserStatus({ isLoggedIn, isAdmin, name }: UserStatusProps) {

  // Early return Pattern — wenn nicht eingeloggt, sofort zurück
  if (!isLoggedIn) {
    return <p>Bitte melde dich an.</p>
  }

  return (
    <div>
      {/* Ternärer Operator */}
      <p>Willkommen, {name ? name : 'Gast'}!</p>

      {/* &&-Kurzschluss: zeigt nur wenn isAdmin true */}
      {isAdmin && <button>Admin-Panel öffnen</button>}

      {/* Verschachtelte Bedingung */}
      <p>
        Rolle: {isAdmin ? '🔴 Administrator' : '🟢 Normaler User'}
      </p>
    </div>
  )
}

export default UserStatus`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import UserStatus from './UserStatus'

function App() {
  return (
    <div>
      <UserStatus isLoggedIn={false} isAdmin={false} />
      <hr />
      <UserStatus isLoggedIn={true} isAdmin={false} name="Steven" />
      <hr />
      <UserStatus isLoggedIn={true} isAdmin={true} name="Admin" />
    </div>
  )
}

export default App`,
          },
        ],
      },
      {
        id: 11,
        title: 'Lists & .map() — Listen rendern',
        category: 'Grundlagen',
        explanation: `Arrays in JSX renderst du mit \`.map()\` — jedes Element wird in JSX umgewandelt.
Jedes Element in einer Liste braucht ein **key**-Prop: ein eindeutiger String oder Number.
Key hilft React beim effizienten Update des DOM — ohne key gibt es Warnungen und mögliche Bugs.`,
        keyPoints: [
          '.map() → Array von JSX-Elementen',
          'key={item.id} — eindeutig, stabil, aus den Daten (nicht Index wenn vermeidbar)',
          'Array-Index als key nur wenn keine stabile ID vorhanden',
          'Fragment mit key: <Fragment key={id}> oder <React.Fragment key={id}>',
        ],
        files: [
          {
            name: 'ProductList.tsx',
            language: 'tsx',
            code: `import './ProductList.css'

interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

// Beispieldaten (später kommen diese von einer API)
const products: Product[] = [
  { id: 1, name: 'React Buch', price: 29.99, inStock: true },
  { id: 2, name: 'TypeScript Kurs', price: 49.99, inStock: false },
  { id: 3, name: 'VS Code Theme', price: 0, inStock: true },
]

function ProductList() {
  return (
    <ul>
      {products.map(product => (
        // key muss eindeutig unter Geschwistern sein
        <li key={product.id} className={product.inStock ? '' : 'out-of-stock'}>
          <strong>{product.name}</strong> — {product.price}€
          {!product.inStock && <span> (Ausverkauft)</span>}
        </li>
      ))}
    </ul>
  )
}

export default ProductList`,
          },
          {
            name: 'ProductList.css',
            language: 'css',
            code: `
.out-of-stock {
  opacity: 0.4;
}
`,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // KAPITEL 2: HOOKS
  // ─────────────────────────────────────────────
  {
    title: '2. Hooks',
    lessons: [
      {
        id: 12,
        title: 'useEffect — Seiteneffekte',
        category: 'Hooks',
        explanation: `**useEffect** führt Code aus, nachdem React die Komponente gerendert hat.
Typische Einsatzbereiche: API-Aufrufe, Event-Listener registrieren, Timer setzen.
Das **Dependency Array** \`[]\` bestimmt wann der Effekt erneut läuft.`,
        keyPoints: [
          '[] = nur einmal beim Mounten (componentDidMount)',
          '[value] = bei jedem value-Wechsel',
          'Ohne Array = nach jedem Render (Vorsicht: Endlosschleife möglich)',
          'Cleanup-Funktion: return () => {} — wird beim Unmount ausgeführt',
        ],
        files: [
          {
            name: 'Timer.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    // Effekt nur starten wenn running = true
    if (!running) return

    // Interval starten — das ist ein Seiteneffekt
    const id = setInterval(() => {
      setSeconds(prev => prev + 1)  // Funktionsform für aktuellen State
    }, 1000)

    // Cleanup: Interval stoppen wenn running wechselt oder Unmount
    return () => clearInterval(id)

  }, [running])  // Effekt neu ausführen wenn running sich ändert

  return (
    <div>
      <p>Zeit: {seconds}s</p>
      <button onClick={() => setRunning(r => !r)}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => { setRunning(false); setSeconds(0) }}>
        Reset
      </button>
    </div>
  )
}

export default Timer`,
          },
        ],
      },
      {
        id: 13,
        title: 'useEffect — API-Daten laden',
        category: 'Hooks',
        explanation: `API-Aufrufe gehören in \`useEffect\` — nicht direkt in die Komponente (würde bei jedem Render feuern).
\`async/await\` direkt im useEffect ist nicht erlaubt — deshalb eine innere async-Funktion definieren und sofort aufrufen.
Loading- und Error-States verbessern die UX erheblich.`,
        keyPoints: [
          'useEffect-Callback darf nicht async sein → innere Funktion nutzen',
          'Immer Loading + Error State implementieren',
          '[] als Dependency → Fetch nur einmal beim Mount',
          'Fetch-Fehler mit try/catch abfangen',
        ],
        files: [
          {
            name: 'UserFetch.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
}

function UserFetch() {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    // Innere async-Funktion — sofort aufgerufen (IIFE-Pattern)
    async function fetchUser() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data: User = await res.json()
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Fehler')
      } finally {
        setLoading(false)  // Immer ausgeführt — egal ob Erfolg oder Fehler
      }
    }

    fetchUser()
  }, [])  // [] = nur beim Mount ausführen

  if (loading) return <p>Laden...</p>
  if (error)   return <p>Fehler: {error}</p>
  if (!user)   return null

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}

export default UserFetch`,
          },
        ],
      },
      {
        id: 14,
        title: 'useRef — DOM-Zugriff ohne Re-render',
        category: 'Hooks',
        explanation: `**useRef** gibt eine veränderliche Box (\`.current\`) die zwischen Renders erhalten bleibt — aber kein Re-render auslöst.
Haupteinsatz 1: Direkter Zugriff auf DOM-Elemente (z.B. Input fokussieren).
Haupteinsatz 2: Werte speichern die sich ändern dürfen ohne Re-render (z.B. Timer-IDs).`,
        keyPoints: [
          'ref.current = direkte DOM-Referenz nach dem Mount',
          'Wertänderung löst KEIN Re-render aus (Unterschied zu useState)',
          'ref={myRef} an JSX-Element hängen um DOM-Node zu erhalten',
        ],
        files: [
          {
            name: 'FocusInput.tsx',
            language: 'tsx',
            code: `import { useRef } from 'react'

function FocusInput() {
  // Ref für ein HTMLInputElement — initial null weil DOM noch nicht existiert
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFocus() {
    // Direkter DOM-Zugriff — kein State, kein Re-render
    inputRef.current?.focus()  // ?. wegen möglichem null
  }

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = ''  // DOM direkt verändern
      inputRef.current.focus()
    }
  }

  return (
    <div>
      {/* ref verbindet die Variable mit dem DOM-Element */}
      <input ref={inputRef} placeholder="Klick den Button..." />
      <button onClick={handleFocus}>Fokus setzen</button>
      <button onClick={handleClear}>Leeren</button>
    </div>
  )
}

export default FocusInput`,
          },
        ],
      },
      {
        id: 15,
        title: 'useContext — globaler State',
        category: 'Hooks',
        explanation: `**Context** löst das "Prop Drilling" Problem: Props durch viele Ebenen nach unten reichen.
Du erstellst einen Context, wickelst Komponenten in einen **Provider**, und jede Kind-Komponente kann den Wert direkt lesen.
Gut für: Theme, Sprache, eingeloggter User — Dinge die überall gebraucht werden.`,
        keyPoints: [
          'createContext() → Context-Objekt',
          '<Context.Provider value={...}> → stellt Wert bereit',
          'useContext(MyContext) → Wert lesen in Kindkomponente',
          'Kein Prop Drilling mehr durch Zwischenschichten',
        ],
        files: [
          {
            name: 'ThemeContext.tsx',
            language: 'tsx',
            code: `import { createContext, useContext, useState, ReactNode } from 'react'

// 1. Context-Typ definieren
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

// 2. Context erstellen mit Default-Wert
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})

// 3. Provider-Komponente — verwaltet den State und stellt ihn bereit
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  function toggleTheme() {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 4. Custom Hook für bequemen Zugriff
export function useTheme() {
  return useContext(ThemeContext)
}`,
          },
          {
            name: 'ThemedButton.tsx',
            language: 'tsx',
            code: `import { useTheme } from './ThemeContext'  // Custom Hook nutzen
import './ThemedButton.css'

function ThemedButton() {
  const { theme, toggleTheme } = useTheme()  // Direkt aus Context lesen

  return (
    <button
      onClick={toggleTheme}
      className={theme === 'dark' ? 'btn-dark' : 'btn-light'}
    >
      Theme: {theme} — Wechseln
    </button>
  )
}

export default ThemedButton`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { ThemeProvider } from './ThemeContext'
import ThemedButton from './ThemedButton'

function App() {
  return (
    // Provider umhüllt alle Komponenten die Zugriff brauchen
    <ThemeProvider>
      <div>
        <h1>Context Demo</h1>
        <ThemedButton />
        {/* Beliebig viele Kindkomponenten können useTheme() nutzen */}
      </div>
    </ThemeProvider>
  )
}

export default App`,
          },
          {
            name: 'ThemedButton.css',
            language: 'css',
            code: `
.btn-light {
  background: #eee;
  color: #000;
  padding: 8px 16px;
}

.btn-dark {
  background: #333;
  color: #fff;
  padding: 8px 16px;
}
`,
          },
        ],
      },
      {
        id: 16,
        title: 'useMemo & useCallback — Performance',
        category: 'Hooks',
        explanation: `**useMemo** cached das Ergebnis einer Berechnung — wird nur neu berechnet wenn sich Abhängigkeiten ändern.
**useCallback** cached eine Funktion — verhindert dass bei jedem Render eine neue Funktion erstellt wird.
Beide sind Optimierungen — erst einsetzen wenn Performance-Probleme auftreten (Premature Optimization vermeiden).`,
        keyPoints: [
          'useMemo: teure Berechnungen cachen',
          'useCallback: Funktionsreferenzen stabil halten (für React.memo)',
          'Dependency Array wie bei useEffect',
          'Kein blinder Einsatz — erst bei messbarem Performance-Problem',
        ],
        files: [
          {
            name: 'ExpensiveList.tsx',
            language: 'tsx',
            code: `import { useState, useMemo, useCallback } from 'react'

const numbers = Array.from({ length: 10000 }, (_, i) => i + 1)

function ExpensiveList() {
  const [filter, setFilter] = useState('')
  const [count, setCount] = useState(0)

  // useMemo: filteredNumbers wird nur neu berechnet wenn filter sich ändert
  // Ohne useMemo: bei JEDEM Re-render (auch bei count++) neu berechnet
  const filteredNumbers = useMemo(() => {
    console.log('Filtern...')  // Zeigt wann wirklich gefiltert wird
    return numbers.filter(n => n.toString().includes(filter))
  }, [filter])  // Nur bei filter-Änderung neu berechnen

  // useCallback: handleFilter ist immer dieselbe Funktion-Referenz
  const handleFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }, [])  // Leeres Array: Funktion wird einmal erstellt

  return (
    <div>
      <input onChange={handleFilter} placeholder="Zahlen filtern..." />
      <button onClick={() => setCount(c => c + 1)}>
        Re-render ({count})
      </button>
      <p>{filteredNumbers.length} Ergebnisse</p>
    </div>
  )
}

export default ExpensiveList`,
          },
        ],
      },
      {
        id: 17,
        title: 'Custom Hooks — wiederverwendbare Logik',
        category: 'Hooks',
        explanation: `**Custom Hooks** sind eigene Funktionen die mit "use" beginnen und andere Hooks nutzen.
Sie extrahieren wiederverwendbare Logik aus Komponenten — Komponente bleibt sauber, Logik ist testbar.
Custom Hooks sind das React-Äquivalent zu Hilfs-Funktionen — nur für Hook-Logik.`,
        keyPoints: [
          'Name beginnt mit "use" — Pflicht für React-Regeln',
          'Kann useState, useEffect usw. intern nutzen',
          'Gibt State und Handler zurück wie eine Bibliothek',
          'Jede Komponente die den Hook nutzt, hat eigene State-Kopie',
        ],
        files: [
          {
            name: 'useLocalStorage.ts',
            language: 'tsx',
            code: `import { useState, useEffect } from 'react'

// Custom Hook: State der im localStorage gespeichert wird
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    // Initializer-Funktion: liest beim ersten Render aus localStorage
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    // Bei jeder Wertänderung in localStorage speichern
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const  // as const: korrekte Tuple-Typen
}

export default useLocalStorage`,
          },
          {
            name: 'useFetch.ts',
            language: 'tsx',
            code: `import { useState, useEffect } from 'react'

// Generic Custom Hook: für beliebige API-Aufrufe
function useFetch<T>(url: string) {
  const [data, setData]     = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetch(url)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const json: T = await res.json()
        setData(json)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Fehler')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [url])  // Bei URL-Änderung neu laden

  return { data, loading, error }
}

export default useFetch`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import useLocalStorage from './useLocalStorage'
import useFetch from './useFetch'

interface Post { id: number; title: string }

function App() {
  // Custom Hook — nutzt sich wie useState
  const [name, setName] = useLocalStorage('username', '')

  // Custom Hook — lädt Daten, gibt loading/error/data zurück
  const { data, loading, error } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit=3'
  )

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name (wird gespeichert)"
      />
      <p>Hallo {name || 'Unbekannt'}!</p>

      {loading && <p>Laden...</p>}
      {error   && <p>Fehler: {error}</p>}
      {data?.map(post => <p key={post.id}>{post.title}</p>)}
    </div>
  )
}

export default App`,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // KAPITEL 3: FORTGESCHRITTEN
  // ─────────────────────────────────────────────
  {
    title: '3. Fortgeschritten',
    lessons: [
      {
        id: 18,
        title: 'React Router — Navigation',
        category: 'Fortgeschritten',
        explanation: `**React Router** ermöglicht clientseitige Navigation ohne Seiten-Reload.
Die URL ändert sich, aber nur die passende Komponente wird ausgetauscht — das ist eine **Single Page Application (SPA)**.
Installation: \`npm install react-router-dom\``,
        keyPoints: [
          'BrowserRouter: umhüllt die App, aktiviert Routing',
          'Routes + Route: definiert URL → Komponente Zuordnungen',
          'Link: Navigation ohne Seiten-Reload (kein <a href>)',
          'useNavigate: programmatische Navigation per Code',
          'useParams: URL-Parameter auslesen (z.B. /user/:id)',
        ],
        files: [
          {
            name: 'main.tsx',
            language: 'tsx',
            code: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // NEU: Router aktivieren
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>   {/* Umhüllt alles — aktiviert Routing */}
      <App />
    </BrowserRouter>
  </StrictMode>
)`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import User from './pages/User'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div>
      {/* Navigation — kein <a> Reload */}
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/about">About</Link> |{' '}
        <Link to="/user/42">User 42</Link>
      </nav>

      {/* Routen-Definitionen */}
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/user/:id"   element={<User />} />  {/* :id = Parameter */}
        <Route path="*"           element={<NotFound />} />  {/* Fallback */}
      </Routes>
    </div>
  )
}

export default App`,
          },
          {
            name: 'pages/User.tsx',
            language: 'tsx',
            code: `import { useParams, useNavigate } from 'react-router-dom'

function User() {
  // useParams: URL-Parameter auslesen
  const { id } = useParams<{ id: string }>()

  // useNavigate: programmatisch navigieren
  const navigate = useNavigate()

  return (
    <div>
      <h1>User #{id}</h1>
      <button onClick={() => navigate(-1)}>Zurück</button>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  )
}

export default User`,
          },
        ],
      },
      {
        id: 19,
        title: 'Formulare — kontrolliert vs. unkontrolliert',
        category: 'Fortgeschritten',
        explanation: `**Kontrollierte Inputs** — React State ist die einzige Datenquelle, DOM wird gesteuert.
**Unkontrollierte Inputs** — DOM verwaltet den Wert selbst, React liest ihn per Ref wenn nötig.
Für komplexe Formulare empfiehlt sich React Hook Form (\`npm install react-hook-form\`).`,
        keyPoints: [
          'Kontrolliert: value={state} + onChange={setter} — immer synchron',
          'Unkontrolliert: ref.current.value — nur bei Bedarf lesen',
          'Kontrolliert = mehr Code, aber volle Kontrolle',
          'React Hook Form: spart Boilerplate, integriert Validierung',
        ],
        files: [
          {
            name: 'LoginForm.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import './LoginForm.css'

interface FormData {
  email: string
  password: string
}

function LoginForm() {
  const [form, setForm]   = useState<FormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Generischer Handler für alle Inputs — nutzt name-Attribut
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))  // [name] = computed key
    // Fehler beim Tippen löschen
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function validate(): boolean {
    const newErrors: Partial<FormData> = {}
    if (!form.email.includes('@')) newErrors.email = 'Ungültige E-Mail'
    if (form.password.length < 6)  newErrors.password = 'Min. 6 Zeichen'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0  // true wenn keine Fehler
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) {
      console.log('Login:', form)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"           // name-Attribut für generischen Handler
          value={form.email}
          onChange={handleChange}
          placeholder="E-Mail"
          type="email"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Passwort"
          type="password"
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      <button type="submit">Anmelden</button>
    </form>
  )
}

export default LoginForm`,
          },
          {
            name: 'LoginForm.css',
            language: 'css',
            code: `
.error-message {
  color: red;
}
`,
          },
        ],
      },
      {
        id: 20,
        title: 'useReducer — komplexer State',
        category: 'Fortgeschritten',
        explanation: `**useReducer** ist Alternative zu useState für komplexen State mit mehreren Aktionen.
Konzept: eine **Reducer-Funktion** empfängt aktuellen State + Aktion und gibt neuen State zurück.
Kommt aus dem Redux-Pattern — gut wenn State-Logik zu komplex für useState wird.`,
        keyPoints: [
          'useReducer(reducer, initialState) → [state, dispatch]',
          'dispatch({ type: "ACTION", payload: data }) → löst Reducer aus',
          'Reducer: reine Funktion — kein API-Call, kein Side Effect',
          'Gut wenn viele States zusammengehören',
        ],
        files: [
          {
            name: 'cartReducer.ts',
            language: 'tsx',
            code: `// Typen für State und Aktionen
interface CartItem {
  id: number
  name: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

// Discriminated Union — jede Aktion hat ihren eigenen Typ
type CartAction =
  | { type: 'ADD_ITEM';    payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }   // payload = id
  | { type: 'CLEAR' }

// Reducer: reine Funktion — (currentState, action) → newState
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload], total: state.total + 1 }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - 1,
      }

    case 'CLEAR':
      return { items: [], total: 0 }

    default:
      return state  // Unbekannte Aktionen: State unverändert zurückgeben
  }
}

export const initialCartState: CartState = { items: [], total: 0 }`,
          },
          {
            name: 'Cart.tsx',
            language: 'tsx',
            code: `import { useReducer } from 'react'
import { cartReducer, initialCartState } from './cartReducer'

function Cart() {
  // useReducer statt useState
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  function addItem() {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id: Date.now(), name: 'Artikel ' + (state.items.length + 1), quantity: 1 }
    })
  }

  return (
    <div>
      <h2>Warenkorb ({state.total} Artikel)</h2>
      <button onClick={addItem}>Artikel hinzufügen</button>
      <button onClick={() => dispatch({ type: 'CLEAR' })}>Leeren</button>
      <ul>
        {state.items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cart`,
          },
        ],
      },
      {
        id: 21,
        title: 'TypeScript mit React — Typen & Generics',
        category: 'Fortgeschritten',
        explanation: `TypeScript macht React-Code robuster: Fehler werden beim Schreiben erkannt, nicht erst zur Laufzeit.
**Generics** ermöglichen typsichere wiederverwendbare Komponenten für beliebige Datentypen.
Wichtige React-Typen: \`React.FC\`, \`ReactNode\`, \`ComponentProps\`, \`HTMLAttributes\`.`,
        keyPoints: [
          'Interface für Props — immer, auch bei wenigen Props',
          'Generics: <T> in Komponenten für flexible Typen',
          'React.ComponentProps<"button"> — HTMLButton-Attribute vererben',
          'Discriminated Unions für komplexe Props-Varianten',
        ],
        files: [
          {
            name: 'Select.tsx',
            language: 'tsx',
            code: `// Generische Select-Komponente — funktioniert für beliebige Option-Typen
interface SelectProps<T> {
  options: T[]                    // Array von beliebigem Typ T
  getValue: (option: T) => string // Wie den String-Wert aus T extrahieren
  getLabel: (option: T) => string // Wie das Label aus T extrahieren
  selected: T | null
  onChange: (value: T) => void
}

// <T,> mit Komma nötig in TSX damit TypeScript nicht denkt es ist JSX
function Select<T,>({ options, getValue, getLabel, selected, onChange }: SelectProps<T>) {
  return (
    <select
      value={selected ? getValue(selected) : ''}
      onChange={e => {
        const found = options.find(o => getValue(o) === e.target.value)
        if (found) onChange(found)
      }}
    >
      <option value="">— Auswählen —</option>
      {options.map(option => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  )
}

export default Select`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import Select from './Select'

interface Country { code: string; name: string }

const countries: Country[] = [
  { code: 'de', name: 'Deutschland' },
  { code: 'at', name: 'Österreich' },
  { code: 'ch', name: 'Schweiz' },
]

function App() {
  const [selected, setSelected] = useState<Country | null>(null)

  return (
    <div>
      {/* TypeScript prüft: getValue/getLabel müssen Country zurückgeben */}
      <Select<Country>
        options={countries}
        getValue={c => c.code}
        getLabel={c => c.name}
        selected={selected}
        onChange={setSelected}
      />
      {selected && <p>Gewählt: {selected.name}</p>}
    </div>
  )
}

export default App`,
          },
        ],
      },
      {
        id: 22,
        title: 'React.memo — Rendering optimieren',
        category: 'Fortgeschritten',
        explanation: `**React.memo** ist ein Higher-Order Component (HOC) — es "merkt" sich Props und rendert nur neu wenn Props sich ändern.
Ohne memo: Jedes Render des Parents rendert ALLE Children neu.
Mit memo: Children re-rendern nur wenn ihre Props sich wirklich geändert haben.`,
        keyPoints: [
          'React.memo(Component) — Komponente merkt sich Props',
          'Shallow Comparison — Objekte/Arrays brauchen stabile Referenzen',
          'useCallback für Handler-Props — sonst neue Referenz bei jedem Render',
          'Nur einsetzen wenn Profiler Performance-Probleme zeigt',
        ],
        files: [
          {
            name: 'Child.tsx',
            language: 'tsx',
            code: `import { memo } from 'react'

interface ChildProps {
  name: string
  onClick: () => void
}

// memo: rendert nur wenn name oder onClick sich ändern
const Child = memo(function Child({ name, onClick }: ChildProps) {
  console.log('Child rendert:', name)  // Zeigt wann wirklich gerendert wird
  return (
    <div>
      <p>Kind: {name}</p>
      <button onClick={onClick}>Klick</button>
    </div>
  )
})

export default Child`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, useCallback } from 'react'
import Child from './Child'

function App() {
  const [count, setCount]   = useState(0)
  const [text, setText]     = useState('')

  // useCallback: handleClick ist immer dieselbe Referenz
  // Ohne useCallback: neue Funktion bei jedem Render → Child rendert immer
  const handleClick = useCallback(() => {
    console.log('Geklickt!')
  }, [])  // Leeres Array: wird einmal erstellt

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>

      {/* Child rendert NUR wenn sich seine Props ändern */}
      <Child name="Festes Kind" onClick={handleClick} />
    </div>
  )
}

export default App`,
          },
        ],
      },
      {
        id: 23,
        title: 'Error Boundaries',
        category: 'Fortgeschritten',
        explanation: `**Error Boundaries** fangen JavaScript-Fehler in Kindkomponenten ab und zeigen Fallback-UI.
Sie müssen als **Klassen-Komponenten** geschrieben werden — Hooks unterstützen diese Funktion nicht.
Gut für: Produktions-Apps, API-Fehler, defekte 3rd-Party-Komponenten.`,
        keyPoints: [
          'Nur Klassen-Komponenten können Error Boundaries sein',
          'getDerivedStateFromError → Fallback-State setzen',
          'componentDidCatch → Fehler loggen (z.B. Sentry)',
          'Async-Fehler (fetch) werden NICHT gefangen — useEffect try/catch nutzen',
        ],
        files: [
          {
            name: 'ErrorBoundary.tsx',
            language: 'tsx',
            code: `import { Component, ReactNode, ErrorInfo } from 'react'
import './ErrorBoundary.css'

interface Props {
  children: ReactNode
  fallback?: ReactNode  // Optionale custom Fallback-UI
}

interface State {
  hasError: boolean
  error?: Error
}

// Klassen-Komponente — für Error Boundaries Pflicht
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // Wird bei Fehler im Kindbaum aufgerufen — State für Fallback setzen
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  // Für Logging (Sentry, etc.)
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="error-boundary">
          <h2>Etwas ist schiefgelaufen.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import ErrorBoundary from './ErrorBoundary'
import BrokenComponent from './BrokenComponent'

function App() {
  return (
    <ErrorBoundary fallback={<p>Diese Sektion ist nicht verfügbar.</p>}>
      <BrokenComponent />
    </ErrorBoundary>
  )
}

export default App`,
          },
          {
            name: 'ErrorBoundary.css',
            language: 'css',
            code: `
.error-boundary {
  color: red;
  padding: 16px;
}
`,
          },
        ],
      },
      {
        id: 24,
        title: 'Lazy Loading & Suspense',
        category: 'Fortgeschritten',
        explanation: `**React.lazy()** lädt eine Komponente erst wenn sie gebraucht wird — Code-Splitting.
**Suspense** zeigt eine Fallback-UI während die Komponente noch geladen wird.
Ergebnis: Kleineres initiales Bundle, schnellere erste Ladezeit.`,
        keyPoints: [
          'React.lazy(() => import("./Heavy")) — dynamischer Import',
          '<Suspense fallback={<Loader />}> — während Laden',
          'Gilt auch für Routen — sehr häufiger Einsatz',
          'Vite unterstützt Code-Splitting automatisch',
        ],
        files: [
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { lazy, Suspense } from 'react'

// lazy: Komponente wird erst beim ersten Render geladen
// Das erstellt einen eigenen JS-Chunk in Vite
const HeavyChart  = lazy(() => import('./HeavyChart'))
const AdminPanel  = lazy(() => import('./AdminPanel'))

function App() {
  return (
    <div>
      {/* Suspense zeigt Fallback bis lazy-Komponente geladen ist */}
      <Suspense fallback={<p>Chart wird geladen...</p>}>
        <HeavyChart />
      </Suspense>

      {/* Mehrere lazy-Komponenten unter einem Suspense */}
      <Suspense fallback={<div className="skeleton">Lädt...</div>}>
        <AdminPanel />
      </Suspense>
    </div>
  )
}

export default App`,
          },
        ],
      },
      {
        id: 25,
        title: 'Portale — Rendering außerhalb des Root',
        category: 'Fortgeschritten',
        explanation: `**Portals** rendern Kinder in einen anderen DOM-Knoten als den Parent — aber bleiben im React-Komponentenbaum.
Haupteinsatz: Modals, Tooltips, Dropdowns — diese müssen oft über anderen Elementen liegen (z-index/overflow Probleme).`,
        keyPoints: [
          'createPortal(jsx, domNode) — rendert jsx in domNode',
          'Events bubblen trotzdem durch React-Komponentenbaum',
          'domNode muss im echten DOM existieren (z.B. document.body)',
        ],
        files: [
          {
            name: 'Modal.tsx',
            language: 'tsx',
            code: `import { createPortal } from 'react-dom'
import { ReactNode } from 'react'
import './Modal.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  // createPortal rendert direkt in document.body
  // — unabhängig von parent overflow/z-index Regeln
  return createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}  // Klick auf Backdrop = schließen
    >
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}  // Klick im Modal nicht weiterleiten
      >
        {children}
        <button onClick={onClose}>Schließen</button>
      </div>
    </div>,
    document.body  // Ziel-DOM-Knoten
  )
}

export default Modal`,
          },
          {
            name: 'Modal.css',
            language: 'css',
            code: `
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
}
`,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // KAPITEL 4: PRAXISPROJEKT
  // ─────────────────────────────────────────────
  {
    title: '4. Praxisprojekt: SportsDash',
    lessons: [
      {
        id: 26,
        title: 'Projektübersicht & Architektur',
        category: 'Praxisprojekt',
        explanation: `Wir bauen **SportsDash** — eine App mit Login/Register und Fußball-Ergebnissen via API.
Die App nutzt React Router für Navigation, Context für Auth-State, und fetch() für API-Daten.
**Datenfluss**: AuthContext → Router → geschützte Seiten → API-Komponenten.`,
        keyPoints: [
          'Ordnerstruktur: src/components, src/pages, src/context, src/hooks, src/types',
          'AuthContext: verwaltet eingeloggten User global',
          'PrivateRoute: leitet nicht-eingeloggte User zum Login um',
          'API: api-football.com (kostenloser Tier verfügbar)',
        ],
        files: [
          {
            name: 'Ordnerstruktur',
            language: 'bash',
            code: `src/
├── components/
│   ├── Layout.tsx          # Nav + Wrapper
│   ├── PrivateRoute.tsx    # Routen-Schutz
│   ├── MatchCard.tsx       # Spielergebnis-Karte
│   └── LoadingSpinner.tsx  # Ladeindikator
├── context/
│   └── AuthContext.tsx     # Globaler Auth-State
├── hooks/
│   ├── useAuth.ts          # Auth Custom Hook
│   └── useFetch.ts         # Generic Fetch Hook
├── pages/
│   ├── LoginPage.tsx       # Login-Formular
│   ├── RegisterPage.tsx    # Registrierung
│   └── DashboardPage.tsx   # Fußball-Ergebnisse
├── types/
│   └── index.ts            # Alle TypeScript-Interfaces
├── App.tsx                 # Router-Setup
└── main.tsx                # Einstiegspunkt`,
          },
        ],
      },
      {
        id: 27,
        title: 'Projekt: Types & Interfaces',
        category: 'Praxisprojekt',
        explanation: `Alle TypeScript-Typen zentral in einer Datei — so haben alle Komponenten dieselben Definitionen.
User-Daten, API-Response-Typen und Auth-Context-Typ sind hier definiert.`,
        keyPoints: [
          'Zentrale types/index.ts verhindert doppelte Definitionen',
          'API-Typen exakt nach API-Dokumentation benennen',
          'Optional fields (?) für Felder die manchmal fehlen',
        ],
        files: [
          {
            name: 'src/types/index.ts',
            language: 'tsx',
            code: `// ── Auth ──────────────────────────────────────
export interface User {
  id: string
  username: string
  email: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

// ── Auth Context ───────────────────────────────
export interface AuthContextType {
  user: User | null               // null = nicht eingeloggt
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  isLoading: boolean
}

// ── Fußball API (api-football.com) ─────────────
export interface Team {
  id: number
  name: string
  logo: string
}

export interface Goals {
  home: number | null
  away: number | null
}

export interface MatchStatus {
  short: string   // "FT" = Abgepfiffen, "NS" = Nicht gestartet
  long: string
  elapsed: number | null
}

export interface Fixture {
  id: number
  date: string
  status: MatchStatus
}

export interface Match {
  fixture: Fixture
  teams: {
    home: Team
    away: Team
  }
  goals: Goals
  league: {
    name: string
    country: string
    logo: string
  }
}

export interface ApiResponse<T> {
  response: T[]
  errors: Record<string, string>
}`,
          },
        ],
      },
      {
        id: 28,
        title: 'Projekt: AuthContext',
        category: 'Praxisprojekt',
        explanation: `Der AuthContext verwaltet den eingeloggten User global — alle Komponenten können darauf zugreifen.
Für diese Demo simulieren wir Login/Register lokal (kein Backend nötig). In einer echten App wäre das ein API-Call.
Der User wird im localStorage gespeichert — bleibt auch nach Seiten-Reload erhalten.`,
        keyPoints: [
          'localStorage: User-Session persistieren',
          'JSON.parse/stringify: Objekte in localStorage konvertieren',
          'Provider wraps die ganze App in main.tsx',
          'Custom Hook useAuth() für bequemen Zugriff',
        ],
        files: [
          {
            name: 'src/context/AuthContext.tsx',
            language: 'tsx',
            code: `import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User, LoginData, RegisterData, AuthContextType } from '../types'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]         = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)

  // Beim Start: gespeicherten User aus localStorage laden
  useEffect(() => {
    const stored = localStorage.getItem('auth_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  async function register(data: RegisterData): Promise<void> {
    // Demo: simuliert API-Call — in Produktion: fetch('/api/register', ...)
    const newUser: User = {
      id: crypto.randomUUID(),
      username: data.username,
      email: data.email,
    }
    localStorage.setItem('auth_user', JSON.stringify(newUser))
    setUser(newUser)
  }

  async function login(data: LoginData): Promise<void> {
    // Demo: akzeptiert jeden User der registriert wurde
    const stored = localStorage.getItem('auth_user')
    if (!stored) throw new Error('Kein Account gefunden — bitte registrieren')
    const savedUser: User = JSON.parse(stored)
    if (savedUser.email !== data.email) throw new Error('E-Mail stimmt nicht überein')
    setUser(savedUser)
  }

  function logout() {
    localStorage.removeItem('auth_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom Hook — prüft ob Context vorhanden (Safety)
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth muss innerhalb von AuthProvider genutzt werden')
  return ctx
}`,
          },
        ],
      },
      {
        id: 29,
        title: 'Projekt: PrivateRoute & Layout',
        category: 'Praxisprojekt',
        explanation: `**PrivateRoute** schützt Seiten die nur eingeloggte User sehen dürfen — leitet sonst zum Login um.
**Layout** stellt den gemeinsamen Header/Nav für alle Seiten bereit.`,
        keyPoints: [
          'Navigate component: programmatische Umleitung in Router',
          'replace: ersetzt History-Eintrag (kein Zurück-Button zur geschützten Seite)',
          'Outlet: rendert die aktuelle Kind-Route',
        ],
        files: [
          {
            name: 'src/components/PrivateRoute.tsx',
            language: 'tsx',
            code: `import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateRoute() {
  const { user, isLoading } = useAuth()

  // Während Auth-State geladen wird: nichts zeigen
  if (isLoading) return <div>Laden...</div>

  // Nicht eingeloggt: zum Login umleiten
  if (!user) return <Navigate to="/login" replace />

  // Eingeloggt: die geschützte Kind-Route rendern
  return <Outlet />
}

export default PrivateRoute`,
          },
          {
            name: 'src/components/Layout.tsx',
            language: 'tsx',
            code: `import { Link, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Layout.css'

function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="layout-wrapper">
      <header className="layout-header">
        <Link to="/dashboard" className="layout-logo">
          ⚽ SportsDash
        </Link>

        {user && (
          <div className="layout-nav">
            <span className="layout-greeting">Hallo, {user.username}</span>
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Abmelden
            </button>
          </div>
        )}
      </header>

      <main className="layout-main">
        <Outlet />   {/* Hier wird die aktuelle Seite gerendert */}
      </main>
    </div>
  )
}

export default Layout`,
          },
          {
            name: 'Layout.css',
            language: 'css',
            code: `
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  background: #1a1a2e;
  color: #fff;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layout-logo {
  color: #e94560;
  font-weight: bold;
  text-decoration: none;
}

.layout-nav {
  display: flex;
  gap: 16px;
  align-items: center;
}

.layout-greeting {
  color: #aaa;
}

.logout-button {
  background: #e94560;
  color: #fff;
  border: none;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
}

.layout-main {
  flex: 1;
  padding: 24px;
  background: #0f3460;
  color: #fff;
}
`,
          },
        ],
      },
      {
        id: 30,
        title: 'Projekt: Login & Register Pages',
        category: 'Praxisprojekt',
        explanation: `Login und Register sind kontrollierte Formulare die den AuthContext nutzen.
Fehler werden in einem lokalen Error-State angezeigt. Nach Erfolg wird zur Dashboard-Seite navigiert.`,
        keyPoints: [
          'try/catch um login()/register() — fängt Fehler aus AuthContext',
          'navigate("/dashboard") nach erfolgreichem Login',
          'Link zu /register für User ohne Account',
        ],
        files: [
          {
            name: 'src/pages/LoginPage.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { LoginData } from '../types'
import './AuthPages.css'

function LoginPage() {
  const [form, setForm]   = useState<LoginData>({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">⚽ SportsDash Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <label>E-Mail</label>
          <input name="email" type="email" value={form.email}
                 onChange={handleChange} className="auth-input" required />
        </div>
        <div className="auth-field">
          <label>Passwort</label>
          <input name="password" type="password" value={form.password}
                 onChange={handleChange} className="auth-input" required />
        </div>
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" disabled={loading}
          className={\`auth-submit\${loading ? ' auth-submit--loading' : ''}\`}>
          {loading ? 'Anmelden...' : 'Anmelden'}
        </button>
      </form>
      <p className="auth-footer">
        Noch kein Account? <Link to="/register" className="auth-link">Registrieren</Link>
      </p>
    </div>
  )
}

export default LoginPage`,
          },
          {
            name: 'src/pages/RegisterPage.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { RegisterData } from '../types'
import './AuthPages.css'

function RegisterPage() {
  const [form, setForm]   = useState<RegisterData>({ username: '', email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password.length < 6) { setError('Passwort min. 6 Zeichen'); return }
    setError(null)
    setLoading(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrierung fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">⚽ Registrieren</h2>
      <form onSubmit={handleSubmit}>
        {(['username', 'email', 'password'] as const).map(field => (
          <div key={field} className="auth-field">
            <label className="auth-label-capitalize">{field}</label>
            <input
              name={field}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              value={form[field]}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>
        ))}
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" disabled={loading}
          className="auth-submit">
          {loading ? 'Registrieren...' : 'Registrieren'}
        </button>
      </form>
      <p className="auth-footer">
        Schon registriert? <Link to="/login" className="auth-link">Anmelden</Link>
      </p>
    </div>
  )
}

export default RegisterPage`,
          },
          {
            name: 'AuthPages.css',
            language: 'css',
            code: `
.auth-container {
  max-width: 400px;
  margin: 60px auto;
}

.auth-title {
  color: #e94560;
  margin-bottom: 24px;
}

.auth-field {
  margin-bottom: 16px;
}

.auth-input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  background: #16213e;
  border: 1px solid #e94560;
  border-radius: 4px;
  color: #fff;
  box-sizing: border-box;
}

.auth-error {
  color: #e94560;
}

.auth-submit {
  width: 100%;
  padding: 10px;
  background: #e94560;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.auth-submit--loading {
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 16px;
  color: #aaa;
}

.auth-link {
  color: #e94560;
}

.auth-label-capitalize {
  text-transform: capitalize;
}
`,
          },
        ],
      },
      {
        id: 31,
        title: 'Projekt: Dashboard & API',
        category: 'Praxisprojekt',
        explanation: `Das Dashboard lädt Live-Fußballdaten von der API. Wir nutzen einen Mock-Datensatz falls kein API-Key vorhanden.
Die Daten werden als Karten-Grid angezeigt mit Team-Namen, Logos, Ergebnis und Status.`,
        keyPoints: [
          'Echter API-Key von api-football.com — kostenloser Plan verfügbar',
          'Mock-Daten als Fallback für Entwicklung ohne Key',
          'Karten-Grid mit CSS Grid/Flex',
          'Status "FT" = Abgepfiffen, "1H"/"2H" = Laufend',
        ],
        files: [
          {
            name: 'src/pages/DashboardPage.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import MatchCard from '../components/MatchCard'
import useFetch from '../hooks/useFetch'
import type { Match, ApiResponse } from '../types'
import './DashboardPage.css'

// Mock-Daten für den Fall ohne echten API-Key
const MOCK_MATCHES: Match[] = [
  {
    fixture: { id: 1, date: '2025-06-01T18:00:00Z', status: { short: 'FT', long: 'Match Finished', elapsed: 90 } },
    teams: {
      home: { id: 157, name: 'Bayern München', logo: 'https://media.api-sports.io/football/teams/157.png' },
      away: { id: 165, name: 'Borussia Dortmund', logo: 'https://media.api-sports.io/football/teams/165.png' },
    },
    goals: { home: 2, away: 1 },
    league: { name: 'Bundesliga', country: 'Germany', logo: '' },
  },
  {
    fixture: { id: 2, date: '2025-06-01T20:30:00Z', status: { short: 'FT', long: 'Match Finished', elapsed: 90 } },
    teams: {
      home: { id: 529, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
      away: { id: 541, name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
    },
    goals: { home: 3, away: 3 },
    league: { name: 'La Liga', country: 'Spain', logo: '' },
  },
  {
    fixture: { id: 3, date: '2025-06-01T15:00:00Z', status: { short: 'FT', long: 'Match Finished', elapsed: 90 } },
    teams: {
      home: { id: 40, name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' },
      away: { id: 33, name: 'Manchester United', logo: 'https://media.api-sports.io/football/teams/33.png' },
    },
    goals: { home: 4, away: 0 },
    league: { name: 'Premier League', country: 'England', logo: '' },
  },
]

// Ersetze mit deinem Key von api-football.com (kostenlos registrieren)
const API_KEY = ''  // Leer = Mock-Daten

function DashboardPage() {
  const { user } = useAuth()
  const [useMock, setUseMock] = useState(!API_KEY)

  // Echter API-Call wenn Key vorhanden
  const today = new Date().toISOString().split('T')[0]
  const apiUrl = \`https://v3.football.api-sports.io/fixtures?date=\${today}&league=78&season=2024\`

  const { data, loading, error } = useFetch<ApiResponse<Match>>(
    useMock ? '' : apiUrl,
    API_KEY ? { 'x-apisports-key': API_KEY } : {}
  )

  const matches = useMock ? MOCK_MATCHES : (data?.response ?? [])

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">⚽ Spielergebnisse</h1>
          <p className="dashboard-subtitle">Willkommen, {user?.username}!</p>
        </div>
        <button
          onClick={() => setUseMock(m => !m)}
          className="dashboard-toggle"
        >
          {useMock ? '🔴 Mock-Daten' : '🟢 Live-Daten'}
        </button>
      </div>

      {loading && <p>Lade Spiele...</p>}
      {error   && <p className="dashboard-error">Fehler: {error}</p>}

      <div className="matches-grid">
        {matches.map(match => (
          <MatchCard key={match.fixture.id} match={match} />
        ))}
      </div>

      {!loading && matches.length === 0 && (
        <p className="dashboard-empty">Keine Spiele für heute gefunden.</p>
      )}
    </div>
  )
}

export default DashboardPage`,
          },
          {
            name: 'src/components/MatchCard.tsx',
            language: 'tsx',
            code: `import type { Match } from '../types'
import { memo } from 'react'
import './MatchCard.css'

interface MatchCardProps {
  match: Match
}

// Hilfsfunktion: Status-Badge CSS-Klasse
function getStatusClass(status: string): string {
  if (status === 'FT') return 'status-badge status-badge--finished'
  if (['1H', '2H', 'ET'].includes(status)) return 'status-badge status-badge--live'
  return 'status-badge status-badge--scheduled'
}

const MatchCard = memo(function MatchCard({ match }: MatchCardProps) {
  const { teams, goals, fixture, league } = match
  const isFinished = fixture.status.short === 'FT'

  return (
    <div className="match-card">
      {/* Liga */}
      <p className="match-league">
        {league.name} · {league.country}
      </p>

      {/* Ergebnis-Zeile */}
      <div className="match-row">
        {/* Heimteam */}
        <div className="match-team">
          <img src={teams.home.logo} alt={teams.home.name}
               className="team-logo"
               onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <p className="team-name">{teams.home.name}</p>
        </div>

        {/* Ergebnis / Status */}
        <div className="match-score">
          <div className="score-value">
            {isFinished || fixture.status.elapsed
              ? \`\${goals.home ?? '–'} : \${goals.away ?? '–'}\`
              : 'vs'}
          </div>
          <span className={getStatusClass(fixture.status.short)}>
            {fixture.status.short === 'NS'
              ? new Date(fixture.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
              : fixture.status.short}
          </span>
        </div>

        {/* Auswärtsteam */}
        <div className="match-team">
          <img src={teams.away.logo} alt={teams.away.name}
               className="team-logo"
               onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <p className="team-name">{teams.away.name}</p>
        </div>
      </div>
    </div>
  )
})

export default MatchCard`,
          },
          {
            name: 'src/hooks/useFetch.ts',
            language: 'tsx',
            code: `import { useState, useEffect } from 'react'

// Erweitert: optionale custom Headers (für API-Keys)
function useFetch<T>(url: string, headers: Record<string, string> = {}) {
  const [data, setData]       = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!url) return  // Kein URL = kein Fetch (für Mock-Modus)

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(url, { headers })
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        const json: T = await res.json()
        setData(json)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unbekannter Fehler')
      } finally {
        setLoading(false)
      }
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])  // Headers bewusst nicht als Dep (würde Endlosschleife bei Inline-Objekt)

  return { data, loading, error }
}

export default useFetch`,
          },
          {
            name: 'DashboardPage.css',
            language: 'css',
            code: `
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dashboard-title {
  color: #e94560;
  margin: 0;
}

.dashboard-subtitle {
  color: #aaa;
  margin: 4px 0 0;
}

.dashboard-toggle {
  background: #16213e;
  color: #e94560;
  border: 1px solid #e94560;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
}

.dashboard-error {
  color: #e94560;
}

.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.dashboard-empty {
  color: #aaa;
}
`,
          },
          {
            name: 'MatchCard.css',
            language: 'css',
            code: `
.match-card {
  background: #16213e;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #1a1a2e;
}

.match-league {
  color: #888;
  font-size: 12px;
  margin: 0 0 12px;
}

.match-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.match-team {
  text-align: center;
  flex: 1;
}

.team-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.team-name {
  margin: 8px 0 0;
  font-size: 13px;
}

.match-score {
  text-align: center;
  padding: 0 16px;
}

.score-value {
  font-size: 24px;
  font-weight: bold;
  color: #e94560;
}

.status-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
  margin-top: 4px;
  display: inline-block;
}

.status-badge--finished {
  background: #27ae60;
}

.status-badge--live {
  background: #e94560;
}

.status-badge--scheduled {
  background: #888;
}
`,
          },
        ],
      },
      {
        id: 32,
        title: 'Projekt: App.tsx — Router zusammenbauen',
        category: 'Praxisprojekt',
        explanation: `Jetzt verbinden wir alles: Router, Auth-Provider, Layout, Private Routes und alle Seiten.
Diese Datei ist der zentrale Dreh- und Angelpunkt — hier ist die Struktur der ganzen App definiert.`,
        keyPoints: [
          'Verschachtelte Routes: Layout als Wrapper für alle Seiten',
          'PrivateRoute schützt /dashboard',
          'Navigate to="/login": Root-URL leitet zum Login',
        ],
        files: [
          {
            name: 'src/main.tsx',
            language: 'tsx',
            code: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'  // Auth-Context
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>   {/* Auth für die gesamte App verfügbar */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)`,
          },
          {
            name: 'src/App.tsx',
            language: 'tsx',
            code: `import { Routes, Route, Navigate } from 'react-router-dom'
import Layout       from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Routes>
      {/* Alle Seiten innerhalb des Layouts */}
      <Route element={<Layout />}>

        {/* Öffentliche Routen */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Geschützte Routen — PrivateRoute prüft Auth */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* Root und unbekannte URLs → Login */}
        <Route path="/"  element={<Navigate to="/login" replace />} />
        <Route path="*"  element={<Navigate to="/login" replace />} />

      </Route>
    </Routes>
  )
}

export default App`,
          },
          {
            name: 'src/index.css',
            language: 'css',
            code: `/* Reset & Basis-Styles */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #0f3460;
  color: #ffffff;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}

input {
  font-family: inherit;
}`,
          },
          {
            name: 'package.json (deps)',
            language: 'json',
            code: `{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.1"
  }
}`,
          },
        ],
      },
    ],
  },
];
