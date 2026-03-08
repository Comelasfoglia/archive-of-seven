

# Archivio — Anno 6080

Un'esperienza narrativa esplorativa dove il giocatore naviga frammenti lasciati da una figura scomparsa chiamata Sette. Estetica dark fantasy cristallina ispirata a She-Ra e artefatti anni '80–'90.

## Schermata 1 — Intro
- Fullscreen con sfondo caverna profonda (gradiente radiale scuro)
- Titolo "ARCHIVIO" in Cinzel maiuscolo con tracking larghissimo, colore crystal-violet
- Sottotitolo in Crimson Pro italic
- Cristallo SVG animato al centro con pulse lento e particelle di luce
- Testo introduttivo dal JSON
- Pulsante "APRI L'ARCHIVIO" stile runa incisa
- Transizione: dissolvenza + zoom-in del cristallo

## Schermata 2 — Mappa Costellazione
- Nodi disposti come costellazione su canvas SVG (posizioni in percentuale)
- Forme esagonali/rombo con bordi luminosi e glow differenziato per tipo:
  - Documenti: crystal-blue | Audio: crystal-gold | Oggetti: crystal-violet | Testimonianze: verde scuro | Diario: rosso mattone
- Stati: sbloccato (glow attivo), locked (dimmed, tratteggiato, tooltip "→ F1"), letto (segno runa)
- Linee SVG tratteggiate animate tra nodi collegati (stroke-dashoffset)
- Header fisso: nome personaggio + asse a sinistra, "ARCHIVIO" al centro, contatore frammenti a destra
- Footer minimale: "Esplora. Connetti. Ricorda."

## Schermata 3 — Frammento (Overlay Modale)
- Pannello centrale max 680px sopra mappa sfocata
- Bordi con angoli tagliati stile pietra incisa (CSS clip-path)
- Header: icona SVG tipo + ID + data in Space Mono
- Titolo in Cinzel, autore in Crimson Pro italic
- Corpo testo in Crimson Pro 18px, interlinea 1.8
- Note in blocco citazione con bordino sinistro crystal-violet
- Campo "reveals" appare dopo 5 secondi con timer JS — testo gold, italic, con simbolo runa
- Chiusura: X runa, click fuori, ESC

## Dati e Logica
- File `archive_data.json` con frammenti mandatory + optional, metadata, e testi finali
- Contenuti narrativi in italiano coerenti con l'ambientazione Anno 6080
- Stato di sblocco e lettura persistito in localStorage
- Sblocco progressivo: un frammento si sblocca solo dopo che `unlocksFrom` è stato aperto
- Contatore silenzioso senza animazioni celebrative
- Finale: nodo "FINE" oro pieno quando tutti i mandatory sono letti; testo finale varia in base agli opzionali trovati (soglia 6+)

## Estetica e Dettagli
- Font: Cinzel, Crimson Pro, Space Mono via Google Fonts
- Palette scura con glow cristallini — niente bordi arrotondati, tutto spigoloso e geometrico
- Icone SVG custom (esagoni, rombi, triangoli) — nessuna libreria standard
- Animazioni lente e rituali: pulse 3-4s sui nodi, fade-in con scale-up sui frammenti
- Cursore crosshair con alone luminoso CSS
- Elementi decorativi: angoli a runa sui pannelli, separatori con rune centrali
- Mobile: mappa scrollabile verticalmente; desktop: layout spaziale completo

