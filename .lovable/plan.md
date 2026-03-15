

## Piano: Rimuovere PLACEHOLDER_CHARACTERS e usare i dati dal JSON

### Modifiche

**1. `src/hooks/useArchive.ts`** — Esporre `characters` dal return:
- Aggiungere `const characters = data?.character_lens?.characters ?? [];` 
- Aggiungerlo al return object

**2. `src/pages/Index.tsx`**:
- Rimuovere import di `PLACEHOLDER_CHARACTERS`
- Estrarre `characters` da `useArchive()`
- Passare `characters` a `CharacterSelectScreen` invece di `PLACEHOLDER_CHARACTERS`
- Aggiornare il tipo di `CharacterOption` in `setSelectedCharacter` (ora include `id` e `axes`)

**3. `src/components/CharacterSelectScreen.tsx`**:
- Rimuovere completamente `PLACEHOLDER_CHARACTERS` e il suo export
- Aggiornare `CharacterOption` per corrispondere a `CharacterLensEntry`: `{ id: number, name: string, axes: string[], assessment_archetype: string }`
- Il campo mostrato sotto il nome resta `assessment_archetype`

Nessun altro cambiamento necessario — la logica degli assi in `CHARACTER_AXES` e il resto del rendering restano invariati.

