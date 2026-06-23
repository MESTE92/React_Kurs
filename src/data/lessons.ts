import type { Chapter } from '../types';

export const chapters: Chapter[] = [
  // ─────────────────────────────────────────────
  // KAPITEL 1: GRUNDLAGEN
  // ─────────────────────────────────────────────
  {
    title: '1. Grundlagen',
    lessons: [
      {
        id: 0,
        title: 'Projekt aufsetzen — React + Vite',
        category: 'Grundlagen',
        explanation: `Bevor du React-Code schreiben kannst, brauchst du ein Projekt. Mit einem einzigen Terminal-Befehl erstellt **Vite** das komplette Gerüst — inklusive TypeScript, React und einer funktionierenden Grundstruktur.

Nach \`npm create vite@latest\` und \`npm install\` entsteht folgende Ordnerstruktur:

**Einstiegspunkte — der Ladeweg von außen nach innen:**

**\`index.html\`** ist die einzige HTML-Datei der gesamten App. Der Browser lädt sie als erstes. Sie enthält ein leeres \`<div id="root">\` und einen \`<script>\`-Tag der auf \`main.tsx\` zeigt — mehr steht da absichtlich nicht drin, den Rest erledigt React.

**\`src/main.tsx\`** ist der JavaScript-Einstiegspunkt. Er sucht das \`<div id="root">\` aus der HTML-Datei und übergibt es an React mit \`createRoot(...).render(...)\`. Hier wird auch das globale CSS (\`index.css\`) geladen. Nach dieser Datei übernimmt React vollständig die Kontrolle über die Seite.

**\`src/App.tsx\`** ist deine erste eigene React-Komponente — der Startpunkt für dein UI. Alles was du im Browser siehst, kommt letztendlich von hier. Diese Datei wirst du am häufigsten bearbeiten.

**Konfigurationsdateien — einmal einrichten, selten anfassen:**

**\`vite.config.ts\`** konfiguriert das Build-Tool. Das React-Plugin darin aktiviert JSX-Unterstützung und sorgt für Fast Refresh (automatisches Neuladen beim Speichern). Als Einsteiger musst du diese Datei nicht verändern.

**\`tsconfig.json\`** konfiguriert den TypeScript-Compiler — welche Dateien geprüft werden, wie streng TypeScript sein soll und welche modernen Features erlaubt sind. Auch diese Datei bleibt am Anfang unangetastet.

**\`package.json\`** listet alle Abhängigkeiten des Projekts und die verfügbaren npm-Befehle. \`npm install\` liest diese Datei und lädt alles herunter was darin steht. Neue Pakete landen hier automatisch wenn du sie mit \`npm install paketname\` hinzufügst.`,
        keyPoints: [
          '`index.html` → `main.tsx` → `App.tsx` — das ist der Ladeweg der App',
          '`<div id="root">` in index.html ist der Einhängepunkt für React',
          '`createRoot(...).render(...)` in main.tsx startet React',
          '`npm run dev` startet den Dev-Server unter localhost:5173',
          '`src/` ist der Ordner für deinen gesamten React-Code',
        ],
        learningGoals: [
          'Ein neues React-Projekt mit Vite und TypeScript aufsetzen',
          'Die wichtigsten Dateien und Ordner eines Vite-Projekts verstehen',
          'Den Ladeweg von index.html über main.tsx bis App.tsx erklären',
        ],
        files: [
          {
            name: 'Terminal',
            language: 'bash',
            code: `# Weg 1: Interaktiv — Vite fragt Schritt für Schritt nach
npm create vite@latest
# → Projektname eingeben
# → Framework wählen: React
# → Variant wählen:   TypeScript

# Weg 2: Direkt — alles auf einmal, kein Dialog
npm create vite@latest meine-app -- --template react-ts

# In den Projektordner wechseln
cd meine-app

# Abhängigkeiten installieren (node_modules wird angelegt)
npm install

# Entwicklungsserver starten — App läuft unter http://localhost:5173
npm run dev`,
          },
          {
            name: 'Projektstruktur',
            language: 'bash',
            code: `meine-app/
├── public/                  # Statische Assets (werden 1:1 kopiert)
│   └── vite.svg
│
├── src/                     # Dein gesamter React-Code
│   ├── assets/              # Bilder, Icons die importiert werden
│   │   └── react.svg
│   ├── App.css              # Styles für App.tsx
│   ├── App.tsx              # Deine Haupt-Komponente (hier fängst du an)
│   ├── index.css            # Globale Styles (body, *, ...)
│   ├── main.tsx             # Einstiegspunkt — hängt React in index.html ein
│   └── vite-env.d.ts        # TypeScript-Typen für Vite (nicht anfassen)
│
├── index.html               # Die einzige HTML-Datei der App
├── package.json             # Abhängigkeiten + npm-Skripte
├── tsconfig.json            # TypeScript-Konfiguration
├── tsconfig.app.json        # TS-Config speziell für den src/-Code
├── tsconfig.node.json       # TS-Config für vite.config.ts
└── vite.config.ts           # Vite-Konfiguration`,
          },
          {
            name: 'index.html',
            language: 'html',
            code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>

    <!-- Hier hängt React die gesamte App ein -->
    <div id="root"></div>

    <!-- Einstiegspunkt: Vite lädt main.tsx als ES-Modul -->
    <script type="module" src="/src/main.tsx"></script>

  </body>
</html>`,
          },
          {
            name: 'main.tsx',
            language: 'tsx',
            code: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'     // globale Styles laden
import App from './App.tsx'

// Das <div id="root"> aus index.html als React-Wurzel verwenden
createRoot(document.getElementById('root')!).render(
  // StrictMode aktiviert extra Warnungen in der Entwicklung
  <StrictMode>
    <App />
  </StrictMode>,
)`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import './App.css'

// Die Haupt-Komponente — hier fängst du an zu entwickeln
function App() {
  return (
    <div>
      <h1>Hallo React!</h1>
    </div>
  )
}

export default App`,
          },
          {
            name: 'vite.config.ts',
            language: 'ts',
            code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite-Konfiguration
// Das React-Plugin aktiviert JSX-Unterstützung und Fast Refresh
export default defineConfig({
  plugins: [react()],
})`,
          },
          {
            name: 'package.json',
            language: 'json',
            code: `{
  "name": "meine-app",
  "scripts": {
    "dev":     "vite",              // Entwicklungsserver starten
    "build":   "tsc -b && vite build", // Für Produktion bauen
    "preview": "vite preview"       // Build lokal testen
  },
  "dependencies": {
    "react":     "^19.0.0",  // React selbst
    "react-dom": "^19.0.0"   // React für den Browser (DOM)
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0", // JSX + Fast Refresh
    "typescript":           "^5.0.0", // TypeScript-Compiler
    "vite":                 "^6.0.0"  // Build-Tool
  }
}`,
          },
        ],
      },
      {
        id: 1,
        title: 'Was ist React?',
        category: 'Grundlagen',
        explanation: `**React** ist eine JavaScript-Bibliothek von Meta zum Bauen von Benutzeroberflächen. Sie wird eingesetzt weil moderne Web-Apps komplex und interaktiv sind — React macht es einfacher, solche UIs strukturiert und wartbar zu entwickeln.

**SPA vs. klassische Website:**
Bei einer klassischen Website lädt der Browser bei jedem Klick eine komplett neue HTML-Seite vom Server. Bei einer **Single Page Application (SPA)** wird die Seite nur einmal geladen — danach tauscht JavaScript gezielt einzelne Bereiche aus, ohne die Seite neu zu laden. React-Apps sind SPAs: schneller, flüssiger, und das UI reagiert sofort auf Aktionen.

**Komponenten:**
React zerlegt eine UI in kleine, wiederverwendbare **Komponenten** — jede Komponente ist eine Funktion die einen Teil der Oberfläche beschreibt (z.B. ein Button, eine Karte, eine Navbar). Du baust komplexe UIs indem du einfache Komponenten zusammensetzt.

**Virtual DOM:**
Wenn sich Daten ändern, berechnet React intern zuerst in einem **Virtual DOM** (einer Kopie der Seitenstruktur im Speicher) was sich geändert hat — und aktualisiert dann nur die betroffenen Stellen im echten Browser-DOM. Das ist deutlich schneller als die gesamte Seite neu zu rendern.`,
        keyPoints: [
          'React = UI-Bibliothek für SPAs, kein vollständiges Framework',
          'SPA = Seite wird einmal geladen, dann nur Teile ausgetauscht',
          'Komponente = Funktion die einen UI-Baustein beschreibt',
          'Virtual DOM = React vergleicht intern und aktualisiert nur was sich geändert hat',
        ],
        learningGoals: [
          'Erklären was React ist und warum es eingesetzt wird',
          'Den Unterschied zwischen einer SPA und einer klassischen Website beschreiben',
          'Verstehen was Komponenten und der Virtual DOM sind',
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
        explanation: `**JSX** steht für **JavaScript XML** — XML weil die Syntax an HTML/XML erinnert. JSX ist eine Syntax-Erweiterung für JavaScript/TypeScript: du schreibst HTML-ähnlichen Code direkt in deinen JS-Dateien. TypeScript kompiliert das im Hintergrund zu normalen \`React.createElement()\`-Aufrufen — davon siehst du nichts, es passiert automatisch.

**JSX vs. HTML — die wichtigsten Unterschiede:**
JSX sieht aus wie HTML, ist es aber nicht. Das fällt besonders bei Attributen auf: \`class\` heißt in JSX \`className\` (weil \`class\` ein reserviertes Keyword in JavaScript ist), und \`for\` bei \`<label>\`-Elementen heißt \`htmlFor\`. Außerdem muss jede Komponente genau **ein** Wurzelelement zurückgeben — mehrere nebeneinanderstehende Elemente müssen in ein \`<div>\` oder ein leeres Fragment \`<></>\` eingewickelt werden.

**JavaScript-Ausdrücke mit \`{}\` einbetten:**
Überall wo du in JSX einen dynamischen Wert brauchst, schreibst du geschweifte Klammern \`{}\`. Darin kannst du Variablen, Berechnungen oder Bedingungen einsetzen — zum Beispiel \`{name}\` für eine Variable, \`{2 + 2}\` für eine Berechnung, oder \`{isLoggedIn ? 'Eingeloggt' : 'Gast'}\` für eine Bedingung. Alles was zwischen \`{}\` steht wird als JavaScript ausgewertet.`,
        preview: `<div>
  <h1>Hallo, Welt!</h1>
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
        learningGoals: [
          'JSX-Syntax korrekt schreiben und von HTML unterscheiden',
          'JavaScript-Ausdrücke mit {} in JSX einbetten',
          'Wissen warum JSX className statt class verwendet',
        ],
        files: [
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import './App.css'

function App() {
  const name = "Welt"             // JS-Variable
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
        explanation: `Eine **Komponente** ist eine ganz normale TypeScript-Funktion — sie gibt JSX zurück und beschreibt damit einen Teil der Benutzeroberfläche. Komponenten müssen immer mit einem **Großbuchstaben** beginnen: So unterscheidet React zwischen einem HTML-Tag wie \`<div>\` und einer eigenen Komponente wie \`<Header />\`. Eine Datei enthält üblicherweise genau eine Komponente, die am Ende mit \`export default\` exportiert wird.

**Komponenten in anderen Komponenten verwenden:**
Du kannst Komponenten genauso wie HTML-Tags ineinander verschachteln. In \`App.tsx\` importierst du \`<Header />\` und \`<Footer />\` und verwendest sie einfach als Tags — React baut daraus einen **Komponentenbaum**. Jede Komponente ist dabei für ihren eigenen Bereich der UI verantwortlich.

**Komponente vs. HTML-Element:**
\`<div>\` ist ein echtes HTML-Element — der Browser kennt es direkt. \`<Header />\` ist eine React-Komponente — React ruft die Funktion auf, bekommt JSX zurück und rendert das Ergebnis. Der Großbuchstabe ist das Erkennungsmerkmal: alles mit Kleinbuchstaben ist HTML, alles mit Großbuchstaben ist eine Komponente.`,
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
        learningGoals: [
          'Eigene React-Komponenten als Funktionen erstellen',
          'Komponenten in anderen Komponenten verwenden',
          'Den Unterschied zwischen Komponente und HTML-Element erkennen',
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
        explanation: `**Props** (kurz für Properties) sind wie Funktionsargumente für Komponenten — du übergibst Daten von außen, die Komponente nutzt sie intern. Du schreibst Props wie HTML-Attribute: \`<Card title="React" badge="Neu" />\`. Innerhalb der Komponente kommen die Props als Objekt an, das du per **Destructuring** direkt entpacken kannst: \`function Card({ title, badge }: CardProps)\`.

**Typen für Props mit TypeScript:**
Mit einem \`interface\` legst du fest welche Props erlaubt sind und welchen Typ sie haben. Pflicht-Props schreibst du ohne \`?\`, optionale Props mit \`?\` — zum Beispiel \`badge?: string\`. TypeScript zeigt dir sofort einen Fehler wenn du eine Pflicht-Prop vergisst oder den falschen Typ übergibst.

**Props fließen nur von oben nach unten:**
Daten wandern in React immer **von der Elternkomponente zur Kindkomponente** — niemals umgekehrt. Das ist Absicht: so bleibt der Datenfluss vorhersehbar und leicht nachvollziehbar. Eine Komponente kann ihre eigenen Props nicht verändern — sie sind readonly. Wenn Daten "nach oben" sollen, brauchst du State Lifting (kommt in Lektion 10).`,
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
        learningGoals: [
          'Props definieren und an eine Komponente übergeben',
          'Typen für Props mit TypeScript festlegen',
          'Verstehen warum Props nur von oben nach unten fließen',
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
        explanation: `**children** ist ein besonderes Prop in React: es enthält alles was du zwischen den öffnenden und schließenden Tag einer Komponente schreibst. Wenn du also \`<Box><p>Hallo</p></Box>\` schreibst, ist der \`<p>\`-Absatz das \`children\` der \`Box\`-Komponente. Im TypeScript-Interface deklarierst du es als \`children: ReactNode\` — \`ReactNode\` ist der Typ für "alles was React rendern kann": Text, JSX-Elemente, Arrays oder auch \`null\`.

**Unterschied zwischen regulären Props und children:**
Reguläre Props übergibst du explizit als Attribute: \`<Card title="Hallo" color="blau" />\`. Children schreibst du dagegen zwischen die Tags — das ist der Inhalt der Komponente, nicht ihre Konfiguration. Du kannst natürlich beides kombinieren: eine Komponente kann sowohl eigene Props haben als auch children enthalten.

**Wrapper-Komponenten mit children:**
Das klassische Einsatzgebiet für children ist eine **Wrapper-Komponente**: eine Komponente die nur Styling oder Struktur liefert, aber nicht weiß was drin sein wird. Eine \`Box\`-Komponente kümmert sich nur um Hintergrundfarbe und Abstände — welcher Inhalt rein kommt, entscheidet die Elternkomponente. Das macht solche Wrapper extrem wiederverwendbar.`,
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
        learningGoals: [
          'Die children-Prop einsetzen um Inhalte in Komponenten einzubetten',
          'Den Unterschied zwischen regulären Props und children erklären',
          'Wrapper-Komponenten mit children bauen',
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
        explanation: `Eine **Layout-Komponente mit children** ist der CSS-Wrapper-Klassiker in React: Die Komponente definiert das Aussehen (Rahmen, Abstände, Hintergrund), aber der Inhalt kommt komplett von außen. Du baust einmal eine \`Wrapper\`-Komponente mit den gewünschten CSS-Klassen und kannst sie dann beliebig oft mit unterschiedlichem Inhalt befüllen.

**Styles über className weitergeben:**
Der Wrapper gibt seine CSS-Klasse \`className="wrapper"\` an das äußere \`<div>\` — das Styling gilt damit automatisch für alles was als \`children\` übergeben wird. Der Inhalt selbst bekommt keine extra Klassen; er liegt einfach innerhalb des gestylten Containers. So trennt du Struktur und Inhalt sauber voneinander.

**Wie children die Wiederverwendbarkeit erhöht:**
Ohne children müsstest du für jeden Karteninhalt eine eigene Komponente schreiben oder den Inhalt als Prop übergeben — das wird schnell unübersichtlich. Mit children verwendest du denselben Wrapper für beliebig viele verschiedene Inhalte. Das ist das **Kompositions-Prinzip** in React: kleine, fokussierte Komponenten die man flexibel zusammensetzen kann.`,
        keyPoints: [
          '`children` muss im Interface als `ReactNode` deklariert werden',
          'Zugriff via `props.children` oder kürzer per Destructuring `{ children }`',
          '`ReactNode` deckt alles ab: Text, JSX-Elemente, Arrays, null',
          'Wrapper-Muster: Styling in der Komponente — Inhalt kommt von außen',
        ],
        learningGoals: [
          'Eine Layout-Komponente mit children als CSS-Wrapper bauen',
          'Styles über className an Kindkomponenten weitergeben',
          'Verstehen wie children die Wiederverwendbarkeit von Komponenten erhöht',
        ],
        files: [
          {
            name: 'Wrapper.tsx',
            language: 'tsx',
            code: `import { ReactNode } from 'react'
import './Wrapper.css'

interface WrapperProps {
  children: ReactNode   // ReactNode = alles was React rendern kann (Text, JSX, Arrays...)
}

// Die Komponente kümmert sich nur um das Styling — der Inhalt kommt von außen
function Wrapper({ children }: WrapperProps) {
  return (
    <div className="wrapper">
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
      <Wrapper>
        <h2>Erster Kasten</h2>
        <p>Dieser Inhalt ist props.children</p>
      </Wrapper>

      {/* Gleiche Komponente — komplett anderer Inhalt */}
      <Wrapper>
        <p>Zweiter Kasten — dieselbe Wrapper-Komponente</p>
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
  background: #f0e6ff;
  border-left: 4px solid #7c3aed;
}`,
          },
        ],
      },
      {
        id: 7,
        title: 'useState — Zustand in Komponenten',
        category: 'Grundlagen',
        explanation: `**useState** ist eine React Hook — eine spezielle Funktion die einer Komponente "Gedächtnis" gibt. Der Aufruf \`const [count, setCount] = useState(0)\` gibt dir zwei Dinge zurück: den aktuellen Wert (\`count\`) und eine Funktion zum Ändern dieses Werts (\`setCount\`). Den initialen Wert — hier \`0\` — übergibst du als Argument an \`useState\`.

**Eine interaktive Zähler-Komponente bauen:**
Buttons rufen im \`onClick\`-Handler den Setter auf: \`setCount(count + 1)\`. Jeder Setter-Aufruf löst ein **Re-render** aus — React ruft die Komponente erneut auf, berechnet was sich geändert hat, und aktualisiert gezielt nur die betroffenen Stellen im DOM. So sieht der User immer den aktuellen Wert.

**Warum React bei State-Änderungen neu rendert:**
React verfolgt alle State-Werte intern. Wenn du \`setCount\` aufrufst, weiß React: "Diese Komponente hat sich verändert — ich muss sie neu rendern." Würdest du stattdessen die Variable direkt ändern (\`count = count + 1\`), würde React das nicht mitbekommen und der Bildschirm bliebe unverändert. Deshalb gilt die Regel: **State immer über den Setter ändern**.`,
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
          'Nie `count = count + 1` — nur über `setCount()`, sonst bemerkt React die Änderung nicht',
        ],
        learningGoals: [
          'State mit useState anlegen und aktualisieren',
          'Eine interaktive Zähler-Komponente mit Buttons bauen',
          'Verstehen warum React bei State-Änderungen neu rendert',
        ],
        files: [
          {
            name: 'Counter.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'  // Hook importieren
import './Counter.css'

function Counter() {
  // useState(0) → initialer Wert 0
  // count = aktueller Wert, setCount = Funktion zum Ändern
  const [count, setCount] = useState<number>(0)

  function handleIncrement() {
    setCount(count + 1)  // Setter aufrufen → Re-render
  }

  function handleDecrement() {
    setCount(count - 1)  // Gleiche Logik, nur minus
  }

  function handleReset() {
    setCount(0)          // Zurück auf Startwert
  }

  return (
    <div className="counter">
      <span className="counter-value">{count}</span>
      <div className="counter-buttons">
        <button className="btn-decrement" onClick={handleDecrement}>-1</button>
        <button className="btn-increment" onClick={handleIncrement}>+1</button>
        <button className="btn-reset" onClick={handleReset}>Reset</button>
      </div>
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
    <div className="app">
      <h1>State-Demo</h1>
      <Counter />
    </div>
  )
}

export default App`,
          },
          {
            name: 'Counter.css',
            language: 'css',
            code: `.app h1 {
  font-size: 20px;
  color: #2d1b4e;
  margin-bottom: 16px;
}

.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 28px 36px;
  border: 1px solid #e6ddf3;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.08);
}

.counter-value {
  font-size: 52px;
  font-weight: 700;
  color: #7c3aed;
  line-height: 1;
}

.counter-buttons {
  display: flex;
  gap: 8px;
}

.btn-decrement {
  background: #ea580c;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.btn-decrement:hover {
  background: #c2410c;
}

.btn-increment {
  background: #7c3aed;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.btn-increment:hover {
  background: #6d28d9;
}

.btn-reset {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.btn-reset:hover {
  background: #e5e7eb;
}`,
          },
        ],
      },
      {
        id: 8,
        title: 'useState — mit Objekten und Arrays',
        category: 'Grundlagen',
        explanation: `State kann nicht nur einfache Werte wie Zahlen oder Strings halten — du kannst genauso gut **Objekte und Arrays** als State verwenden. Das ist praktisch wenn mehrere zusammengehörige Daten gemeinsam verwaltet werden sollen, zum Beispiel ein Profil mit Name und Rolle.

**Den Spread-Operator zum Updaten einsetzen:**
Beim Ändern eines State-Objekts darfst du das Objekt nie direkt verändern. Stattdessen erstellst du eine neue Kopie mit dem **Spread-Operator** \`...\` und überschreibst nur das geänderte Feld: \`setProfile({ ...profile, role: 'Senior' })\`. Der Spread kopiert alle bisherigen Felder, danach kommt nur das eine Feld das sich ändert. Bei Arrays funktioniert es ähnlich: \`setSkills([...skills, 'TypeScript'])\` hängt ein neues Element an eine Kopie des Arrays.

**Warum State nie direkt verändert werden darf:**
React erkennt State-Änderungen über **Referenzvergleich**: Ist das neue Objekt eine andere Referenz als das alte? Wenn du direkt \`profile.role = 'Senior'\` schreibst, ändert sich das Objekt zwar, aber die Referenz bleibt dieselbe — React merkt nichts und rendert nicht neu. Nur wenn du ein komplett neues Objekt per Setter übergibst, sieht React die Änderung und aktualisiert das UI.`,
        keyPoints: [
          'Spread ... erstellt flache Kopie: { ...obj, key: newVal }',
          'Arrays: [...arr, newItem] statt arr.push()',
          'Objekte: { ...obj, name: "neu" } statt obj.name = "neu"',
          'Direkte Mutation wie obj.name = "x" löst keinen Re-render aus',
        ],
        learningGoals: [
          'State mit Objekten und Arrays korrekt aktualisieren',
          'Den Spread-Operator zum Updaten von State-Objekten einsetzen',
          'Verstehen warum State nie direkt verändert werden darf',
        ],
        files: [
          {
            name: 'ProfileCard.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import './ProfileCard.css'

// Nächste Skills die nacheinander hinzugefügt werden
const NEXT_SKILLS = ['TypeScript', 'Vite', 'CSS', 'Node.js']

interface Profile {
  name: string
  role: string
}

function ProfileCard() {
  // State als Objekt — name und role gebündelt in einem Wert
  const [profile, setProfile] = useState<Profile>({
    name: 'Anna',
    role: 'Junior Developer',
  })

  // State als Array — Liste der Skills
  const [skills, setSkills] = useState<string[]>(['React'])

  function promote() {
    // Spread kopiert alle Felder — nur role wird überschrieben
    setProfile({ ...profile, role: 'Senior Developer' })
  }

  function addSkill() {
    const next = NEXT_SKILLS[skills.length - 1]
    if (!next) return
    // Spread erhält das alte Array — neuer Skill hinten angehängt
    setSkills([...skills, next])
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">{profile.name[0]}</div>
        <div>
          <h2 className="profile-name">{profile.name}</h2>
          <span className="profile-role">{profile.role}</span>
        </div>
      </div>

      {/* join() zeigt das Array als Text — kein .map() nötig */}
      <p className="skills-label">Skills: {skills.join(' · ')}</p>

      <div className="profile-actions">
        <button className="btn-promote" onClick={promote}
          disabled={profile.role === 'Senior Developer'}>
          Befördern
        </button>
        <button className="btn-skill" onClick={addSkill}
          disabled={skills.length > NEXT_SKILLS.length}>
          Skill hinzufügen
        </button>
      </div>
    </div>
  )
}

export default ProfileCard`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import ProfileCard from './ProfileCard'

function App() {
  return (
    <div className="app">
      <h1>Profil-Demo</h1>
      <ProfileCard />
    </div>
  )
}

export default App`,
          },
          {
            name: 'ProfileCard.css',
            language: 'css',
            code: `.app h1 {
  font-size: 20px;
  color: #2d1b4e;
  margin-bottom: 16px;
}

.profile-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border: 1px solid #e6ddf3;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.08);
  max-width: 320px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #7c3aed;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-name {
  font-size: 16px;
  font-weight: 700;
  color: #2d1b4e;
  margin: 0 0 2px;
}

.profile-role {
  font-size: 12px;
  color: #9d8bc0;
}

.skills-label {
  font-size: 13px;
  color: #6b5b8c;
  background: #f7f3fc;
  border: 1px solid #e6ddf3;
  border-radius: 8px;
  padding: 8px 12px;
  margin: 0;
}

.profile-actions {
  display: flex;
  gap: 8px;
}

.btn-promote {
  background: #7c3aed;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  flex: 1;
}

.btn-promote:hover:not(:disabled) {
  background: #6d28d9;
}

.btn-promote:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-skill {
  background: #fff;
  color: #7c3aed;
  border: 1px solid #7c3aed;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  flex: 1;
}

.btn-skill:hover:not(:disabled) {
  background: #f3edfb;
}

.btn-skill:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}`,
          },
        ],
      },
      {
        id: 9,
        title: 'Event Handling',
        category: 'Grundlagen',
        explanation: `**Event-Handler** in React funktionieren ähnlich wie in HTML — nur dass du sie als camelCase-Props übergibst: \`onClick\`, \`onChange\`, \`onSubmit\`. Wichtig: du übergibst die Funktion als **Referenz**, nicht als Aufruf — also \`onClick={handleClick}\` ohne Klammern dahinter. Mit Klammern (\`onClick={handleClick()}\`) würde die Funktion sofort beim Rendern ausgeführt werden statt erst beim Klick.

**Den MouseEvent-Typ in TypeScript:**
Event-Handler erhalten automatisch ein **Event-Objekt** als Parameter. In TypeScript musst du dem Parameter den richtigen Typ geben. Für Buttons ist das \`React.MouseEvent<HTMLButtonElement>\` — VS Code schlägt dir den richtigen Typ vor wenn du mit der Maus über den Parameter hoverst. Aus dem Event-Objekt kannst du z.B. mit \`e.target\` auf das auslösende Element zugreifen oder mit \`e.preventDefault()\` das Standard-Browser-Verhalten unterbinden.

**Der \`&&\` Operator als vereinfachtes if:**
In JSX kannst du kein normales \`if\`-Statement schreiben — aber du kannst den \`&&\`-Operator nutzen: \`{clicked && <p>Button wurde geklickt!</p>}\`. Das bedeutet: "Zeige den Absatz nur wenn \`clicked\` true ist." Wenn \`clicked\` false ist, rendert React nichts. Das ist die kürzeste Form von bedingtem Rendern wenn du keinen else-Zweig brauchst.`,
        keyPoints: [
          'camelCase: onClick, onChange, onSubmit, onKeyDown',
          'Handler als Referenz übergeben: onClick={handleClick} — kein () dahinter',
          'Arrow-Function inline wenn nötig: onClick={() => setCount(c => c + 1)}',
          'e.preventDefault() unterbindet Standard-Browser-Verhalten (z.B. Seiten-Reload)',
        ],
        learningGoals: [
          'Event-Handler-Funktionen an JSX-Elemente binden',
          'Den MouseEvent-Typ in TypeScript korrekt verwenden',
          'Den && Operator als vereinfachtes if ohne else einsetzen',
        ],
        files: [
          {
            name: 'EventDemo.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import './EventDemo.css'

function EventDemo() {
  const [clicked, setClicked] = useState(false)

  // MouseEvent: wird beim Klick ausgelöst — es gibt viele weitere Events
  // z.B. React.ChangeEvent (für Inputs) oder React.FormEvent (für Formulare)
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setClicked(true)
  }

  return (
    <div className="demo">
      {/* Handler als Referenz — kein () dahinter */}
      <button className="btn" onClick={handleClick}>Klick mich</button>
      {/* && ist ein if ohne else — zeigt den Inhalt nur wenn clicked true ist */}
      {clicked && <p className="feedback">Button wurde geklickt!</p>}
    </div>
  )
}

export default EventDemo`,
          },
          {
            name: 'EventDemo.css',
            language: 'css',
            code: `.demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.btn {
  background: #7c3aed;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.btn:hover {
  background: #6d28d9;
}

.feedback {
  padding: 10px 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  color: #16a34a;
  font-size: 14px;
  margin: 0;
}`,
          },
        ],
      },
      {
        id: 10,
        title: 'State Lifting — Zustand nach oben heben',
        category: 'Grundlagen',
        explanation: `**State Lifting** bedeutet: wenn zwei Geschwisterkomponenten denselben State teilen müssen, zieht der State nach oben — in den gemeinsamen Elternteil (Parent). Der Parent hält den State und gibt ihn als Props nach unten weiter. So kann eine Komponente den State lesen und eine andere ihn verändern, ohne dass sie direkt miteinander kommunizieren müssen.

**State und Setter als Props weitergeben:**
Der Parent gibt den **Wert** als Prop an die lesende Komponente (z.B. \`<Anzeige text={text} />\`) und die **Setter-Funktion** als Prop an die schreibende Komponente (z.B. \`<Inputfeld onChange={setText} />\`). Das Kind ruft dann \`onChange(e.target.value)\` auf — und damit \`setText\` im Parent. Der State selbst lebt immer nur an einem Ort: beim Parent.

**Wann State Lifting sinnvoll ist:**
State Lifting lohnt sich immer dann wenn **mehrere Komponenten auf dieselben Daten angewiesen sind**. Als Faustregel gilt: State lebt immer so weit unten im Baum wie möglich — aber so weit oben wie nötig. Solange ein State nur von einer einzigen Komponente gebraucht wird, bleibt er in dieser Komponente.`,
        keyPoints: [
          'State immer im niedrigsten gemeinsamen Elternteil halten',
          'Setter als Prop nach unten geben → Kind kann State ändern',
          'Wert als Prop nach unten geben → Kind kann State lesen',
          'Kinder haben keinen eigenen State — alles läuft über den Elternteil',
        ],
        learningGoals: [
          'State in eine übergeordnete Komponente hochziehen',
          'State und Setter-Funktionen als Props weitergeben',
          'Erklären wann State Lifting sinnvoll ist',
        ],
        files: [
          {
            name: 'Inputfeld.tsx',
            language: 'tsx',
            code: `interface InputfeldProps {
  // onChange ist eine Funktion — der Elternteil gibt setText hier rein
  onChange: (value: string) => void
}

function Inputfeld({ onChange }: InputfeldProps) {
  return (
    <input
      className="input"
      placeholder="Tippe etwas..."
      // e.target.value = der aktuelle Text im Input
      // onChange(...) ruft setText im Elternteil auf → State ändert sich
      onChange={e => onChange(e.target.value)}
    />
  )
}

export default Inputfeld`,
          },
          {
            name: 'Anzeige.tsx',
            language: 'tsx',
            code: `interface AnzeigeProps {
  // text kommt als Prop von oben — kein eigener State nötig
  text: string
}

function Anzeige({ text }: AnzeigeProps) {
  return (
    <div className="anzeige">
      {/* text || '...' zeigt '...' solange nichts getippt wurde */}
      Du tippst: <strong>{text || '...'}</strong>
    </div>
  )
}

export default Anzeige`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import Inputfeld from './Inputfeld'
import Anzeige from './Anzeige'
import './App.css'

function App() {
  // State lebt hier oben — nur der Elternteil besitzt ihn
  const [text, setText] = useState('')

  return (
    <div className="app">
      <h1>State Lifting</h1>
      {/* setText nach unten geben → Inputfeld kann den State verändern */}
      <Inputfeld onChange={setText} />
      {/* text nach unten geben → Anzeige kann den State nur lesen */}
      <Anzeige text={text} />
    </div>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.app {
  max-width: 360px;
}

.app h1 {
  font-size: 20px;
  color: #2d1b4e;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e6ddf3;
  border-radius: 8px;
  font-size: 14px;
  color: #2d1b4e;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 12px;
}

.input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
}

.anzeige {
  padding: 12px 16px;
  border: 1px solid #e6ddf3;
  border-radius: 8px;
  background: #f7f3fc;
  font-size: 14px;
  color: #6b5b8c;
}

.anzeige strong {
  color: #7c3aed;
}`,
          },
        ],
      },
      {
        id: 11,
        title: 'Conditional Rendering',
        category: 'Grundlagen',
        explanation: `React rendert immer genau das was eine Komponente zurückgibt — und das kannst du mit normalen JavaScript-Bedingungen steuern. Du entscheidest also im Code welche Elemente überhaupt im DOM landen, je nach aktuellem State oder Props.

**Der ternäre Operator — if/else in JSX:**
Innerhalb von \`{}\` in JSX musst du kurze Ausdrücke schreiben — ein mehrzeiliger \`if/else\` Block passt dort nicht rein. Der **ternäre Operator** ist die kompakte Alternative: \`bedingung ? wahr : falsch\`. \`{isLoggedIn ? <Dashboard /> : <Login />}\` zeigt entweder das Dashboard oder die Login-Seite — je nach Zustand. Er ist die erste Wahl wenn du zwischen zwei verschiedenen Ausgaben wechseln möchtest.

**Der && Operator — bedingtes Rendern ohne else:**
Wenn du etwas nur anzeigen willst wenn eine Bedingung wahr ist — aber nichts anzeigen wenn sie falsch ist — ist \`&&\` die kürzere Variante: \`{isAdmin && <AdminPanel />}\`. Ist \`isAdmin\` falsch, rendert React einfach nichts. Wichtig: Verwende \`&&\` nur mit echten Boolean-Werten — bei Zahlen wie \`{count && <Liste />}\` würde React bei \`count = 0\` die Zahl \`0\` rendern statt nichts.`,
        keyPoints: [
          'Ternär: condition ? wahr : falsch — z.B. isLoggedIn ? <Dashboard /> : <Login />',
          'Kurzschluss: condition && <A /> (false = nichts)',
          'Early return: if (!data) return <Loading />',
          'null zurückgeben = Element verstecken',
        ],
        learningGoals: [
          'Komponenten und Elemente bedingt rendern',
          'Den ternären Operator für if/else in JSX einsetzen',
          'Den && Operator für einfaches bedingtes Rendern nutzen',
        ],
        files: [
          {
            name: 'UserStatus.tsx',
            language: 'tsx',
            code: `import './UserStatus.css'

interface UserStatusProps {
  isLoggedIn: boolean
  isAdmin: boolean
  name?: string
}

function UserStatus({ isLoggedIn, isAdmin, name }: UserStatusProps) {

  // Early return Pattern — wenn nicht eingeloggt, sofort zurück
  if (!isLoggedIn) {
    return <p className="status-hint">Bitte melde dich an.</p>
  }

  return (
    <div className="status-card">
      {/* Ternärer Operator */}
      <p className="status-welcome">Willkommen, {name ? name : 'Gast'}!</p>

      {/* &&-Kurzschluss: zeigt nur wenn isAdmin true */}
      {isAdmin && <button className="btn-admin">Admin-Panel öffnen</button>}

      {/* Verschachtelte Bedingung */}
      <p className={isAdmin ? 'role role--admin' : 'role role--user'}>
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
    <div className="app">
      <UserStatus isLoggedIn={false} isAdmin={false} />
      <UserStatus isLoggedIn={true} isAdmin={false} name="User" />
      <UserStatus isLoggedIn={true} isAdmin={true} name="Admin" />
    </div>
  )
}

export default App`,
          },
          {
            name: 'UserStatus.css',
            language: 'css',
            code: `.app {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
}

.status-hint {
  padding: 10px 14px;
  background: #fef9c3;
  border: 1px solid #fde68a;
  border-radius: 8px;
  color: #92400e;
  font-size: 14px;
  margin: 0;
}

.status-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid #e6ddf3;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(124, 58, 237, 0.07);
}

.status-welcome {
  font-size: 15px;
  font-weight: 600;
  color: #2d1b4e;
  margin: 0;
}

.btn-admin {
  background: #7c3aed;
  color: #fff;
  border: none;
  padding: 7px 16px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  align-self: flex-start;
}

.btn-admin:hover {
  background: #6d28d9;
}

.role {
  font-size: 13px;
  padding: 5px 12px;
  border-radius: 20px;
  margin: 0;
  align-self: flex-start;
}

.role--admin {
  background: #fee2e2;
  color: #b91c1c;
}

.role--user {
  background: #dcfce7;
  color: #15803d;
}`,
          },
        ],
      },
      {
        id: 12,
        title: 'Formulare — Eingaben verarbeiten',
        category: 'Grundlagen',
        explanation: `In React wird jedes Eingabefeld durch **State** gesteuert — man spricht von einem **controlled input**. Das bedeutet: der State hält immer den aktuellen Wert des Felds (\`value={name}\`), und bei jeder Eingabe des Nutzers wird der State sofort aktualisiert (\`onChange={e => setName(e.target.value)}\`). React und das Eingabefeld sind damit immer synchron — React weiß zu jedem Zeitpunkt was im Feld steht.

**Formulardaten mit onSubmit verarbeiten:**
Wenn der Nutzer das Formular absendet, feuert das \`onSubmit\`-Event. Der erste Schritt im Handler ist immer \`e.preventDefault()\` — ohne das würde der Browser die Seite neu laden und alle State-Werte gehen verloren. Danach kannst du die State-Variablen direkt verwenden, zum Beispiel um die Daten anzuzeigen oder an einen Server zu schicken.

**htmlFor und id — barrierefreie Labels:**
Ein \`<label>\` sollte immer mit seinem Eingabefeld verknüpft sein. Das erreichst du indem du dem \`<input>\` eine \`id\` gibst und dem \`<label>\` ein \`htmlFor\` mit demselben Wert. Der Vorteil: ein Klick auf den Label-Text fokussiert automatisch das zugehörige Eingabefeld — das verbessert die Bedienbarkeit, besonders auf mobilen Geräten.`,
        keyPoints: [
          'Controlled Input: value={state} + onChange → React kontrolliert den Wert',
          'e.preventDefault() verhindert den Standard-Reload beim Absenden',
          'Jedes Feld bekommt seinen eigenen useState',
          'type="email" aktiviert Browser-seitige Validierung der E-Mail-Adresse',
        ],
        learningGoals: [
          'Kontrollierte Inputs mit value und onChange bauen',
          'Formulardaten mit onSubmit verarbeiten',
          'htmlFor und id korrekt für barrierefreie Labels einsetzen',
        ],
        files: [
          {
            name: 'NewsletterForm.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import './NewsletterForm.css'

function NewsletterForm() {
  // Jedes Feld hat seinen eigenen State
  const [vorname, setVorname] = useState('')
  const [name, setName]       = useState('')
  const [mail, setMail]       = useState('')

  // submitted steuert ob das Formular oder die Bestätigung angezeigt wird
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()  // verhindert Seiten-Reload
    setSubmitted(true)
  }

  // Early return — nach dem Absenden wird die Bestätigung angezeigt
  if (submitted) {
    return (
      <div className="success">
        <span className="success-icon">✓</span>
        <p>Danke, <strong>{vorname} {name}</strong>!</p>
        <p className="success-sub">{mail} wurde angemeldet.</p>
      </div>
    )
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <h2>Newsletter</h2>
      <p className="form-subtitle">Jetzt kostenlos anmelden</p>

      <div className="form-group">
        {/* htmlFor verknüpft das Label mit dem Input — Klick auf Label fokussiert das Feld */}
        <label htmlFor="vorname">Vorname</label>
        {/* value + onChange = controlled input — React kennt immer den aktuellen Wert */}
        <input
          id="vorname"
          type="text"
          value={vorname}
          onChange={e => setVorname(e.target.value)}
          placeholder="Max"
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Mustermann"
        />
      </div>

      <div className="form-group">
        <label htmlFor="mail">E-Mail</label>
        {/* type="email" → Browser prüft das Format automatisch */}
        <input
          id="mail"
          type="email"
          value={mail}
          onChange={e => setMail(e.target.value)}
          placeholder="max@beispiel.de"
        />
      </div>

      <button type="submit" className="btn-submit">Anmelden</button>
    </form>
  )
}

export default NewsletterForm`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import NewsletterForm from './NewsletterForm'

function App() {
  return <NewsletterForm />
}

export default App`,
          },
          {
            name: 'NewsletterForm.css',
            language: 'css',
            code: `.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px 24px;
  border: 1px solid #e6ddf3;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.08);
  max-width: 320px;
}

.newsletter-form h2 {
  font-size: 20px;
  font-weight: 700;
  color: #2d1b4e;
  margin: 0;
}

.form-subtitle {
  font-size: 13px;
  color: #9d8bc0;
  margin: -8px 0 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #6b5b8c;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.form-group input {
  padding: 9px 12px;
  border: 1px solid #e6ddf3;
  border-radius: 7px;
  font-size: 14px;
  color: #2d1b4e;
  outline: none;
}

.form-group input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
}

.btn-submit {
  background: #7c3aed;
  color: #fff;
  border: none;
  padding: 11px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
}

.btn-submit:hover {
  background: #6d28d9;
}

.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 24px;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  background: #f0fdf4;
  max-width: 320px;
  text-align: center;
}

.success-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #16a34a;
  color: #fff;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success p {
  margin: 0;
  color: #15803d;
  font-size: 15px;
}

.success-sub {
  font-size: 12px !important;
  color: #9d8bc0 !important;
}`,
          },
        ],
      },
      {
        id: 13,
        title: 'Formulare — Formulardatenobjekt',
        category: 'Grundlagen',
        explanation: `Bei Formularen mit mehreren Feldern wird es schnell unübersichtlich wenn jedes Feld seinen eigenen \`useState\` bekommt. Die sauberere Lösung: alle Felder in einem einzigen **Objekt-State** zusammenfassen. Das Objekt hat für jedes Eingabefeld einen Schlüssel — zum Beispiel \`{ name: '', email: '', message: '' }\`. So bleiben alle zusammengehörigen Formulardaten an einem Ort.

**Mehrere Inputs über einen gemeinsamen onChange-Handler:**
Statt für jedes Feld eine eigene Handler-Funktion zu schreiben, reicht ein einziger \`handleChange\`. Er liest über \`e.target.name\` welches Feld sich geändert hat — dafür muss jedes \`<input>\` ein \`name\`-Attribut haben das mit dem Schlüssel im State-Objekt übereinstimmt. So weiß der Handler automatisch welches Feld aktualisiert werden soll.

**Die computed property Syntax \`[name]: value\`:**
Beim Aktualisieren des Objekt-States willst du nur das eine geänderte Feld überschreiben und alle anderen behalten. Der Spread-Operator \`...prev\` kopiert alle bestehenden Felder, und \`[name]: value\` überschreibt gezielt nur das geänderte. Die eckigen Klammern um \`name\` sind entscheidend: sie sagen JavaScript "benutze den *Inhalt* dieser Variable als Schlüssel" — ohne Klammern würde der String \`"name"\` als Schlüssel verwendet, nicht der Variablenwert.`,
        keyPoints: [
          'Ein Objekt-State für alle Felder statt vieler einzelner useState',
          'event.target.name liest den name-Attribut des Inputs — damit weiß handleChange welches Feld sich änderte',
          '[name]: value — berechneter Schlüssel: der Variableninhalt wird als Key benutzt',
          'Nach dem Submit: State zurücksetzen setzt alle Felder auf leer',
        ],
        learningGoals: [
          'Formulardaten in einem einzigen State-Objekt verwalten',
          'Die computed property Syntax [name]: value verstehen und anwenden',
          'Mehrere Inputs über einen gemeinsamen onChange-Handler steuern',
        ],
        files: [
          {
            name: 'KontaktFormular.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import './KontaktFormular.css'

// Typ für alle Formularfelder — ein Objekt statt mehrerer einzelner States
type FormularDaten = {
  name: string
  email: string
}

function KontaktFormular() {
  const [formularDaten, setFormularDaten] = useState<FormularDaten>({
    name: '',
    email: '',
  })

  // Ein einziger Handler für alle Felder
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // name = Attribut des Inputs (z.B. "name" oder "email")
    // value = was der User gerade getippt hat
    const { name, value } = event.target

    setFormularDaten({
      ...formularDaten,   // alle bisherigen Felder kopieren
      [name]: value,      // nur das geänderte Feld überschreiben
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()    // verhindert Seiten-Reload
    console.log(formularDaten)

    // Formular nach dem Absenden leeren
    setFormularDaten({ name: '', email: '' })
  }

  return (
    <form className="kontakt-form" onSubmit={handleSubmit}>
      <h2>Kontakt</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        {/* name="name" → event.target.name liefert "name" → [name]: value aktualisiert formularDaten.name */}
        <input
          id="name"
          name="name"
          type="text"
          value={formularDaten.name}
          onChange={handleChange}
          placeholder="Max Mustermann"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-Mail</label>
        {/* name="email" → event.target.name liefert "email" → [name]: value aktualisiert formularDaten.email */}
        <input
          id="email"
          name="email"
          type="email"
          value={formularDaten.email}
          onChange={handleChange}
          placeholder="max@beispiel.de"
        />
      </div>

      <button type="submit" className="btn-submit">Absenden</button>
    </form>
  )
}

export default KontaktFormular`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import KontaktFormular from './KontaktFormular'

function App() {
  return <KontaktFormular />
}

export default App`,
          },
          {
            name: 'KontaktFormular.css',
            language: 'css',
            code: `.kontakt-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px 24px;
  border: 1px solid #99f6e4;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(13, 148, 136, 0.08);
  max-width: 320px;
}

.kontakt-form h2 {
  font-size: 20px;
  font-weight: 700;
  color: #134e4a;
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.form-group input {
  padding: 9px 12px;
  border: 1px solid #99f6e4;
  border-radius: 7px;
  font-size: 14px;
  color: #134e4a;
  outline: none;
}

.form-group input:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
}

.btn-submit {
  background: #0d9488;
  color: #fff;
  border: none;
  padding: 11px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
}

.btn-submit:hover {
  background: #0f766e;
}`,
          },
        ],
      },
      {
        id: 14,
        title: 'Lists & .map() — Listen rendern',
        category: 'Grundlagen',
        explanation: `Um ein Array von Daten als UI darzustellen, verwendest du \`.map()\`. Die Methode geht jedes Element durch und gibt ein JSX-Element zurück — das Ergebnis ist ein Array aus JSX-Elementen das React direkt rendern kann. Das Muster sieht so aus: \`{products.map(p => <div>{p.name}</div>)}\`.

**Die key-Prop — warum sie Pflicht ist:**
Jedes Element in einer gerenderten Liste braucht ein \`key\`-Prop mit einem eindeutigen Wert — typischerweise eine ID aus den Daten: \`key={product.id}\`. React nutzt diese Keys intern um bei Änderungen zu erkennen welche Elemente neu gerendert, verschoben oder entfernt werden müssen. Ohne \`key\` muss React im Zweifel die gesamte Liste neu aufbauen statt nur das geänderte Element — das kostet Performance und kann zu sichtbaren Bugs führen. Den Array-Index als Key zu verwenden ist möglich, aber problematisch wenn sich die Reihenfolge der Liste ändern kann.

**Listen mit .filter() vorher filtern:**
Oft willst du nicht alle Elemente anzeigen sondern nur eine gefilterte Auswahl. \`.filter()\` gibt ein neues Array zurück das nur die Elemente enthält die die Bedingung erfüllen. Du kannst \`.filter()\` direkt vor \`.map()\` ketten: \`products.filter(p => p.inStock).map(p => ...)\` — erst filtern, dann rendern.`,
        keyPoints: [
          '.map() → wandelt jedes Array-Element in ein JSX-Element um',
          'key={item.id} — eindeutig, stabil, aus den Daten (nicht Index wenn vermeidbar)',
          'key ist Pflicht: ohne key kann React nicht erkennen welches Element sich geändert hat — es rendert die gesamte Liste neu statt nur das geänderte Element',
          'key niemals weglassen: React zeigt eine Warnung und die Performance leidet bei langen Listen spürbar',
        ],
        learningGoals: [
          'Arrays mit .map() in JSX-Elemente umwandeln',
          'Die key-Prop korrekt setzen und erklären warum sie wichtig ist',
          'Listen mit .filter() filtern bevor sie gerendert werden',
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
    <ul className="product-list">
      {/* .map() geht jedes Element im Array durch und gibt dafür JSX zurück */}
      {products.map(product => (
        // key={product.id} — React merkt sich damit welches Element welches ist
        // Ändert sich die Liste, aktualisiert React nur das betroffene Element statt alles neu zu rendern
        <li key={product.id} className={product.inStock ? 'product-item' : 'product-item out-of-stock'}>
          <span className="product-name">{product.name}</span>
          <span className="product-price">{product.price === 0 ? 'Gratis' : product.price + ' €'}</span>
          <span className={product.inStock ? 'badge badge-in' : 'badge badge-out'}>
            {product.inStock ? 'Verfügbar' : 'Ausverkauft'}
          </span>
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
            code: `.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 340px;
}

.product-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid #e6ddf3;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(124, 58, 237, 0.06);
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #2d1b4e;
}

.product-price {
  font-size: 13px;
  font-weight: 700;
  color: #7c3aed;
}

.badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 600;
}

.badge-in {
  background: #dcfce7;
  color: #15803d;
}

.badge-out {
  background: #fee2e2;
  color: #b91c1c;
}

.out-of-stock {
  opacity: 0.5;
}`,
          },
        ],
      },
      {
        id: 15,
        title: 'Listen — Todo-App',
        category: 'Grundlagen',
        explanation: `Die Todo-App ist ein klassisches Übungsprojekt weil sie drei grundlegende State-Operationen auf einmal vereint: Einträge **hinzufügen**, **abhaken** und **löschen**. Das Herzstück ist ein Array von Todo-Objekten im State — jede Aktion erzeugt daraus ein neues Array, ohne das alte direkt zu verändern.

**\`Date.now()\` als eindeutige ID:**
Jedes Todo braucht eine eindeutige \`id\` als stabilen \`key\` für React. \`Date.now()\` gibt die aktuelle Zeit in Millisekunden zurück — das ist eine einfache und zuverlässige Lösung für kleine Apps, weil zwei Todos praktisch nie zur exakt gleichen Millisekunde angelegt werden. Für größere Projekte würde man \`crypto.randomUUID()\` verwenden, aber \`Date.now()\` reicht hier vollkommen aus.

**\`.filter()\` zum Löschen, \`.map()\` + Spread zum Updaten:**
Löschen funktioniert mit \`.filter()\`: du erzeugst ein neues Array das alle Todos außer dem zu löschenden enthält — \`todos.filter(t => t.id !== id)\`. Abhaken funktioniert mit \`.map()\`: du gehst alle Todos durch und kippst bei dem einen das \`done\`-Feld mit dem Spread-Operator um — \`todos.map(t => t.id === id ? { ...t, done: !t.done } : t)\`. Der Spread kopiert alle anderen Felder unverändert und nur \`done\` wird überschrieben.`,
        keyPoints: [
          'Date.now() als einfache eindeutige ID — besser als Array-Index',
          'filter() löscht: neues Array ohne das Element mit der passenden ID',
          'map() + Spread: nur ein Feld ändern, den Rest kopieren — { ...todo, done: !todo.done }',
          'trim() verhindert dass leere Eingaben als Todo gespeichert werden',
        ],
        learningGoals: [
          'Eine vollständige Todo-App mit hinzufügen, abhaken und löschen bauen',
          '.filter() zum Löschen und .map() + Spread zum Updaten von Listen einsetzen',
          'Date.now() als einfache eindeutige ID verwenden',
        ],
        files: [
          {
            name: 'TodoApp.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import './TodoApp.css'

// type beschreibt die Struktur eines Objekts — TypeScript prüft ob alle Felder korrekt befüllt werden
type Todo = {
  id: number
  text: string
  done: boolean
}

function TodoApp() {
  // Todo[] bedeutet: ein Array aus Todo-Objekten — TypeScript weiß damit genau welche Felder erlaubt sind
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'React lernen', done: false },
    { id: 2, text: 'Listen anzeigen', done: true },
  ])

  const [todoText, setTodoText] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (todoText.trim() === '') return  // leere Eingaben verhindern

    const neuesTodo: Todo = {
      id: Date.now(),  // einfache eindeutige ID
      text: todoText,
      done: false,
    }

    setTodos([...todos, neuesTodo])
    setTodoText('')
  }

  function deleteTodo(id: number) {
    // filter: alle Todos behalten außer das mit der passenden ID
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function toggleTodo(id: number) {
    // map: nur das Todo mit passender ID ändern — done umdrehen
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  return (
    <div className="todo-app">
      <h1>Meine Todo-Liste</h1>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          className="todo-input"
          type="text"
          placeholder="Neues Todo eingeben..."
          value={todoText}
          onChange={e => setTodoText(e.target.value)}
        />
        <button type="submit" className="btn-add">+</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'todo-item done' : 'todo-item'}>
            {/* checked={todo.done} — Checkbox spiegelt den State wider */}
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <span className={todo.done ? 'todo-status status-done' : 'todo-status status-open'}>
              {todo.done ? 'erledigt' : 'offen'}
            </span>
            <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoApp`,
          },
          {
            name: 'TodoApp.css',
            language: 'css',
            code: `.todo-app {
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.todo-app h1 {
  font-size: 20px;
  font-weight: 700;
  color: #2d1b4e;
  margin: 0;
}

.todo-form {
  display: flex;
  gap: 8px;
}

.todo-input {
  flex: 1;
  padding: 9px 12px;
  border: 1px solid #e6ddf3;
  border-radius: 8px;
  font-size: 14px;
  color: #2d1b4e;
  outline: none;
}

.todo-input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
}

.btn-add {
  background: #7c3aed;
  color: #fff;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-add:hover {
  background: #6d28d9;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid #e6ddf3;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(124, 58, 237, 0.05);
}

.todo-item.done {
  background: #f7f3fc;
  opacity: 0.7;
}

.todo-text {
  flex: 1;
  font-size: 14px;
  color: #2d1b4e;
}

.todo-item.done .todo-text {
  text-decoration: line-through;
  color: #9d8bc0;
}

.todo-status {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
}

.status-open {
  background: #fef9c3;
  color: #854d0e;
}

.status-done {
  background: #dcfce7;
  color: #15803d;
}

.btn-delete {
  background: transparent;
  color: #c9bce0;
  border: 1px solid #e6ddf3;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.btn-delete:hover {
  background: #fee2e2;
  color: #b91c1c;
  border-color: #fca5a5;
}`,
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
        id: 16,
        title: 'useEffect — Seiteneffekte',
        category: 'Hooks',
        explanation: `**useEffect** ist ein Hook für **Seiteneffekte** — also alles was über das reine Rendern von JSX hinausgeht: Timer starten, API-Aufrufe machen, Event-Listener registrieren. React führt den Code in \`useEffect\` aus nachdem die Komponente gerendert wurde, nicht währenddessen. So bleibt das Rendern schnell und die Nebeneffekte laufen separat.

**Das Dependency Array korrekt befüllen:**
Das zweite Argument von \`useEffect\` ist das **Dependency Array** — es steuert wann der Effekt erneut läuft. Ein leeres Array \`[]\` bedeutet: nur einmal ausführen wenn die Komponente zum ersten Mal erscheint. \`[wert]\` bedeutet: jedes Mal neu ausführen wenn sich \`wert\` ändert. Kein Array bedeutet: nach jedem Render ausführen — das führt fast immer zu einer Endlosschleife und sollte vermieden werden. Als Faustregel gilt: alle Variablen die du im Effekt verwendest, gehören ins Array.

**Die Cleanup-Funktion — Seiteneffekte sauber beenden:**
Manche Effekte müssen aufgeräumt werden wenn die Komponente verschwindet — ein laufender Timer zum Beispiel würde sonst im Hintergrund weiterlaufen. Dafür gibt \`useEffect\` eine Funktion zurück: \`return () => clearInterval(id)\`. React ruft diese Cleanup-Funktion automatisch auf bevor die Komponente aus dem DOM entfernt wird oder bevor der Effekt erneut läuft.`,
        keyPoints: [
          '[] = nur einmal beim Mounten (componentDidMount)',
          '[value] = bei jedem value-Wechsel',
          'Ohne Array = nach jedem Render (Vorsicht: Endlosschleife möglich)',
          'Cleanup-Funktion: return () => {} — wird beim Unmount ausgeführt',
        ],
        learningGoals: [
          'useEffect für Seiteneffekte wie Timer und Intervals einsetzen',
          'Das Dependency Array korrekt befüllen',
          'Eine Cleanup-Funktion zurückgeben um Seiteneffekte zu beenden',
        ],
        files: [
          {
            name: 'Stopwatch.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from 'react'
import './Stoppuhr.css'

function Stopwatch() {
  const [running, setRunning] = useState(false)
  const [centiseconds, setCentiseconds] = useState(0)
  // Union Type: nur diese drei Texte sind als Wert erlaubt
  const [buttontext, setButtonText] = useState<'Start' | 'Stop' | 'Weiter'>('Start')

  // Effekt startet das Interval — läuft neu wenn running sich ändert
  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      setCentiseconds(c => c + 1)  // Funktionsform: immer aktueller State-Wert
    }, 10)

    // Cleanup: Interval wird gestoppt wenn running false wird oder Unmount
    return () => clearInterval(interval)
  }, [running])

  function handleStop() {
    if (!running) return
    setRunning(false)
    setButtonText('Weiter')
  }

  const sekunden = Math.floor(centiseconds / 100)
  const hundertstel = centiseconds % 100
  // padStart(2, '0') stellt sicher dass z.B. 5 als "05" angezeigt wird
  const zeitAnzeige = \`\${sekunden}.\${String(hundertstel).padStart(2, '0')}\`

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-circle">
        <span className="stopwatch-time">{zeitAnzeige}</span>
        <span className="stopwatch-label">Sekunden</span>
      </div>
      <div className="stopwatch-buttons">
        <button className="btn btn-start" onClick={() => setRunning(true)}>
          {buttontext}
        </button>
        <button className="btn btn-stop" onClick={handleStop}>Stop</button>
        <button
          className="btn btn-reset"
          onClick={() => { setRunning(false); setCentiseconds(0); setButtonText('Start') }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Stopwatch`,
          },
          {
            name: 'Stoppuhr.css',
            language: 'css',
            code: `.stopwatch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

/* border-radius: 50% + gleiche width/height = perfekter Kreis */
.stopwatch-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #7c3aed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #faf7ff;
  box-shadow: 0 0 0 8px #ede9fe, 0 6px 24px rgba(124, 58, 237, 0.18);
}

.stopwatch-time {
  font-size: 44px;
  font-weight: 700;
  color: #2d1b4e;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  letter-spacing: -1px;
}

.stopwatch-label {
  font-size: 11px;
  color: #9d8bc0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 6px;
}

.stopwatch-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 22px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.btn:active {
  transform: scale(0.96);
}

.btn-start {
  background: #16a34a;
  color: #fff;
}

.btn-start:hover {
  background: #15803d;
}

.btn-stop {
  background: #dc2626;
  color: #fff;
}

.btn-stop:hover {
  background: #b91c1c;
}

.btn-reset {
  background: #e6ddf3;
  color: #6b5b8c;
}

.btn-reset:hover {
  background: #d4c8ed;
}`,
          },
        ],
      },
      {
        id: 17,
        title: 'useEffect — API-Fetch mit PokéAPI',
        category: 'Hooks',
        explanation: `API-Aufrufe gehören immer in \`useEffect\` — nie direkt in den Funktionsrumpf einer Komponente. Der Grund: ohne \`useEffect\` würde der Fetch bei jedem Render neu ausgelöst werden, was zu einer Endlosschleife führt. Mit \`useEffect\` und leerem Dependency Array \`[]\` wird der Aufruf genau einmal ausgeführt, wenn die Komponente das erste Mal erscheint.

**\`.then()\` Chains für asynchrone Daten:**
\`fetch()\` gibt ein **Promise** zurück — eine Art Versprechen dass irgendwann ein Ergebnis kommt. Mit \`.then()\` legst du fest was passieren soll sobald das Ergebnis eintrifft. Die Schritte werden hintereinander gekettet: \`.then(res => res.json())\` wandelt die HTTP-Antwort in ein JavaScript-Objekt um, \`.then(data => setPokemon(data))\` speichert es im State. Jedes \`.then()\` bekommt das Ergebnis des vorherigen Schritts übergeben.

**Loading-State — Feedback während des Wartens:**
Ein API-Aufruf dauert eine gewisse Zeit — in dieser Lücke sollte die Komponente nicht leer sein. Dafür setzt du einen \`loading\`-State: vor dem Fetch auf \`true\`, nach dem Fetch auf \`false\`. Solange \`loading\` wahr ist, zeigst du einen Platzhalter wie "Lade Daten..." — danach die eigentlichen Daten. Das gibt dem Nutzer sofortiges Feedback dass etwas passiert.`,
        keyPoints: [
          '[] als Dependency → Fetch wird nur einmal beim Mounten ausgeführt',
          '.then(antwort => antwort.json()) wandelt die HTTP-Antwort in ein JS-Objekt um',
          'type Pokemon beschreibt genau welche Felder die API zurückgibt — TypeScript prüft das',
          'loading-State: true solange Daten noch unterwegs sind, false wenn sie angekommen sind',
        ],
        learningGoals: [
          'Einen API-Fetch in useEffect korrekt platzieren',
          '.then() Chains für asynchrone Daten verwenden',
          'Einen Loading-State anzeigen während Daten geladen werden',
        ],
        files: [
          {
            name: 'PokemonFetch.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from 'react'
import './Pokefetcher.css'

// type beschreibt die Struktur der API-Antwort — nur die Felder die wir brauchen
type Pokemon = {
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string  // URL zum Bild des Pokémon
  }
}

function PokemonFetch() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then(antwort => antwort.json())  // HTTP-Antwort → JavaScript-Objekt
      .then(daten => setPokemon(daten)) // Daten in State speichern
  }, [])  // [] = nur einmal beim Mounten ausführen

  if (!pokemon) return <p className="pokemon-loading">Lädt...</p>

  return (
    <div className="pokemon-card">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-sprite"
      />
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <div className="pokemon-stats">
        <span className="stat-badge">Größe: {pokemon.height}</span>
        <span className="stat-badge">Gewicht: {pokemon.weight}</span>
      </div>
    </div>
  )
}

export default PokemonFetch`,
          },
          {
            name: 'Pokefetcher.css',
            language: 'css',
            code: `.pokemon-loading {
  color: #9d8bc0;
  font-size: 14px;
}

.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 28px 36px;
  border: 2px solid #fbbf24;
  border-radius: 20px;
  background: linear-gradient(160deg, #fffbeb 0%, #fef9c3 100%);
  box-shadow: 0 4px 24px rgba(251, 191, 36, 0.28);
  max-width: 220px;
}

/* pixelated verhindert dass das Sprite unscharf skaliert wird */
.pokemon-sprite {
  width: 130px;
  height: 130px;
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
}

.pokemon-name {
  font-size: 22px;
  font-weight: 700;
  color: #92400e;
  text-transform: capitalize;
  margin: 0;
  letter-spacing: 0.02em;
}

.pokemon-stats {
  display: flex;
  gap: 10px;
}

.stat-badge {
  font-size: 12px;
  font-weight: 600;
  color: #78350f;
  background: #fde68a;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #fcd34d;
}`,
          },
        ],
      },
      {
        id: 18,
        title: 'useRef — DOM-Zugriff ohne Re-render',
        category: 'Hooks',
        explanation: `**useRef** erstellt eine Art Box mit einer \`.current\`-Eigenschaft — der Wert darin bleibt über alle Renders erhalten und kann jederzeit gelesen oder geändert werden. Der entscheidende Unterschied zu \`useState\`: eine Änderung von \`ref.current\` löst **kein Re-render** aus. React bemerkt die Änderung gar nicht.

**useRef vs. useState — wann was?**
\`useState\` ist die richtige Wahl wenn eine Wertänderung die UI aktualisieren soll — React rendert neu und der Nutzer sieht das Ergebnis. \`useRef\` ist die richtige Wahl wenn du einen Wert speichern willst ohne dass React davon weiß: zum Beispiel eine Timer-ID die du später zum Stoppen brauchst, oder eine direkte Referenz auf ein DOM-Element.

**Ein Input-Element programmatisch fokussieren:**
Der häufigste Anwendungsfall für \`useRef\` ist der direkte Zugriff auf ein DOM-Element. Du hängst das Ref mit \`ref={inputRef}\` an ein JSX-Element — nach dem ersten Render enthält \`inputRef.current\` dann das echte DOM-Element. Darüber kannst du Methoden wie \`.focus()\` aufrufen die in React normalerweise nicht direkt verfügbar sind. Das ist nützlich wenn ein Eingabefeld beim Laden der Seite oder nach einer Aktion automatisch fokussiert werden soll.`,
        keyPoints: [
          'ref.current = direkte DOM-Referenz nach dem Mount',
          'Wertänderung löst KEIN Re-render aus (Unterschied zu useState)',
          'ref={myRef} an JSX-Element hängen um DOM-Node zu erhalten',
        ],
        learningGoals: [
          'useRef für direkten DOM-Zugriff einsetzen',
          'Den Unterschied zwischen useRef und useState erklären',
          'Ein Input-Element programmatisch fokussieren',
        ],
        files: [
          {
            name: 'FocusInput.tsx',
            language: 'tsx',
            code: `import { useRef } from 'react'
import './FocusInput.css'

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
    <div className="focus-container">
      <h2 className="focus-title">useRef — Fokus steuern</h2>
      {/* ref verbindet die Variable mit dem DOM-Element */}
      <input
        ref={inputRef}
        className="focus-input"
        placeholder="Klick einen Button..."
      />
      <div className="focus-buttons">
        <button className="btn btn-focus" onClick={handleFocus}>Fokus setzen</button>
        <button className="btn btn-clear" onClick={handleClear}>Leeren</button>
      </div>
    </div>
  )
}

export default FocusInput`,
          },
          {
            name: 'FocusInput.css',
            language: 'css',
            code: `.focus-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 320px;
}

.focus-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d1b4e;
  margin: 0;
}

.focus-input {
  padding: 10px 14px;
  border: 2px solid #e6ddf3;
  border-radius: 8px;
  font-size: 14px;
  color: #2d1b4e;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.focus-input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}

.focus-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 9px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.btn:active {
  transform: scale(0.96);
}

.btn-focus {
  background: #7c3aed;
  color: #fff;
}

.btn-focus:hover {
  background: #6d28d9;
}

.btn-clear {
  background: #e6ddf3;
  color: #6b5b8c;
}

.btn-clear:hover {
  background: #d4c8ed;
}`,
          },
        ],
      },
      {
        id: 19,
        title: 'useContext — zentraler Datenspeicher',
        category: 'Hooks',
        explanation: `**Context** löst das Problem des **Prop Drilling**: Wenn Daten durch viele Komponenten-Ebenen weitergereicht werden müssen — auch durch Ebenen die die Daten gar nicht brauchen — wird der Code schnell unübersichtlich. Mit Context stellst du Daten zentral bereit, und jede Komponente holt sich direkt was sie braucht, egal wie tief sie im Baum sitzt.

**Einen Context anlegen mit createContext und useContext:**
\`createContext()\` erstellt den zentralen Datenspeicher — du gibst dabei Standardwerte an, die als Typen-Vorlage dienen. Eine \`Provider\`-Komponente hält den State und stellt ihn per \`value={}\`-Prop bereit. Jede Komponente innerhalb des Providers kann dann mit \`useContext(DeinContext)\` direkt auf diese Daten zugreifen.

**DataProvider in main.tsx:**
Der \`DataProvider\` wird in \`main.tsx\` um \`<App />\` gelegt. Dadurch steht der Context ab dem ersten Render dem gesamten Komponentenbaum zur Verfügung. Die \`App\`-Komponente selbst ist nicht der richtige Ort für den Provider — sie ist Teil des Komponentenbaums und sollte Daten empfangen, nicht bereitstellen. Die Datenzuständigkeit liegt eine Ebene höher: in \`main.tsx\`, wo die Anwendung initialisiert wird.

**Prop Drilling vermeiden:**
Ohne Context müsstest du z.B. einen eingeloggten User als Prop durch App → Navbar → UserMenu → UserAvatar durchreichen — auch wenn nur UserAvatar ihn wirklich braucht. Mit Context importiert UserAvatar einfach den Context und holt sich den User direkt. Das ist besonders nützlich für Dinge die viele Komponenten brauchen: eingeloggter User, Theme (hell/dunkel), Sprache.`,
        keyPoints: [
          'createContext() erstellt den zentralen Datenspeicher',
          'DataProvider in main.tsx: versorgt den gesamten Komponentenbaum von Anfang an',
          'useContext(DataContext) gibt jeder Komponente direkten Zugriff — ohne Props',
          'Jede Komponente nimmt sich nur was sie braucht — Inputfeld nur setInputText, Button nur inputText',
        ],
        learningGoals: [
          'Einen Context mit createContext und useContext anlegen',
          'Einen Provider bauen der State zentral bereitstellt',
          'Den DataProvider korrekt in main.tsx platzieren',
          'Prop Drilling durch Context vermeiden',
        ],
        files: [
          {
            name: 'DataContext.tsx',
            language: 'tsx',
            code: `import { createContext, useState } from 'react'

// Statische Personendaten — kommen normalerweise von einer API
const person = {
  vorname: 'Max',
  nachname: 'Mustermann',
  alter: 32,
  telefon: '0123456789',
  mail: 'max@mustermann.de',
}

// createContext() legt den Store an — Defaultwerte für Struktur und Typsicherheit
export const DataContext = createContext({
  vorname: person.vorname,
  mail: person.mail,
  inputText: '',
  setInputText: (text: string) => {},
})

// DataProvider verwaltet den State und stellt alles per value={} bereit
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [inputText, setInputText] = useState('')

  return (
    <DataContext.Provider value={{
      vorname: person.vorname,
      mail: person.mail,
      inputText,
      setInputText,
    }}>
      {children}
    </DataContext.Provider>
  )
}`,
          },
          {
            name: 'Inputfeld.tsx',
            language: 'tsx',
            code: `import { useContext } from 'react'
import { DataContext } from './DataContext'

function Inputfeld() {
  // Nur setInputText wird gebraucht — der Rest interessiert hier nicht
  const { setInputText } = useContext(DataContext)

  return (
    <input
      className="context-input"
      type="text"
      placeholder="Schreib was..."
      onChange={e => setInputText(e.target.value)}
    />
  )
}

export default Inputfeld`,
          },
          {
            name: 'Button.tsx',
            language: 'tsx',
            code: `import { useContext } from 'react'
import { DataContext } from './DataContext'

function Button() {
  // Nur inputText wird gebraucht — kein prop von außen nötig
  const { inputText } = useContext(DataContext)

  return (
    <button className="context-btn">
      {inputText || 'Noch nichts getippt'}
    </button>
  )
}

export default Button`,
          },
          {
            name: 'PersonAnzeige.tsx',
            language: 'tsx',
            code: `import { useContext } from 'react'
import { DataContext } from './DataContext'

function PersonAnzeige() {
  // Nur vorname und mail werden gebraucht
  const { vorname, mail } = useContext(DataContext)

  return (
    <div className="person-card">
      <p className="person-row"><span>Vorname</span><strong>{vorname}</strong></p>
      <p className="person-row"><span>Mail</span><strong>{mail}</strong></p>
    </div>
  )
}

export default PersonAnzeige`,
          },
          {
            name: 'main.tsx',
            language: 'tsx',
            code: `import ReactDOM from "react-dom/client"
import { DataProvider } from "./DataContext"
import App from "./App"

// DataProvider umhüllt App — der gesamte Komponentenbaum
// hat damit vom ersten Render an Zugriff auf den Context
ReactDOM.createRoot(document.getElementById("root")!).render(
  <DataProvider>
    <App />
  </DataProvider>
)`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { DataProvider } from './DataContext'
import Inputfeld from './Inputfeld'
import Button from './Button'
import PersonAnzeige from './PersonAnzeige'
import './App.css'

// Hinweis: Im echten Projekt sitzt DataProvider in main.tsx (siehe Tab).
// Hier steht er in App.tsx damit die Live-Vorschau funktioniert.
function App() {
  return (
    <DataProvider>
      <div className="app">
        <h1>Context Demo</h1>
        <Inputfeld />
        <Button />
        <PersonAnzeige />
      </div>
    </DataProvider>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.app {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 320px;
}

.app h1 {
  font-size: 20px;
  color: #2d1b4e;
  margin: 0 0 4px;
}

.context-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e6ddf3;
  border-radius: 8px;
  font-size: 14px;
  color: #2d1b4e;
  outline: none;
  box-sizing: border-box;
}

.context-input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
}

.context-btn {
  background: #7c3aed;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: default;
  text-align: left;
}

.person-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid #e6ddf3;
  border-radius: 10px;
  background: #f7f3fc;
}

.person-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6b5b8c;
  margin: 0;
}

.person-row strong {
  color: #2d1b4e;
}`,
          },
        ],
      },
      {
        id: 20,
        title: 'useContext — gestapelte Kontexte',
        category: 'Hooks',
        explanation: `Eine App kann **mehrere unabhängige Kontexte** haben — zum Beispiel einen für den eingeloggten User, einen anderen für das aktuelle Theme. Jeder Kontext ist komplett unabhängig: Änderungen im einen berühren den anderen nicht. Du kannst Kontext und Provider direkt in der Datei der jeweiligen Komponente definieren und exportieren — es muss nicht alles in einer zentralen Datei sein.

**Provider stacken:**
In \`App.tsx\` schachtelst du die Provider einfach ineinander: \`<NameProvider><AlterProvider>...</AlterProvider></NameProvider>\`. React sucht beim Aufruf von \`useContext(AlterContext)\` immer den **nächsten passenden Provider** im Baum nach oben — jeder Context findet seinen eigenen Provider, unabhängig von den anderen.

**Den \`||\` Fallback-Wert erklären:**
In der Anzeige-Komponente siehst du oft Muster wie \`{name || '...'}\`. Das ist der **Oder-Operator als Fallback**: Wenn \`name\` ein leerer String oder \`0\` ist (beides gilt als "falsy" in JavaScript), wird stattdessen der Fallback-Wert \`'...'\` angezeigt. Sobald der User etwas eingibt, ist der String nicht mehr leer — und der echte Wert erscheint.`,
        keyPoints: [
          'Kontext und Provider können direkt in der Komponenten-Datei definiert werden',
          'Provider stapeln: <NameProvider><StadtProvider>...</StadtProvider></NameProvider>',
          'useContext() mehrfach aufrufen um auf verschiedene Kontexte zuzugreifen',
          'Jeder Kontext ist unabhängig — Änderungen in einem berühren den anderen nicht',
        ],
        learningGoals: [
          'Mehrere unabhängige Kontexte in einer App verwenden',
          'Provider stacken und verstehen wie React den nächsten Provider findet',
          'Den Fallback-Wert von || in Context-Komponenten erklären',
        ],
        files: [
          {
            name: 'NameInput.tsx',
            language: 'tsx',
            code: `import { createContext, useState, useContext } from 'react'

// Kontext und Provider leben direkt in dieser Datei — beides wird exportiert
export const NameContext = createContext({
  name: '',
  // TypeScript verlangt einen Parameternamen in Funktionssignaturen — _ ist Konvention für "nicht benutzt"
  // könnte auch setName: (irgendwas: string) => {} heißen — der Name spielt keine Rolle
  setName: (_: string) => {},
})

export function NameProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState('')

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  )
}

function NameInput() {
  // Nur setName wird gebraucht — name bleibt hier unbenutzt
  const { setName } = useContext(NameContext)

  return (
    <input
      className="ctx-input"
      placeholder="Name eingeben..."
      onChange={e => setName(e.target.value)}
    />
  )
}

export default NameInput`,
          },
          {
            name: 'AlterInput.tsx',
            language: 'tsx',
            code: `import { createContext, useState, useContext } from 'react'

// Eigener Kontext für das Alter — number statt string
export const AlterContext = createContext({
  alter: 0,
  // TypeScript verlangt einen Parameternamen in Funktionssignaturen — _ ist Konvention für "nicht benutzt"
  // könnte auch setAlter: (irgendwas: number) => {} heißen — der Name spielt keine Rolle
  setAlter: (_: number) => {},
})

export function AlterProvider({ children }: { children: React.ReactNode }) {
  const [alter, setAlter] = useState(0)

  return (
    <AlterContext.Provider value={{ alter, setAlter }}>
      {children}
    </AlterContext.Provider>
  )
}

function AlterInput() {
  // Nur setAlter wird gebraucht
  const { setAlter } = useContext(AlterContext)

  return (
    <input
      className="ctx-input"
      type="number"
      placeholder="Alter eingeben..."
      onChange={e => setAlter(Number(e.target.value))}
    />
  )
}

export default AlterInput`,
          },
          {
            name: 'Anzeige.tsx',
            language: 'tsx',
            code: `import { useContext } from 'react'
import { NameContext } from './NameInput'
import { AlterContext } from './AlterInput'

function Anzeige() {
  // useContext zweimal — einmal pro Kontext
  const { name } = useContext(NameContext)
  const { alter } = useContext(AlterContext)

  return (
    <div className="anzeige-card">
      <p className="anzeige-row">
        <span>Name</span>
        {/* || = Oder: zeige name, ist name leer → zeige '...' als Fallback */}
        {/* Alternative: {name ? name : '...'} — macht dasselbe, nur ausführlicher */}
        <strong>{name || '...'}</strong>
      </p>
      <p className="anzeige-row">
        <span>Alter</span>
        {/* gleiche Logik: 0 gilt als falsy → solange nichts eingegeben wurde erscheint '...' */}
        <strong>{alter || '...'}</strong>
      </p>
    </div>
  )
}

export default Anzeige`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { NameProvider } from './NameInput'
import { AlterProvider } from './AlterInput'
import NameInput from './NameInput'
import AlterInput from './AlterInput'
import Anzeige from './Anzeige'
import './App.css'

function App() {
  return (
    // Provider stapeln — jeder liefert seinen eigenen Kontext
    <NameProvider>
      <AlterProvider>
        <div className="app">
          <h1>Gestapelte Kontexte</h1>
          <NameInput />
          <AlterInput />
          {/* Anzeige hat Zugriff auf beide Kontexte */}
          <Anzeige />
        </div>
      </AlterProvider>
    </NameProvider>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.app {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 320px;
}

.app h1 {
  font-size: 20px;
  color: #2d1b4e;
  margin: 0 0 4px;
}

.ctx-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e6ddf3;
  border-radius: 8px;
  font-size: 14px;
  color: #2d1b4e;
  outline: none;
  box-sizing: border-box;
}

.ctx-input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
}

.anzeige-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border: 1px solid #e6ddf3;
  border-radius: 10px;
  background: #f7f3fc;
}

.anzeige-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  font-size: 13px;
  color: #6b5b8c;
}

.anzeige-row strong {
  color: #7c3aed;
  font-size: 14px;
}`,
          },
        ],
      },
      {
        id: 21,
        title: 'useMemo — berechnete Werte cachen',
        category: 'Hooks',
        explanation: `**useMemo** speichert das Ergebnis einer Berechnung im Cache — React führt die Berechnung nur dann neu aus, wenn sich eine der Abhängigkeiten im Dependency Array ändert. Bei allen anderen Re-renders gibt React einfach den gecachten Wert zurück.

**Wann ist das nützlich?**
Stell dir vor du hast eine aufwändige Berechnung die von einem bestimmten Wert abhängt — zum Beispiel \`zahl * 2\`. Ohne \`useMemo\` würde React diese Berechnung bei *jedem* Re-render neu ausführen, auch wenn sich ein völlig unabhängiger State wie \`dunkel\` ändert. Mit \`useMemo(() => zahl * 2, [zahl])\` passiert die Berechnung nur wenn sich \`zahl\` tatsächlich ändert — das Umschalten des Themes löst sie nicht aus.

**Wann useMemo nicht nötig ist:**
Für einfache Berechnungen wie \`zahl * 2\` macht \`useMemo\` keinen spürbaren Unterschied — die Hook selbst hat auch einen kleinen Overhead. Er lohnt sich erst bei wirklich teuren Operationen, zum Beispiel beim Filtern oder Sortieren sehr großer Arrays. Als Einsteiger: erst einsetzen wenn ein echtes Performance-Problem sichtbar wird.`,
        keyPoints: [
          'useMemo(() => berechnung, [abhaengigkeit]) → cached den Rückgabewert',
          'Berechnung läuft nur wenn sich eine Abhängigkeit ändert',
          'Dependency Array wie bei useEffect — alles was genutzt wird, muss rein',
          'Nicht blind einsetzen — erst bei messbarem Performance-Problem',
        ],
        learningGoals: [
          'useMemo für gecachte Berechnungen einsetzen',
          'Das Dependency Array von useMemo korrekt befüllen',
          'Erklären wann useMemo sinnvoll ist und wann nicht',
        ],
        files: [
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, useMemo } from "react"
import "./App.css"

function App() {
  const [zahl, setZahl] = useState(1)
  const [dunkel, setDunkel] = useState(false)

  // wird nur neu berechnet wenn zahl sich ändert
  // Theme-Wechsel (dunkel) löst KEINE Neuberechnung aus
  const ergebnis = useMemo(() => zahl * 2, [zahl])

  return (
    <div className={dunkel ? "app dark" : "app"}>
      <h2>useMemo</h2>
      <input
        type="number"
        value={zahl}
        onChange={e => setZahl(Number(e.target.value))}
        onFocus={e => e.target.select()}
      />
      <p className="result">{zahl} × 2 = <strong>{ergebnis}</strong></p>
      <button onClick={() => setDunkel(!dunkel)}>
        Theme: {dunkel ? "Dunkel" : "Hell"}
      </button>
    </div>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.app {
  max-width: 320px;
  margin: 48px auto;
  padding: 32px;
  border-radius: 16px;
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  font-family: sans-serif;
  text-align: center;
  transition: background 0.3s, color 0.3s;
}

.app.dark {
  background: #1e1b2e;
  border-color: #4c1d95;
  color: #e9d5ff;
}

.app h2 {
  font-size: 14px;
  color: #6d28d9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
}

.app.dark h2 { color: #a78bfa; }

.app input {
  width: 100%;
  padding: 10px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #ddd6fe;
  border-radius: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  background: #fff;
}

.app.dark input {
  background: #2d1b4e;
  border-color: #6d28d9;
  color: #e9d5ff;
}

.result {
  font-size: 18px;
  margin-bottom: 20px;
  color: #4c1d95;
}

.app.dark .result { color: #c4b5fd; }

.app button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: #7c3aed;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.app button:hover { background: #6d28d9; }`,
          },
        ],
      },
      {
        id: 22,
        title: 'useCallback — Funktionen stabil halten',
        category: 'Hooks',
        explanation: `**useCallback** gibt dir eine stabile Referenz auf eine Funktion — sie wird nur dann neu erstellt wenn sich eine Abhängigkeit im Dependency Array ändert. Bei allen anderen Re-renders gibt React dieselbe Funktion zurück.

**Warum ist das relevant — Renderkaskaden vermeiden:**
In JavaScript ist jede Funktion die du definierst ein neues Objekt — auch wenn sie identischen Code enthält. Bei jedem Re-render einer Komponente entstehen also neue Funktionen. Das kann zu einer **Renderkaskade** führen: die Elternkomponente rendert neu, erzeugt dabei eine neue Funktionsreferenz, gibt sie als Prop weiter — und die Kindkomponente rendert deshalb ebenfalls neu, obwohl sich für sie inhaltlich nichts geändert hat. Mit \`useCallback\` bleibt die Funktionsreferenz stabil, die Kindkomponente "sieht" keine Änderung und rendert nicht unnötig neu. Damit das funktioniert muss die Kindkomponente mit \`React.memo\` gewrappt sein — sonst rendert sie ohnehin bei jedem Render der Elternkomponente.

**useMemo vs. useCallback:**
\`useMemo\` cached einen **Wert** — das Ergebnis einer Berechnung. \`useCallback\` cached eine **Funktion** selbst. Man könnte sagen: \`useCallback(fn, deps)\` ist eine Kurzform für \`useMemo(() => fn, deps)\`. Auch hier gilt: nicht blind einsetzen — erst wenn ein messbares Problem besteht.`,
        keyPoints: [
          'useCallback(() => fn, [deps]) → gibt stabile Funktionsreferenz zurück',
          'Nützlich wenn Funktion als Prop an React.memo-Komponente geht',
          'useMemo cached einen Wert, useCallback cached eine Funktion',
          'Nicht blind einsetzen — erst bei messbarem Performance-Problem',
        ],
        learningGoals: [
          'useCallback für stabile Funktionsreferenzen einsetzen',
          'Den Unterschied zwischen useMemo und useCallback erklären',
          'Erklären wann useCallback sinnvoll ist und wann nicht',
        ],
        files: [
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, useCallback } from "react"
import "./App.css"

function App() {
  const [zahl, setZahl] = useState(1)
  const [dunkel, setDunkel] = useState(false)
  const [ergebnis, setErgebnis] = useState(null)

  // wird nur neu erstellt wenn zahl sich ändert
  // Theme-Wechsel (dunkel) erstellt KEINE neue Funktion
  const verdoppeln = useCallback(() => zahl * 2, [zahl])

  return (
    <div className={dunkel ? "app dark" : "app"}>
      <h2>useCallback</h2>
      <input
        type="number"
        value={zahl}
        onChange={e => setZahl(Number(e.target.value))}
        onFocus={e => e.target.select()}
      />
      <button onClick={() => setErgebnis(verdoppeln())}>Ergebnis berechnen</button>
      {ergebnis !== null && (
        <p className="result">{zahl} × 2 = <strong>{ergebnis}</strong></p>
      )}
      <button onClick={() => setDunkel(!dunkel)}>
        Theme: {dunkel ? "Dunkel" : "Hell"}
      </button>
    </div>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.app {
  max-width: 320px;
  margin: 48px auto;
  padding: 32px;
  border-radius: 16px;
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  font-family: sans-serif;
  text-align: center;
  transition: background 0.3s, color 0.3s;
}

.app.dark {
  background: #1e1b2e;
  border-color: #4c1d95;
  color: #e9d5ff;
}

.app h2 {
  font-size: 14px;
  color: #6d28d9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
}

.app.dark h2 { color: #a78bfa; }

.app input {
  width: 100%;
  padding: 10px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #ddd6fe;
  border-radius: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  background: #fff;
}

.app.dark input {
  background: #2d1b4e;
  border-color: #6d28d9;
  color: #e9d5ff;
}

.app button {
  display: block;
  width: 100%;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: #7c3aed;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background 0.15s;
}

.app button:hover { background: #6d28d9; }`,
          },
        ],
      },
      {
        id: 23,
        title: 'React.memo + useCallback — Renderkaskaden vermeiden',
        category: 'Hooks',
        explanation: `In der vorherigen Lektion haben wir gesehen dass \`useCallback\` stabile Funktionsreferenzen erzeugt. Aber wann macht das einen echten Unterschied? Erst wenn die Kindkomponente mit **\`React.memo\`** gewrappt ist. \`React.memo\` verhindert dass eine Komponente neu rendert wenn sich ihre Props nicht geändert haben. Ohne \`React.memo\` rendert die Kindkomponente bei jedem Render der Elternkomponente — egal ob useCallback verwendet wird oder nicht.

**Wie die Kombination funktioniert:**
\`React.memo\` vergleicht bei jedem Render ob sich die Props geändert haben. Bei normalen Werten (Zahlen, Strings) ist das einfach. Bei Funktionen vergleicht JavaScript die **Referenz** — zwei identische Funktionen sind trotzdem unterschiedliche Objekte. Ohne \`useCallback\` entsteht bei jedem Eltern-Render eine neue Funktion → \`React.memo\` sieht eine neue Prop → Kindkomponente rendert trotzdem neu. Mit \`useCallback\` bleibt die Referenz stabil → \`React.memo\` sieht keine Änderung → Kindkomponente bleibt ruhig.

**Render-Counter mit useRef:**
Um sichtbar zu machen wann die Kindkomponente rendert, nutzen wir \`useRef\` als Render-Zähler. \`useRef\` löst selbst kein Re-render aus — der Wert in \`.current\` wird einfach bei jedem Render hochgezählt. So siehst du direkt: Zähler erhöhen → Eltern rendert, Kind bleibt bei 1. Name ändern → beide rendern neu.`,
        keyPoints: [
          'React.memo: Kindkomponente rendert nur neu wenn Props sich ändern',
          'useCallback allein reicht nicht — die Kindkomponente muss mit memo gewrappt sein',
          'useRef als Render-Zähler: ändert sich ohne Re-render auszulösen',
          'Zähler erhöhen → stabile Funktion → Kind rendert NICHT neu',
        ],
        learningGoals: [
          'React.memo und useCallback gemeinsam einsetzen',
          'Verstehen warum React.memo Voraussetzung für useCallback ist',
          'Renderkaskaden mit memo + useCallback gezielt verhindern',
        ],
        files: [
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, useCallback } from "react"
import Kind from "./Kind"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [nachricht, setNachricht] = useState("")

  // stabile Referenz — ändert sich nie (leeres Dependency Array)
  // → Kind rendert nicht neu wenn count sich ändert
  const handleKlick = useCallback(() => {
    setNachricht("Nachricht vom Kind empfangen!")
  }, [])

  return (
    <div className="app">
      <div className="eltern">
        <h2>Elternkomponente</h2>
        <p>Zähler: <strong>{count}</strong></p>
        <button onClick={() => setCount(vorheriger => vorheriger + 1)}>
          Zähler erhöhen
        </button>
        {nachricht && <p className="msg">✓ {nachricht}</p>}
      </div>
      <Kind onKlick={handleKlick} />
    </div>
  )
}

export default App`,
          },
          {
            name: 'Kind.tsx',
            language: 'tsx',
            code: `import { useRef, memo } from "react"

// memo = React.memo: diese Komponente rendert nur neu
// wenn sich ihre Props (onKlick) tatsächlich ändern
const Kind = memo(({ onKlick }) => {
  const renderZaehler = useRef(0)
  renderZaehler.current++  // zählt Renders ohne selbst einen auszulösen

  return (
    <div className="kind">
      <h2>Kindkomponente</h2>
      <p>Renders: <strong>{renderZaehler.current}</strong></p>
      <button onClick={onKlick}>Nachricht senden</button>
    </div>
  )
})

export default Kind`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.app {
  display: flex;
  gap: 20px;
  padding: 36px;
  justify-content: center;
  font-family: sans-serif;
  flex-wrap: wrap;
}

.eltern, .kind {
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  border-radius: 16px;
  padding: 24px;
  min-width: 200px;
  text-align: center;
}

.kind {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.eltern h2, .kind h2 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.eltern h2 { color: #6d28d9; }
.kind h2   { color: #16a34a; }

.eltern p, .kind p {
  font-size: 15px;
  color: #4b5563;
  margin-bottom: 12px;
}

.kind p strong {
  font-size: 28px;
  color: #16a34a;
  display: block;
}

button {
  padding: 9px 18px;
  border-radius: 8px;
  border: none;
  background: #7c3aed;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

button:hover { background: #6d28d9; }

.kind button {
  background: #16a34a;
}

.kind button:hover { background: #15803d; }

.msg {
  margin-top: 10px;
  font-size: 13px;
  color: #16a34a;
  font-weight: 600;
}`,
          },
        ],
      },
      {
        id: 24,
        title: 'useReducer — komplexer State',
        category: 'Hooks',
        explanation: `**useReducer** ist ein Hook der eine Alternative zu \`useState\` bietet — er ist besonders nützlich wenn mehrere verschiedene Aktionen denselben State verändern können. Statt einen Wert direkt zu setzen schickst du eine **Aktion** ab: \`dispatch({ type: "erhoehen" })\`. Eine zentrale Funktion — der **Reducer** — entscheidet dann anhand der Aktion wie der neue State aussieht.

**Eine Reducer-Funktion mit Actions und Switch-Cases:**
Der Reducer ist eine ganz normale Funktion mit zwei Parametern: dem aktuellen State und der Aktion. Ein \`switch\`-Statement teilt die Logik nach \`aktion.type\` auf — jeder \`case\` beschreibt eine mögliche Aktion und gibt den neuen State zurück. Der \`default\`-Fall gibt den unveränderten State zurück wenn keine Aktion passt. Das Schöne daran: alle State-Logik ist an einem Ort gebündelt und leicht nachvollziehbar.

**dispatch — Aktionen abschicken:**
\`dispatch\` ist die Funktion mit der du den Reducer auslöst. Du rufst sie mit einem **Aktionsobjekt** auf: \`dispatch({ type: "erhoehen" })\`. Das Objekt hat mindestens ein \`type\`-Feld das beschreibt was passieren soll — der Reducer empfängt dieses Objekt und entscheidet anhand von \`type\` welcher \`case\` ausgeführt wird. Du "setzt" keinen Wert direkt, sondern beschreibst eine Absicht — und der Reducer übersetzt das in einen neuen State.

**useReducer vs. useState:**
Für einfache Werte würde man normalerweise \`useState\` nehmen — der Code ist kürzer. \`useReducer\` lohnt sich sobald mehrere verschiedene Aktionen möglich sind (wie hier: erhöhen, verringern, zurücksetzen) oder wenn der State aus mehreren zusammengehörenden Werten besteht. Der Vorteil: du musst nicht überlegen "wo setze ich diesen Wert" — du beschreibst einfach was passieren soll und der Reducer kümmert sich um das Wie.`,
        keyPoints: [
          'useReducer(reducer, startwert) → [state, dispatch]',
          'dispatch({ type: "aktion" }) → schickt eine Aktion an den Reducer',
          'Reducer: switch(aktion.type) → gibt immer einen neuen State zurück',
          'default-Case: unbekannte Aktionen → State unverändert zurückgeben',
        ],
        learningGoals: [
          'useReducer für komplexen State einsetzen',
          'Eine Reducer-Funktion mit Actions und Switch-Cases schreiben',
          'Den Unterschied zwischen useReducer und useState erklären',
        ],
        files: [
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useReducer } from "react"
import "./App.css"

// Reducer – nimmt den aktuellen State und eine Aktion
// gibt den neuen State zurück
function reducer(state, aktion) {
  switch (aktion.type) {
    case "erhoehen":
      return state + 1
    case "verringern":
      return state - 1
    case "zuruecksetzen":
      return 0
    default:
      return state  // keine passende Aktion → unveränderter State
  }
}

function App() {
  // count = aktueller State
  // dispatch = Funktion um eine Aktion zu schicken
  // 0 = Startwert
  const [count, dispatch] = useReducer(reducer, 0)

  return (
    <div className="counter">
      <h2>useReducer Zähler</h2>
      <p className="counter-value">{count}</p>
      <div className="counter-buttons">
        <button onClick={() => dispatch({ type: "verringern" })}>−</button>
        <button className="reset" onClick={() => dispatch({ type: "zuruecksetzen" })}>Reset</button>
        <button onClick={() => dispatch({ type: "erhoehen" })}>+</button>
      </div>
    </div>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.counter {
  max-width: 320px;
  margin: 48px auto;
  padding: 36px 32px;
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  border-radius: 16px;
  text-align: center;
  font-family: sans-serif;
}

.counter h2 {
  font-size: 16px;
  color: #6d28d9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
}

.counter-value {
  font-size: 72px;
  font-weight: 700;
  color: #2d1b4e;
  margin: 0 0 28px;
  line-height: 1;
}

.counter-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.counter-buttons button {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: #7c3aed;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.counter-buttons button:hover {
  background: #6d28d9;
  transform: scale(1.08);
}

.counter-buttons button.reset {
  background: #e5e7eb;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
}

.counter-buttons button.reset:hover {
  background: #d1d5db;
}`,
          },
        ],
      },
      {
        id: 25,
        title: 'useReducer — mehrere Reducer in einer Komponente',
        category: 'Hooks',
        explanation: `Eine Komponente kann beliebig viele \`useReducer\`-Aufrufe haben — jeder davon ist völlig unabhängig. Das ist nützlich wenn eine Komponente mehrere klar voneinander getrennte Zustandsbereiche hat: zum Beispiel einen Zähler und ein Formular. Jeder Reducer hat seinen eigenen State und seine eigene \`dispatch\`-Funktion — sie beeinflussen sich gegenseitig nicht.

**Getrennte Verantwortlichkeiten:**
Der \`counterReducer\` kennt nur Zahlen und die Aktionen \`"erhoehen"\`, \`"verringern"\` und \`"zuruecksetzen"\`. Der \`formReducer\` kennt nur das Formular-Objekt mit \`name\` und \`mail\` und die Aktionen \`"setName"\`, \`"setMail"\` und \`"reset"\`. Beide Reducer sind isoliert — eine Aktion die an \`dispatchCount\` geschickt wird landet ausschließlich im \`counterReducer\`, und umgekehrt.

**dispatch mit payload:**
Im \`formReducer\` siehst du ein neues Muster: die Aktion trägt zusätzlich einen Wert mit — \`dispatch({ type: "setName", value: e.target.value })\`. Dieses zusätzliche Feld nennt man **payload**. Der Reducer liest ihn mit \`aktion.value\` aus und aktualisiert damit gezielt nur ein Feld des Objekts über den Spread-Operator: \`{ ...state, name: aktion.value }\`.`,
        keyPoints: [
          'Mehrere useReducer in einer Komponente sind unabhängig voneinander',
          'Jeder useReducer hat seinen eigenen State und sein eigenes dispatch',
          'payload = zusätzliche Daten in der Aktion (z.B. { type: "setName", value: "..." })',
          'Spread-Operator im Reducer: nur das geänderte Feld überschreiben',
        ],
        learningGoals: [
          'Mehrere unabhängige Reducer in einer Komponente einsetzen',
          'Aktionen mit payload-Werten an einen Reducer schicken',
          'Den Spread-Operator im Reducer zum gezielten Updaten von Objekt-State einsetzen',
        ],
        files: [
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useReducer } from "react"
import "./App.css"

// Reducer 1 – zuständig für den Zähler
function counterReducer(state, aktion) {
  switch (aktion.type) {
    case "erhoehen":      return state + 1
    case "verringern":    return state - 1
    case "zuruecksetzen": return 0
    default:              return state
  }
}

// Reducer 2 – zuständig für das Formular
function formReducer(state, aktion) {
  switch (aktion.type) {
    case "setName": return { ...state, name: aktion.value }
    case "setMail": return { ...state, mail: aktion.value }
    case "reset":   return { name: "", mail: "" }
    default:        return state
  }
}

function App() {
  // jeder useReducer hat seinen eigenen dispatch
  const [count, dispatchCount] = useReducer(counterReducer, 0)
  const [form, dispatchForm] = useReducer(formReducer, { name: "", mail: "" })

  return (
    <div className="wrapper">

      {/* Zähler */}
      <div className="card">
        <h2>Zähler</h2>
        <p className="count-value">{count}</p>
        <div className="btn-row">
          <button onClick={() => dispatchCount({ type: "verringern" })}>−</button>
          <button className="reset" onClick={() => dispatchCount({ type: "zuruecksetzen" })}>Reset</button>
          <button onClick={() => dispatchCount({ type: "erhoehen" })}>+</button>
        </div>
      </div>

      {/* Formular */}
      <div className="card">
        <h2>Formular</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => dispatchForm({ type: "setName", value: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mail"
          value={form.mail}
          onChange={e => dispatchForm({ type: "setMail", value: e.target.value })}
        />
        <button className="reset" onClick={() => dispatchForm({ type: "reset" })}>
          Formular leeren
        </button>
        <p className="preview">Name: <strong>{form.name || "—"}</strong></p>
        <p className="preview">Mail: <strong>{form.mail || "—"}</strong></p>
      </div>

    </div>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.wrapper {
  display: flex;
  gap: 24px;
  padding: 40px;
  justify-content: center;
  font-family: sans-serif;
}

.card {
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  border-radius: 16px;
  padding: 28px 24px;
  min-width: 220px;
  text-align: center;
}

.card h2 {
  font-size: 14px;
  color: #6d28d9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}

.count-value {
  font-size: 64px;
  font-weight: 700;
  color: #2d1b4e;
  margin: 0 0 20px;
  line-height: 1;
}

.btn-row {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.card button {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #7c3aed;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

.card button:hover { background: #6d28d9; }

.card button.reset {
  background: #e5e7eb;
  color: #374151;
  font-size: 13px;
}

.card button.reset:hover { background: #d1d5db; }

.card input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 12px;
  border: 1px solid #ddd6fe;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
}

.card input:focus { border-color: #7c3aed; }

.preview {
  font-size: 13px;
  color: #6b5b8c;
  margin: 6px 0 0;
}`,
          },
        ],
      },
      {
        id: 26,
        title: 'Custom Hooks — wiederverwendbare Logik',
        category: 'Hooks',
        explanation: `**Custom Hooks** sind eigene Funktionen die mit dem Präfix \`use\` beginnen und intern andere Hooks verwenden — zum Beispiel \`useState\`, \`useEffect\` oder andere Custom Hooks. Du kannst sie genau wie eingebaute Hooks aufrufen. Das \`use\`-Präfix ist dabei Pflicht: React erkennt daran, dass es sich um einen Hook handelt, und kann die Regeln für Hooks (nur in Komponenten/Hooks aufrufen, nicht in Schleifen) entsprechend prüfen.

**Wiederverwendbare Logik auslagern:**
Ein Custom Hook extrahiert Logik die in mehreren Komponenten gebraucht wird. Statt \`useState + useEffect\` für einen API-Fetch in jeder Komponente zu wiederholen, schreibst du einmal \`useFetch(url)\` und rufst ihn überall auf. Jede Komponente die den Hook nutzt, bekommt ihre eigene unabhängige State-Instanz — der State wird nicht geteilt, nur die Logik.

**Custom Hook vs. Hilfsfunktion:**
Eine normale Hilfsfunktion kann keine Hooks nutzen — sie hat keinen React-Kontext. Ein Custom Hook dagegen kann \`useState\`, \`useEffect\` und alle anderen Hooks verwenden. Der Unterschied: Hilfsfunktionen transformieren Daten, Custom Hooks verwalten State und Seiteneffekte. Wenn deine Funktion Hooks enthält, muss sie ein Custom Hook sein (also mit \`use\` beginnen).`,
        keyPoints: [
          'Name beginnt mit "use" — Pflicht für React-Regeln',
          'Kann useState, useEffect usw. intern nutzen',
          'Gibt State und Handler zurück wie eine Bibliothek',
          'Jede Komponente die den Hook nutzt, hat eigene State-Kopie',
        ],
        learningGoals: [
          'Einen eigenen Custom Hook mit use-Präfix erstellen',
          'Wiederverwendbare Logik aus Komponenten in Hooks auslagern',
          'Den Unterschied zwischen einem Custom Hook und einer Hilfsfunktion erklären',
        ],
        files: [
          {
            name: 'useDoppelt.ts',
            language: 'tsx',
            code: `import { useState } from "react"

// Custom Hook — Name muss mit "use" beginnen
function useDoppelt(startwert: number) {
  const [zahl, setZahl] = useState(startwert)  // eigener State im Hook
  const doppelt = zahl * 2                      // berechneter Wert

  return { zahl, doppelt, setZahl }  // alles was die Komponente braucht
}

export default useDoppelt`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import useDoppelt from "./useDoppelt"
import "./App.css"

function App() {
  // Hook aufrufen — Startwert 1, gibt State und Setter zurück
  const { zahl, doppelt, setZahl } = useDoppelt(1)

  return (
    <div className="app">
      <h2>Custom Hook</h2>
      <input
        type="number"
        value={zahl}
        onChange={e => setZahl(Number(e.target.value))}  // Setter aus dem Hook
        onFocus={e => e.target.select()}
      />
      <p className="result">{zahl} × 2 = <strong>{doppelt}</strong></p>
    </div>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
  font-family: sans-serif;
}

h2 {
  font-size: 18px;
  color: #6d28d9;
  margin: 0;
}

input[type="number"] {
  width: 100px;
  padding: 10px 14px;
  font-size: 20px;
  text-align: center;
  border: 2px solid #ddd6fe;
  border-radius: 8px;
  outline: none;
  color: #2d1b4e;
}

input[type="number"]:focus {
  border-color: #7c3aed;
}

.result {
  font-size: 20px;
  color: #4b5563;
  margin: 0;
}

.result strong {
  color: #7c3aed;
}`,
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
        id: 27,
        title: 'React Router — Navigation',
        category: 'Fortgeschritten',
        explanation: `**React Router** bringt Navigation in deine React-App — ohne dass der Browser die Seite neu lädt. Wenn der User auf einen Link klickt, ändert sich nur die URL, aber React tauscht im Hintergrund nur die passende Komponente aus. Das nennt sich **Single Page Application (SPA)**: es gibt genau eine HTML-Datei, und React übernimmt das Anzeigen und Verstecken von Seiten vollständig selbst. Installation: \`npm install react-router-dom\`.

**BrowserRouter in main.tsx:**
Den \`BrowserRouter\` wickelst du einmalig in \`main.tsx\` um die gesamte App. Damit aktivierst du das Routing für alle Komponenten darunter — genau wie \`Context\` muss der Router ganz außen stehen damit alle Kindkomponenten darauf zugreifen können.

**Routen in App.tsx definieren:**
In \`App.tsx\` legst du mit \`<Routes>\` und \`<Route>\` fest welche Komponente bei welcher URL angezeigt wird. \`path="/"\` ist die Startseite, \`path="/kontakt"\` die Kontaktseite usw. React Router vergleicht die aktuelle URL mit den definierten Pfaden und rendert die passende Komponente.

**Link statt \`<a href>\`:**
Für Navigation innerhalb der App verwendest du \`<Link to="/kontakt">\` statt \`<a href="/kontakt">\`. Der Unterschied: \`<a href>\` löst einen vollständigen Seiten-Reload aus — der Browser lädt die ganze App neu. \`<Link>\` verhindert das und lässt React Router die URL tauschen ohne neu zu laden.

**Navbar als eigene Komponente:**
Die Navigation wird als eigene \`Navbar\`-Komponente ausgelagert und in \`App.tsx\` oberhalb der \`<Routes>\` eingebunden — so erscheint sie auf jeder Seite.`,
        keyPoints: [
          'BrowserRouter in main.tsx: aktiviert Routing für die gesamte App',
          'Routes + Route: URL → Komponente Zuordnung',
          'Link statt <a href>: Navigation ohne Seiten-Reload',
          'Navbar oberhalb von <Routes>: erscheint auf allen Seiten',
        ],
        learningGoals: [
          'React Router installieren und BrowserRouter in main.tsx einrichten',
          'Routen mit Routes und Route in App.tsx definieren',
          'Mit Link zwischen Seiten navigieren ohne Seiten-Reload',
          'Eine Navbar als eigene Komponente aufbauen',
        ],
        files: [
          {
            name: 'main.tsx',
            language: 'tsx',
            code: `import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"  // Routing aktivieren
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>   {/* umhüllt die gesamte App */}
    <App />
  </BrowserRouter>
)`,
          },
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Startseite from "./Startseite"
import Kontakt from "./Kontakt"
import UeberUns from "./UeberUns"
import "./App.css"

function App() {
  return (
    <>
      <Navbar />               {/* erscheint auf jeder Seite */}
      <main>
        <Routes>               {/* nur eine Route wird gleichzeitig gerendert */}
          <Route path="/"          element={<Startseite />} />
          <Route path="/kontakt"   element={<Kontakt />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
        </Routes>
      </main>
    </>
  )
}

export default App`,
          },
          {
            name: 'Navbar.tsx',
            language: 'tsx',
            code: `import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      {/* Link statt <a href> — kein Seiten-Reload */}
      <Link to="/">Startseite</Link>
      <Link to="/kontakt">Kontakt</Link>
      <Link to="/ueber-uns">Über uns</Link>
    </nav>
  )
}

export default Navbar`,
          },
          {
            name: 'Startseite.tsx',
            language: 'tsx',
            code: `import { Link } from "react-router-dom"

function Startseite() {
  return (
    <>
      <h1>Willkommen auf der Startseite</h1>
      <Link to="/kontakt" className="link-btn">Kontaktiere uns</Link>
    </>
  )
}

export default Startseite`,
          },
          {
            name: 'Kontakt.tsx',
            language: 'tsx',
            code: `function Kontakt() {
  return <h1>Kontaktseite</h1>
}

export default Kontakt`,
          },
          {
            name: 'UeberUns.tsx',
            language: 'tsx',
            code: `function UeberUns() {
  return <h1>Über uns</h1>
}

export default UeberUns`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background: #faf8fc;
  color: #2d1b4e;
}

nav {
  display: flex;
  gap: 4px;
  padding: 14px 24px;
  background: #7c3aed;
  box-shadow: 0 2px 10px rgba(124, 58, 237, 0.3);
}

nav a {
  color: #fff;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.2);
}

main {
  padding: 40px 28px;
}

h1 {
  font-size: 26px;
  margin-bottom: 20px;
}

.link-btn {
  display: inline-block;
  padding: 10px 22px;
  background: #7c3aed;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.link-btn:hover {
  background: #6d28d9;
}`,
          },
        ],
      },
      {
        id: 28,
        title: 'Formulare — kontrollierte Inputs',
        category: 'Fortgeschritten',
        explanation: `Bei **kontrollierten Inputs** übernimmt React die vollständige Kontrolle über den Wert eines Eingabefelds. Der aktuelle Wert wird in einem State gespeichert und über das \`value\`-Attribut an das Eingabefeld gebunden. Bei jeder Änderung des Felds wird über \`onChange\` der State aktualisiert — das Feld zeigt stets genau das was im State steht.

**Wie das zusammenspielt:**
\`value={name}\` bindet den State an das Feld. \`onChange={e => setName(e.target.value)}\` aktualisiert den State bei jeder Eingabe. React und Eingabefeld sind damit immer synchron — der State ist die einzige Quelle der Wahrheit. Ohne \`onChange\` wäre das Feld schreibgeschützt, da React den Wert aus dem State nicht überschreiben würde.

**Jedes Feld hat seinen eigenen State:**
Im Beispiel gibt es zwei unabhängige States: \`name\` und \`mail\`. Jedes Eingabefeld ist an seinen eigenen State gebunden und aktualisiert nur diesen. Beim Abschicken stehen beide Werte sofort zur Verfügung — kein Auslesen aus dem DOM nötig.

**Warum kontrolliert?**
Der State ist jederzeit der aktuelle Wert. Das macht Validierung, Vorschau oder Weiterverarbeitung der Eingabe während des Tippens möglich — ohne auf ein Submit-Event warten zu müssen.`,
        keyPoints: [
          'value={state}: React bestimmt was im Feld steht',
          'onChange={e => setState(e.target.value)}: jede Eingabe aktualisiert den State',
          'State und Eingabefeld sind immer synchron',
          'Beim Abschicken sind alle Werte direkt im State verfügbar',
        ],
        learningGoals: [
          'Kontrollierte Inputs mit value und onChange umsetzen',
          'Mehrere Felder mit eigenem State verwalten',
          'Verstehen warum State und Eingabefeld immer synchron sind',
        ],
        files: [
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from "react"
import "./App.css"

function App() {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [ausgabe, setAusgabe] = useState("")

  function abschicken() {
    // value kommt direkt aus dem State — kein Zugriff auf den DOM nötig
    setAusgabe(\`Name: \${name} | Mail: \${mail}\`)
  }

  return (
    <div className="app">
      <h2>Kontrolliertes Formular</h2>

      {/* value kommt von useState – onChange updated useState */}
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={mail}
        onChange={e => setMail(e.target.value)}
        placeholder="Mail"
      />
      <button onClick={abschicken}>Abschicken</button>

      {ausgabe && <p className="ausgabe">{ausgabe}</p>}
    </div>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.app {
  font-family: sans-serif;
  max-width: 320px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h2 {
  font-size: 18px;
  color: #2d1b4e;
  margin: 0 0 4px;
}

input {
  padding: 10px 14px;
  border: 1px solid #ddd6fe;
  border-radius: 8px;
  font-size: 14px;
  color: #2d1b4e;
  outline: none;
}

input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
}

button {
  padding: 10px;
  background: #7c3aed;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

button:hover { background: #6d28d9; }

.ausgabe {
  margin: 4px 0 0;
  font-size: 13px;
  color: #16a34a;
  font-weight: 600;
}`,
          },
        ],
      },
      {
        id: 29,
        title: 'Formulare — unkontrollierte Inputs',
        category: 'Fortgeschritten',
        explanation: `Bei **unkontrollierten Inputs** verwaltet der Browser den Wert des Eingabefelds selbst — React greift nicht bei jeder Eingabe ein. Statt \`value\` und \`onChange\` wird eine **Ref** an das Element gehängt. React liest den Wert erst dann aus wenn er tatsächlich gebraucht wird, typischerweise beim Absenden des Formulars.

**Wie useRef hier eingesetzt wird:**
\`useRef<HTMLInputElement>(null)\` erstellt eine Referenz auf das DOM-Element. Das \`ref\`-Attribut hängt sie an das Eingabefeld. Beim Absenden liest \`inputRef.current?.value\` den aktuellen Wert direkt aus dem DOM — ohne dass React den State zwischendrin verwaltet hat.

**Unterschied zu kontrollierten Inputs:**
Bei kontrollierten Inputs ist React bei jeder Tastatureingabe beteiligt und hält den State aktuell. Bei unkontrollierten Inputs passiert das nicht — React fragt nur einmal beim Absenden nach dem Wert. Das bedeutet weniger Code und weniger Re-renders, aber auch keine Möglichkeit zur Live-Validierung während der Eingabe.

**Wann welcher Ansatz:**
Kontrollierte Inputs sind der React-Standard und für die meisten Formulare empfohlen — besonders wenn Validierung während der Eingabe gefragt ist. Unkontrollierte Inputs eignen sich für einfache Fälle, bei denen der Wert nur beim Absenden ausgelesen werden muss.`,
        keyPoints: [
          'useRef<HTMLInputElement>(null): Referenz auf das DOM-Element',
          'ref={nameRef}: hängt die Ref an das jeweilige Eingabefeld',
          'nameRef.current?.value: Wert wird erst beim Abschicken gelesen',
          'Kein onChange, kein State-Update bei jeder Eingabe',
        ],
        learningGoals: [
          'Unkontrollierte Inputs mit useRef umsetzen',
          'Den Wert eines Felds beim Absenden per Ref auslesen',
          'Den Unterschied zu kontrollierten Inputs erklären und abwägen',
        ],
        files: [
          {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useRef, useState } from "react"
import "./App.css"

function App() {
  const nameRef = useRef<HTMLInputElement>(null)
  const mailRef = useRef<HTMLInputElement>(null)
  const [ausgabe, setAusgabe] = useState("")

  function abschicken() {
    // Werte werden erst hier gelesen — nicht bei jeder Eingabe
    const name = nameRef.current?.value ?? ""
    const mail = mailRef.current?.value ?? ""
    setAusgabe(\`Name: \${name} | Mail: \${mail}\`)
  }

  return (
    <div className="app">
      <h2>Unkontrolliertes Formular</h2>

      {/* kein value, kein onChange – useRef greift direkt auf den DOM zu */}
      <input
        type="text"
        ref={nameRef}
        placeholder="Name"
      />
      <input
        type="text"
        ref={mailRef}
        placeholder="Mail"
      />
      <button onClick={abschicken}>Abschicken</button>

      {ausgabe && <p className="ausgabe">{ausgabe}</p>}
    </div>
  )
}

export default App`,
          },
          {
            name: 'App.css',
            language: 'css',
            code: `.app {
  font-family: sans-serif;
  max-width: 320px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h2 {
  font-size: 18px;
  color: #2d1b4e;
  margin: 0 0 4px;
}

input {
  padding: 10px 14px;
  border: 1px solid #ddd6fe;
  border-radius: 8px;
  font-size: 14px;
  color: #2d1b4e;
  outline: none;
}

input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
}

button {
  padding: 10px;
  background: #7c3aed;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

button:hover { background: #6d28d9; }

.ausgabe {
  margin: 4px 0 0;
  font-size: 13px;
  color: #16a34a;
  font-weight: 600;
}`,
          },
        ],
      },
      {
        id: 30,
        title: 'TypeScript mit React — Typen & Generics',
        category: 'Fortgeschritten',
        explanation: `TypeScript macht React-Code deutlich robuster: Fehler werden direkt im Editor angezeigt, nicht erst wenn der User sie in der fertigen App auslöst. Für Props, State und Event-Handler gibt es jeweils passende TypeScript-Typen. Event-Typen wie \`React.ChangeEvent<HTMLInputElement>\` oder \`React.FormEvent\` sorgen dafür, dass du auf \`e.target.value\` zugreifen kannst ohne TypeScript-Fehler.

**Generics in React-Hooks korrekt einsetzen:**
Viele eingebaute Hooks akzeptieren **Generics**: \`useState<User | null>(null)\` sagt TypeScript dass dieser State entweder ein \`User\`-Objekt oder \`null\` ist. \`useRef<HTMLInputElement>(null)\` stellt sicher dass \`ref.current\` als \`HTMLInputElement\` behandelt wird. Bei eigenen generischen Komponenten schreibst du \`<T,>\` (mit Komma, damit TypeScript es nicht als JSX-Tag missversteht).

**Interface vs. Type für Komponenten-Props:**
Beide funktionieren für Komponenten-Props — es gibt keinen technischen Unterschied für einfache Fälle. Convention: \`interface\` für Objekte die erweitert werden könnten (Props, API-Responses), \`type\` für alles andere (Unions, Aliases, Primitive). In React ist die Wahl meistens \`interface CardProps { ... }\` für Props — aber wenn das Projekt schon eine Konvention hat, bleib dabei. Konsistenz ist wichtiger als die Wahl selbst.`,
        keyPoints: [
          'Interface für Props — immer, auch bei wenigen Props',
          'Generics: <T> in Komponenten für flexible Typen',
          'React.ComponentProps<"button"> — HTMLButton-Attribute vererben',
          'Discriminated Unions für komplexe Props-Varianten',
        ],
        learningGoals: [
          'Props, State und Events mit TypeScript typisieren',
          'Generics in React-Hooks korrekt einsetzen',
          'Interface vs. Type für Komponenten-Props verwenden',
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
        id: 31,
        title: 'React.memo — Rendering optimieren',
        category: 'Fortgeschritten',
        explanation: `**React.memo** ist eine Funktion die eine Komponente "einwickelt" und ihr ein Gedächtnis für ihre Props gibt. Ohne \`memo\` rendert React eine Kindkomponente jedes Mal neu, wenn der Parent rendert — auch wenn die Props der Kindkomponente sich gar nicht geändert haben. Mit \`memo\` merkt sich React die letzten Props und überspringt das Re-render wenn sie gleich geblieben sind.

**Wann React.memo sinnvoll ist:**
\`React.memo\` lohnt sich nur für Komponenten die **teuer zu rendern** sind und deren **Parent häufig neu rendert**. Ein gutes Beispiel: eine große Listenkomponente die viel berechnet, während der Parent seinen eigenen State laufend ändert. Für einfache Komponenten mit wenigen Elementen bringt \`memo\` keinen messbaren Vorteil — es fügt sogar einen kleinen Overhead durch den Props-Vergleich hinzu.

**Das Zusammenspiel mit useCallback:**
\`React.memo\` vergleicht Props mit **Shallow Comparison** — es prüft ob zwei Werte dieselbe Referenz haben. Für Zahlen und Strings funktioniert das prima. Für Funktionen aber nicht: bei jedem Render des Parents entsteht eine neue Funktion — eine neue Referenz — und \`memo\` denkt die Prop hat sich geändert. Deshalb musst du Handler-Props mit \`useCallback\` stabilisieren, damit \`memo\` seinen Zweck erfüllt.`,
        keyPoints: [
          'React.memo(Component) — Komponente merkt sich Props',
          'Shallow Comparison — Objekte/Arrays brauchen stabile Referenzen',
          'useCallback für Handler-Props — sonst neue Referenz bei jedem Render',
          'Nur einsetzen wenn Profiler Performance-Probleme zeigt',
        ],
        learningGoals: [
          'Komponenten mit React.memo vor unnötigen Re-renders schützen',
          'Erklären wann React.memo sinnvoll ist',
          'Das Zusammenspiel mit useCallback verstehen',
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
        id: 32,
        title: 'Error Boundaries',
        category: 'Fortgeschritten',
        explanation: `**Error Boundaries** sind Komponenten die JavaScript-Fehler in ihrem Kindbaum abfangen und statt einem abstürzenden UI eine benutzerfreundliche Fehlermeldung anzeigen. Ohne Error Boundary würde ein Laufzeitfehler in einer tief verschachtelten Komponente die gesamte App zum Absturz bringen — mit Error Boundary bleibt nur der betroffene Bereich kaputt, der Rest funktioniert weiter.

**Eine Error Boundary implementieren:**
Error Boundaries müssen als **Klassen-Komponenten** geschrieben werden — das ist der einzige Bereich in React wo Klassen nach wie vor notwendig sind, weil Hooks diese Lifecycle-Methoden nicht abbilden können. Du implementierst zwei Methoden: \`getDerivedStateFromError()\` setzt einen Fehler-State (damit der Fallback angezeigt wird), und \`componentDidCatch()\` kann den Fehler loggen (z.B. an einen Monitoring-Dienst wie Sentry schicken).

**Laufzeitfehler abfangen und Fallback anzeigen:**
Sobald eine Kindkomponente einen Fehler wirft, wechselt die Error Boundary in den Fehler-Zustand und rendert stattdessen die Fallback-UI. Du kannst eine eigene \`fallback\`-Prop anbieten (\`<ErrorBoundary fallback={<p>Fehler!</p>}>\`) oder eine Standard-Fehlermeldung definieren. Wichtig: Async-Fehler (z.B. in \`fetch()\`) werden von Error Boundaries **nicht** gefangen — dafür brauchst du \`try/catch\` im \`useEffect\`.`,
        keyPoints: [
          'Nur Klassen-Komponenten können Error Boundaries sein',
          'getDerivedStateFromError → Fallback-State setzen',
          'componentDidCatch → Fehler loggen (z.B. Sentry)',
          'Async-Fehler (fetch) werden NICHT gefangen — useEffect try/catch nutzen',
        ],
        learningGoals: [
          'Eine Error Boundary Komponente implementieren',
          'Laufzeitfehler in Kindkomponenten abfangen',
          'Einen benutzerfreundlichen Fehler-Fallback anzeigen',
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
        id: 33,
        title: 'Lazy Loading & Suspense',
        category: 'Fortgeschritten',
        explanation: `Wenn eine React-App groß wird, lädt der Browser beim ersten Besuch das gesamte JavaScript herunter — auch Code für Seiten die der User vielleicht nie besucht. **Code-Splitting** löst dieses Problem: der Code wird in kleinere Chunks aufgeteilt, und jeder Chunk wird erst geladen wenn er gebraucht wird. Vite unterstützt Code-Splitting automatisch, du musst es nur aktivieren.

**Komponenten mit React.lazy laden:**
\`React.lazy(() => import('./HeavyChart'))\` erstellt eine Komponente die erst beim ersten Render geladen wird. Vite erzeugt dafür automatisch einen eigenen JavaScript-Chunk. Das ist besonders sinnvoll für schwere Komponenten (Charts, Editoren) oder für Seiten hinter einer Login-Schranke — diese braucht kein User der noch gar nicht eingeloggt ist.

**Suspense mit einem Fallback:**
Während die lazy-Komponente noch heruntergeladen wird, zeigt \`<Suspense fallback={<p>Wird geladen...</p>}>\` den Fallback an. Sobald der Chunk geladen ist, tauscht React den Fallback gegen die echte Komponente aus. Du kannst mehrere lazy-Komponenten unter einem einzigen \`<Suspense>\` bündeln — der Fallback wird so lange angezeigt bis alle bereit sind.`,
        keyPoints: [
          'React.lazy(() => import("./Heavy")) — dynamischer Import',
          '<Suspense fallback={<Loader />}> — während Laden',
          'Gilt auch für Routen — sehr häufiger Einsatz',
          'Vite unterstützt Code-Splitting automatisch',
        ],
        learningGoals: [
          'Komponenten mit React.lazy lazy laden',
          'Suspense mit einem Fallback für den Ladevorgang einsetzen',
          'Verstehen wie Code-Splitting die Ladezeit verbessert',
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
        id: 34,
        title: 'Portale — Rendering außerhalb des Root',
        category: 'Fortgeschritten',
        explanation: `Normalerweise rendert React jede Komponente innerhalb ihres Parents im DOM. **Portale** durchbrechen diese Regel: \`createPortal(jsx, domNode)\` rendert JSX direkt in einen anderen DOM-Knoten — typischerweise \`document.body\`. Im React-Komponentenbaum bleibt die Komponente trotzdem an ihrem Platz (Events bubblen wie erwartet durch den React-Baum), aber im echten DOM erscheint sie woanders.

**Typische Anwendungsfälle:**
Portale werden vor allem für **Modals, Tooltips und Dropdowns** verwendet. Der Grund: Diese Elemente müssen visuell über allem anderen liegen (\`z-index\`), aber wenn sie tief in einem Container mit \`overflow: hidden\` oder einem niedrigen \`z-index\` liegen, würden sie abgeschnitten oder verdeckt. Indem das Modal direkt in \`document.body\` gerendert wird, umgeht es alle CSS-Beschränkungen der Parent-Elemente.

**Warum Portale für Modals nützlich sind:**
Ohne Portal: du hast ein Modal tief in deiner Komponenten-Hierarchie, aber sein Parent-Container hat \`overflow: hidden\` — das Modal wird abgeschnitten. Mit Portal: das Modal rendert direkt in \`document.body\`, hat vollen Zugriff auf den Viewport, und der Backdrop (\`position: fixed; inset: 0\`) deckt die gesamte Seite ab. Die React-Logik (State, Props, Events) bleibt dabei vollständig erhalten.`,
        keyPoints: [
          'createPortal(jsx, domNode) — rendert jsx in domNode',
          'Events bubblen trotzdem durch React-Komponentenbaum',
          'domNode muss im echten DOM existieren (z.B. document.body)',
        ],
        learningGoals: [
          'ReactDOM.createPortal einsetzen um außerhalb des Root zu rendern',
          'Typische Anwendungsfälle für Portale nennen',
          'Verstehen warum Portale für Modals und Tooltips nützlich sind',
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
        id: 35,
        title: 'Projektübersicht & Architektur',
        category: 'Praxisprojekt',
        explanation: `**SportsDash** ist unser Praxisprojekt: eine App mit Login/Registrierung und Fußball-Ergebnissen aus einer echten API. Das Projekt verbindet alles aus dem Kurs — React Router für Navigation, Context für den Auth-State, und \`fetch()\` für API-Daten. Der Datenfluss ist: AuthContext stellt den eingeloggten User bereit → Router steuert welche Seite angezeigt wird → geschützte Seiten laden API-Daten.

**Die Ordnerstruktur verstehen:**
Das Projekt ist in klare Bereiche unterteilt: \`src/pages/\` enthält die vollständigen Seiten (Login, Dashboard), \`src/components/\` enthält wiederverwendbare Bausteine (MatchCard, Layout, PrivateRoute), \`src/context/\` enthält den AuthContext, \`src/hooks/\` enthält Custom Hooks, und \`src/types/\` enthält alle TypeScript-Typen. Diese Struktur ist ein verbreitetes Muster in React-Projekten.

**Pages vs. Components:**
Der Unterschied: **Pages** sind vollständige Seiten die einer Route zugeordnet sind — sie kombinieren mehrere Komponenten zu einer kompletten Ansicht. **Components** sind wiederverwendbare Bausteine die auf verschiedenen Seiten eingesetzt werden können. Eine \`MatchCard\` ist eine Komponente (zeigt ein Spiel an), das \`DashboardPage\` ist eine Seite (zeigt alle Spiele und den Header zusammen).`,
        keyPoints: [
          'Ordnerstruktur: src/components, src/pages, src/context, src/hooks, src/types',
          'AuthContext: verwaltet eingeloggten User global',
          'PrivateRoute: leitet nicht-eingeloggte User zum Login um',
          'API: api-football.com (kostenloser Tier verfügbar)',
        ],
        learningGoals: [
          'Die Ordnerstruktur des SportsDash-Projekts verstehen',
          'Erklären wie die Komponenten und Seiten zusammenhängen',
          'Den Unterschied zwischen Pages und Components in diesem Projekt beschreiben',
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
        id: 36,
        title: 'Projekt: Types & Interfaces',
        category: 'Praxisprojekt',
        explanation: `In einem Projekt mit mehreren Dateien lohnt es sich, alle gemeinsamen TypeScript-Typen **zentral** zu definieren — in \`src/types/index.ts\`. So müssen Typen nicht in jeder Datei neu definiert werden, und wenn sich ein Typ ändert (z.B. die API liefert ein neues Feld), musst du nur an einer Stelle editieren.

**Interfaces für API-Responses und State-Objekte:**
Für API-Responses schaust du in die API-Dokumentation und baust die Typen nach — nur die Felder die du wirklich brauchst. \`interface Match\` beschreibt ein Spielobjekt mit Teams, Toren und Status. \`interface ApiResponse<T>\` ist ein generisches Interface für die Wrapper-Struktur der API. Für Auth-Daten definierst du \`interface User\`, \`interface LoginData\` und \`interface AuthContextType\`.

**Typen projektübergreifend importieren:**
Alle Typen werden mit \`export interface\` exportiert. In anderen Dateien importierst du sie gezielt: \`import type { User, Match } from '../types'\`. Das \`import type\` (statt \`import\`) ist eine TypeScript-Optimierung — es signalisiert dass nur der Typ gebraucht wird, kein Laufzeit-Code. Wenn TypeScript-Fehler auftauchen weil ein Feld fehlt oder den falschen Typ hat, findest du die Definition immer an einer Stelle.`,
        keyPoints: [
          'Zentrale types/index.ts verhindert doppelte Definitionen',
          'API-Typen exakt nach API-Dokumentation benennen',
          'Optional fields (?) für Felder die manchmal fehlen',
        ],
        learningGoals: [
          'Zentrale TypeScript-Typen für das Projekt anlegen',
          'Interfaces für API-Responses und State-Objekte definieren',
          'Typen projektübergreifend importieren und wiederverwenden',
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
        id: 37,
        title: 'Projekt: AuthContext',
        category: 'Praxisprojekt',
        explanation: `Der **AuthContext** ist das Herzstück der User-Verwaltung: Er hält den eingeloggten User als State und stellt Login-, Logout- und Register-Funktionen für die gesamte App bereit. Alle Komponenten die wissen müssen ob jemand eingeloggt ist, konsumieren diesen Context — ohne Props durch die Hierarchie reichen zu müssen.

**Login- und Logout-Logik zentral verwalten:**
Im AuthProvider leben alle Auth-Funktionen: \`register()\` erstellt einen neuen User und speichert ihn im \`localStorage\`, \`login()\` prüft die Eingabe gegen den gespeicherten User und setzt den State, \`logout()\` löscht den User aus dem State und aus dem \`localStorage\`. Der \`useEffect\` beim Start liest den gespeicherten User aus dem \`localStorage\` — so bleibt die Session auch nach einem Seiten-Reload erhalten.

**Den AuthContext konsumieren:**
Der Custom Hook \`useAuth()\` macht den Zugriff komfortabel: \`const { user, login, logout } = useAuth()\` — fertig. Der Hook wirft einen Fehler wenn er außerhalb des Providers verwendet wird, was Bugs durch falsche Verwendung früh aufdeckt. In einer echten App würden \`login()\` und \`register()\` echte API-Calls machen (\`fetch('/api/login', ...)\`) statt lokal zu simulieren.`,
        keyPoints: [
          'localStorage: User-Session persistieren',
          'JSON.parse/stringify: Objekte in localStorage konvertieren',
          'Provider wraps die ganze App in main.tsx',
          'Custom Hook useAuth() für bequemen Zugriff',
        ],
        learningGoals: [
          'Einen AuthContext für Login-State anlegen',
          'Login- und Logout-Logik zentral im Context verwalten',
          'Den AuthContext in beliebigen Komponenten konsumieren',
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
        id: 38,
        title: 'Projekt: PrivateRoute & Layout',
        category: 'Praxisprojekt',
        explanation: `Eine **PrivateRoute-Komponente** schützt Seiten die nur für eingeloggte User zugänglich sein sollen. Die Logik ist simpel: wenn kein User eingeloggt ist, wird mit \`<Navigate to="/login" replace />\` sofort zum Login weitergeleitet. Wenn ein User eingeloggt ist, rendert \`<Outlet />\` die eigentliche Kind-Route. Das \`replace\` sorgt dafür dass die geschützte URL nicht im Browser-Verlauf landet — der Zurück-Button führt nicht zurück zur geschützten Seite.

**Nicht eingeloggte User weiterleiten:**
Der Auth-State kommt aus dem \`useAuth()\`-Hook. Während der State noch aus dem \`localStorage\` geladen wird (\`isLoading\`), zeigt die PrivateRoute einen Ladehinweis — sonst würde kurz die Login-Seite aufblitzen bevor die Session erkannt wird. Erst wenn klar ist dass kein User eingeloggt ist, wird weitergeleitet.

**Ein gemeinsames Layout für alle Seiten:**
Die \`Layout\`-Komponente liefert den gemeinsamen Header mit Navigation und Logout-Button. Sie verwendet \`<Outlet />\` als Platzhalter für den eigentlichen Seiteninhalt — React Router tauscht dort die aktuelle Seite ein. Indem du Layout als Wrapper-Route in deiner Routen-Konfiguration verwendest, bekommen alle Kind-Routen automatisch den Header, ohne dass jede Seite ihn selbst importieren muss.`,
        keyPoints: [
          'Navigate component: programmatische Umleitung in Router',
          'replace: ersetzt History-Eintrag (kein Zurück-Button zur geschützten Seite)',
          'Outlet: rendert die aktuelle Kind-Route',
        ],
        learningGoals: [
          'Eine PrivateRoute-Komponente zum Schützen von Routen bauen',
          'Nicht eingeloggte Nutzer auf die Login-Seite weiterleiten',
          'Ein gemeinsames Layout für geschützte Seiten definieren',
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
        id: 39,
        title: 'Projekt: Login & Register Pages',
        category: 'Praxisprojekt',
        explanation: `Die Login- und Registrierungsseiten sind kontrollierte Formulare die auf den AuthContext zugreifen. Das Formular hält die Eingaben in einem State-Objekt (\`{ email: '', password: '' }\`) und nutzt einen generischen \`handleChange\`-Handler mit computed property syntax. Die Auth-Logik selbst (Login/Register) liegt komplett im Context — die Seite ruft nur \`login(form)\` oder \`register(form)\` auf.

**Formulardaten validieren und Fehler anzeigen:**
Fehler können auf zwei Arten entstehen: durch Client-seitige Validierung (z.B. "Passwort min. 6 Zeichen" vor dem Submit) oder durch Fehler aus dem Context (z.B. "E-Mail stimmt nicht überein"). Beide landen in einem lokalen \`error\`-State. Das \`try/catch\` um den \`await login()\`-Aufruf fängt Fehler ab die der Context mit \`throw new Error(...)\` wirft. Der Fehler wird dann einfach als String in einer \`<p>\`-Zeile angezeigt.

**Nach erfolgreichem Login navigieren:**
Nach einem erfolgreichen Login oder einer Registrierung rufst du \`navigate('/dashboard')\` auf. Das ist programmatische Navigation mit dem \`useNavigate\`-Hook — der User landet sofort auf dem Dashboard ohne dass er auf einen Link klicken muss. Ein \`loading\`-State während des async-Aufrufs verhindert dass der User mehrfach absendet.`,
        keyPoints: [
          'try/catch um login()/register() — fängt Fehler aus AuthContext',
          'navigate("/dashboard") nach erfolgreichem Login',
          'Link zu /register für User ohne Account',
        ],
        learningGoals: [
          'Login- und Registrierungsformulare mit React bauen',
          'Formulardaten validieren und Fehler anzeigen',
          'Nach erfolgreichem Login zum Dashboard navigieren',
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
        id: 40,
        title: 'Projekt: Dashboard & API',
        category: 'Praxisprojekt',
        explanation: `Das Dashboard ist das Herzstück der App: es lädt Spielergebnisse und zeigt sie als Karten-Grid an. Für die Entwicklung ohne API-Key gibt es Mock-Daten die dieselbe Struktur wie die echte API haben — so kannst du das UI entwickeln ohne sofort einen Account beim API-Anbieter zu brauchen. Ein Toggle-Button wechselt zwischen Mock und Live.

**Loading- und Error-States sauber implementieren:**
Der Custom Hook \`useFetch\` gibt drei Werte zurück: \`data\`, \`loading\` und \`error\`. Im Template prüfst du alle drei Fälle: \`{loading && <p>Lade Spiele...</p>}\`, \`{error && <p>Fehler: {error}</p>}\`, und das Karten-Grid nur wenn Daten vorhanden sind. Außerdem gibst du eine leere-Liste-Meldung aus wenn der Fetch erfolgreich war aber keine Spiele zurückgegeben hat — drei verschiedene Zustände, sauber getrennt.

**Daten in wiederverwendbaren Komponenten:**
Die \`MatchCard\`-Komponente bekommt ein einzelnes \`match\`-Objekt als Prop und kümmert sich komplett um die Darstellung: Team-Logos, Spielstand, Liga-Name und Status-Badge. Das Dashboard iteriert mit \`.map()\` über die Spiele und rendert für jedes eine \`MatchCard\` — klare Trennung zwischen Daten laden (Dashboard) und Daten anzeigen (MatchCard).`,
        keyPoints: [
          'Echter API-Key von api-football.com — kostenloser Plan verfügbar',
          'Mock-Daten als Fallback für Entwicklung ohne Key',
          'Karten-Grid mit CSS Grid/Flex',
          'Status "FT" = Abgepfiffen, "1H"/"2H" = Laufend',
        ],
        learningGoals: [
          'Daten von einer API im Dashboard laden und anzeigen',
          'Loading- und Error-States sauber implementieren',
          'Daten in wiederverwendbaren Komponenten darstellen',
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
        id: 41,
        title: 'Projekt: App.tsx — Router zusammenbauen',
        category: 'Praxisprojekt',
        explanation: `In \`App.tsx\` fließen alle Teile der App zusammen: Router-Konfiguration, Layout-Wrapper, öffentliche Routen und geschützte Routen. Diese Datei ist der zentrale Ort wo du auf einen Blick siehst wie die gesamte Anwendung strukturiert ist. In \`main.tsx\` werden \`BrowserRouter\` und \`AuthProvider\` um die App gewickelt — so stehen Navigation und Auth-State überall zur Verfügung.

**Öffentliche und geschützte Routen verschachteln:**
Die Routen-Struktur verwendet **verschachtelte Routes**: \`<Route element={<Layout />}>\` ist der äußere Wrapper der den Header für alle Seiten liefert. Darin gibt es öffentliche Routen (\`/login\`, \`/register\`) und einen \`<Route element={<PrivateRoute />}>\`-Block für geschützte Routen. Dieser Block enthält \`/dashboard\` — nur eingeloggte User kommen hier rein, alle anderen werden zum Login weitergeleitet.

**Den fertigen Router der gesamten Anwendung:**
Die Root-URL \`/\` und alle unbekannten URLs werden per \`<Navigate to="/login" replace />\` zum Login weitergeleitet. Das \`replace\` verhindert dass diese Weiterleitungen im Browser-Verlauf landen. Die vollständige Kette ist: \`BrowserRouter\` → \`AuthProvider\` → \`App\` → \`Routes\` → \`Layout\` → \`PrivateRoute\` → Seite. Jede Ebene hat eine klare Verantwortung.`,
        keyPoints: [
          'Verschachtelte Routes: Layout als Wrapper für alle Seiten',
          'PrivateRoute schützt /dashboard',
          'Navigate to="/login": Root-URL leitet zum Login',
        ],
        learningGoals: [
          'Alle Routen und Provider in App.tsx zusammenführen',
          'Öffentliche und geschützte Routen korrekt verschachteln',
          'Den fertigen Router der gesamten Anwendung verstehen',
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





