import { useState, useEffect, useCallback } from 'react';

export interface FragmentContent {
  text: string;
  date: string;
  author: string;
  notes: string;
}

export interface Fragment {
  id: string;
  type: 'documento' | 'audio' | 'oggetto' | 'testimonianza' | 'diario';
  title: string;
  locked: boolean;
  unlocksFrom: string | null;
  icon: string;
  position: { x: number; y: number };
  content: FragmentContent;
  reveals: string;
}

export interface ArchiveData {
  meta: {
    title: string;
    subtitle: string;
    archivist: string;
    intro_text: string;
    player: { name: string; axis: string };
  };
  fragments: {
    mandatory: Fragment[];
    optional: Fragment[];
  };
  endings: {
    surface: { title: string; text: string };
    deep: { title: string; text: string };
  };
}

const STORAGE_KEY = 'archivio-6080-state';

interface ArchiveState {
  openedIds: string[];
}

function loadState(): ArchiveState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { openedIds: [] };
}

function saveState(state: ArchiveState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

  const allMandatoryOpened = mandatoryIds.every(id => openedIds.includes(id));
  const optionalOpenedCount = optionalIds.filter(id => openedIds.includes(id)).length;

  const resetProgress = useCallback(() => {
    setOpenedIds([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    data,
    loading,
    allFragments,
    isOpened,
    isUnlocked,
    openFragment,
    openedCount,
    totalCount,
    allMandatoryOpened,
    optionalOpenedCount,
    resetProgress,
  };
}
