import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface GlossaryState {
  term: string | null;
  definition: string | null;
}

interface GlossaryContextValue {
  state: GlossaryState;
  show: (term: string, definition: string) => void;
  hide: () => void;
}

const GlossaryContext = createContext<GlossaryContextValue>({
  state: { term: null, definition: null },
  show: () => {},
  hide: () => {},
});

export function GlossaryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GlossaryState>({ term: null, definition: null });

  const show = useCallback((term: string, definition: string) => {
    setState({ term, definition });
  }, []);

  const hide = useCallback(() => {
    setState({ term: null, definition: null });
  }, []);

  return (
    <GlossaryContext.Provider value={{ state, show, hide }}>
      {children}
    </GlossaryContext.Provider>
  );
}

export function useGlossary() {
  return useContext(GlossaryContext);
}
