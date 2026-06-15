// Typen für den gesamten Kurs

export interface CodeFile {
  name: string;      // Dateiname z.B. "App.tsx"
  language: string;  // "tsx" | "ts" | "css" | "json"
  code: string;      // Der eigentliche Code-Inhalt
}

export interface Lesson {
  id: number;
  title: string;
  category: string;
  explanation: string;         // Erklärungstext der Lektion
  files: CodeFile[];           // Code-Dateien mit Tab-Ansicht
  keyPoints?: string[];        // Stichpunkte zum Merken
  preview?: string;            // HTML-String für den Output-Tab
}

export interface Chapter {
  title: string;
  lessons: Lesson[];
}
