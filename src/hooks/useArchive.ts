import { useState, useEffect, useCallback } from 'react';

export interface FragmentContent {
  text: string;
  date: string;
  author: string;
  notes: string | null;
}

export interface FragmentChallenge {
  axis: string;
  characters: string[];
  reveal: string;
  exclusive?: boolean;
}

export interface Fragment {
  id: string;
  type: string;
  title: string;
  locked: boolean;
  unlocksFrom: string | null;
  icon: string;
  position: { x: number; y: number };
  content: FragmentContent;
  reveals: string;
  challenges?: FragmentChallenge[];
}

export interface CharacterLensEntry {
  id: number;
  name: string;
  axes: string[];
  assessment_archetype: string;
}

export interface ArchiveData {
  meta: {
    title: string;
    subtitle: string;
    archivist: string;
    version?: string;
  };
  axes?: Record<string, {
    label: string;
    threshold: number | null;
    stat: string;
    characters: string[];
    note?: string;
  }>;
  fragments: {
    mandatory: Fragment[];
    optional: Fragment[];
  };
  endings: {
    surface: { text: string; trigger?: string; optional_found?: string };
    deep: { text: string; trigger?: string; optional_found?: string };
  };
  character_lens?: {
    description: string;
    characters: CharacterLensEntry[];
  };
}

const STORAGE_KEY = 'archivio-6080-state';

interface ArchiveState {
  openedIds: string[];
}

function loadState(): ArchiveState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { openedIds: [] };
}

function saveState(state: ArchiveState) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useArchive() {
  const [data, setData] = useState<ArchiveData | null>(null);
  const [openedIds, setOpenedIds] = useState<string[]>(loadState().openedIds);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/archive_data.json')
      .then(r => r.json())
      .then((d: ArchiveData) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    saveState({ openedIds });
  }, [openedIds]);

  const allFragments = data
    ? [...data.fragments.mandatory, ...data.fragments.optional]
    : [];

  const mandatoryIds = data ? data.fragments.mandatory.map(f => f.id) : [];
  const optionalIds = data ? data.fragments.optional.map(f => f.id) : [];

  const isOpened = useCallback((id: string) => openedIds.includes(id), [openedIds]);

  const isUnlocked = useCallback(
    (fragment: Fragment) => {
      if (!fragment.locked) return true;
      if (!fragment.unlocksFrom) return true;
      return openedIds.includes(fragment.unlocksFrom);
    },
    [openedIds]
  );

  const openFragment = useCallback(
    (id: string) => {
      setOpenedIds(prev => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      });
    },
    []
  );

  const openedCount = openedIds.length;
  const totalCount = allFragments.length;

  const mandatoryOpenedCount = mandatoryIds.filter(id => openedIds.includes(id)).length;
  const allMandatoryOpened = mandatoryOpenedCount === mandatoryIds.length && mandatoryIds.length > 0;
  const optionalOpenedCount = optionalIds.filter(id => openedIds.includes(id)).length;

  const resetProgress = useCallback(() => {
    setOpenedIds([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const characters = data?.character_lens?.characters ?? [];

  return {
    data,
    loading,
    allFragments,
    characters,
    isOpened,
    isUnlocked,
    openFragment,
    openedCount,
    totalCount,
    allMandatoryOpened,
    mandatoryOpenedCount,
    optionalOpenedCount,
    resetProgress,
  };
}
