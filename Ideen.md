# Feature-Ideen für den React-Kurs

## Direkt praktisch

- **Zwei-Panel-Ansicht** — Code links, Output rechts nebeneinander statt Tab-Wechsel; besonders im Editier-Modus sieht man sofort die Wirkung einer Änderung
- **Vollbild für den Editor** — "⤢ Expand"-Button der Monaco auf Vollbild ausblendet; mehr Platz zum Coden
- **Tastaturkürzel** — `←` / `→` für Lektionswechsel, `E` für Editier-Modus; macht Navigation deutlich flüssiger
- **"Zurück zur letzten Lektion"** — beim erneuten Öffnen automatisch zur zuletzt besuchten Lektion springen statt immer bei Lektion 1 zu starten
- **URL-Routing** — `?lektion=15` in der URL; direkter Link zu einer Lektion teilbar — "Schau mal Lektion 17" und der Kollege landet direkt dort
- **Console-Ausgabe im Output-Tab** — `console.log()` Ausgaben aus dem Live-Preview sichtbar machen; sehr nützlich zum Debuggen im Editier-Modus ohne Browser-DevTools
- **Download-Button im Editier-Modus** — "💾 Download" lädt die bearbeitete Datei als `.tsx` / `.css` herunter; User kann Code direkt ins eigene Projekt übernehmen

## Für den Lerneffekt

- **Quiz pro Lektion** — 2–3 Multiple-Choice-Fragen als Daten in `lessons.ts` hinterlegt, erscheinen nach dem Code-Bereich; fördert Retention
- **Schwierigkeitsgrad-Badge** — "Einsteiger / Mittel / Fortgeschritten" pro Lektion, sichtbar in Sidebar und Lektionskopf
- **"Nach dieser Lektion kannst du..."** — explizite Lernziele ganz oben in jeder Lektion vor dem Erklärungstext; gibt Orientierung bevor man einsteigt
- **Verwandte Lektionen** — 2–3 Links am Ende einer Lektion zu thematisch verwandten Lektionen (z.B. bei useState → State Lifting, useEffect)
- **Kapitel-Fortschritt in der Sidebar** — neben jedem Kapitel-Titel anzeigen wie viele Lektionen abgeschlossen sind, z.B. `3 / 8`

## Kleinigkeiten mit Wirkung

- **Schriftgröße** — `A-` / `A+` Toggle im Header, Präferenz im `localStorage` speichern; Barrierefreiheit

## Bewusst nicht umgesetzt

- **Dark Mode** — wird nicht kommen
- **Suchfunktion** — nicht relevant für diesen Anwendungsfall
- **Claude/ChatGPT Chat-Seitenleiste** — kein öffentlicher OAuth für Drittanbieter; würde API Key oder Backend-Proxy benötigen
