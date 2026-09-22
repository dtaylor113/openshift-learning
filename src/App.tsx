import { useState, useCallback, useRef, useEffect } from 'react';
import { Telescope, BookOpen } from 'lucide-react';
import { ZOOM_LEVELS } from './types';
import type { ExplainMode } from './types';
import { ZoomViewer } from './ZoomViewer';
import { InfoPanel } from './InfoPanel';
import { Minimap } from './Minimap';
import { DeepDive } from './DeepDive';
import type { DeepDiveTab } from './DeepDive';
import { GlossaryProvider, useGlossary } from './GlossaryContext';
import './App.css';

    type View = 'explorer' | 'deep-dive';

const DEEP_DIVE_TABS = ['overview', 'rosa', 'osd', 'assisted', 'local', 'ocp-console'] as const;
const EXPLORER_LEVELS = ZOOM_LEVELS.map(l => l.id);

type RosaVariant = 'classic' | 'hcp' | 'hyperfleet';

function parseHash(): { view: View; levelId?: string; tab?: DeepDiveTab; rosaVariant?: RosaVariant } {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return { view: 'explorer' };
  if (hash === 'hyperfleet') return { view: 'deep-dive', tab: 'rosa', rosaVariant: 'hyperfleet' };
  if (DEEP_DIVE_TABS.includes(hash as DeepDiveTab)) return { view: 'deep-dive', tab: hash as DeepDiveTab };
  if (hash === 'deep-dive') return { view: 'deep-dive', tab: 'overview' };
  if (EXPLORER_LEVELS.includes(hash)) return { view: 'explorer', levelId: hash };
  return { view: 'explorer' };
}

function App() {
  const initial = parseHash();
  const [view, setView] = useState<View>(initial.view);
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initial.levelId) {
      const idx = ZOOM_LEVELS.findIndex(l => l.id === initial.levelId);
      return idx >= 0 ? idx : ZOOM_LEVELS.length - 1;
    }
    return ZOOM_LEVELS.length - 1;
  });
  const [direction, setDirection] = useState(1);
  const [mode, setMode] = useState<ExplainMode>('beginner');
  const isTransitioning = useRef(false);
  const scrollAccumulator = useRef(0);

  const SCROLL_THRESHOLD = 120;

  const navigateTo = useCallback((targetIndex: number) => {
    if (isTransitioning.current) return;
    if (targetIndex === currentIndex) return;
    if (targetIndex < 0 || targetIndex >= ZOOM_LEVELS.length) return;
    isTransitioning.current = true;
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setCurrentIndex(targetIndex);
    scrollAccumulator.current = 0;
    setTimeout(() => {
      isTransitioning.current = false;
    }, 700);
  }, [currentIndex]);

  const [deepDiveTab, setDeepDiveTab] = useState<DeepDiveTab>(initial.tab || 'overview');
  const [rosaVariant, setRosaVariant] = useState<RosaVariant | undefined>(initial.rosaVariant);
  const openDeepDive = useCallback((tab?: string) => {
    const t = (tab as DeepDiveTab) || 'overview';
    setDeepDiveTab(t);
    setRosaVariant(undefined);
    setView('deep-dive');
    window.location.hash = t;
  }, []);
  const backToExplorer = useCallback(() => {
    setView('explorer');
    window.location.hash = ZOOM_LEVELS[currentIndex].id;
  }, [currentIndex]);

  // Sync hash when explorer level changes
  useEffect(() => {
    if (view === 'explorer') {
      window.location.hash = ZOOM_LEVELS[currentIndex].id;
    }
  }, [view, currentIndex]);

  // Handle browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash();
      if (parsed.view === 'deep-dive') {
        setView('deep-dive');
        setDeepDiveTab(parsed.tab || 'overview');
        setRosaVariant(parsed.rosaVariant);
      } else {
        setView('explorer');
        if (parsed.levelId) {
          const idx = ZOOM_LEVELS.findIndex(l => l.id === parsed.levelId);
          if (idx >= 0) setCurrentIndex(idx);
        }
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (view !== 'explorer') return;
      e.preventDefault();
      if (isTransitioning.current) return;

      scrollAccumulator.current += e.deltaY;

      if (scrollAccumulator.current > SCROLL_THRESHOLD) {
        navigateTo(currentIndex + 1);
      } else if (scrollAccumulator.current < -SCROLL_THRESHOLD) {
        navigateTo(currentIndex - 1);
      }
    },
    [view, currentIndex, navigateTo]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (view !== 'explorer') return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        navigateTo(currentIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateTo(currentIndex - 1);
      }
    },
    [view, currentIndex, navigateTo]
  );

  const currentLevel = ZOOM_LEVELS[currentIndex];
  const breadcrumb = [...ZOOM_LEVELS].reverse().slice(0, ZOOM_LEVELS.length - currentIndex);

  return (
    <div
      className="app"
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ backgroundColor: view === 'explorer' ? currentLevel.bgColor : '#F5F5F5' }}
    >
      <header className="app-header">
        <div className="header-left">
          <h1>
            <Telescope size={22} className="logo-icon" />
            OpenShift Explorer
          </h1>
          {view === 'explorer' ? (
            <nav className="breadcrumb" aria-label="Zoom level path">
              {breadcrumb.map((level, i) => {
                const originalIndex = ZOOM_LEVELS.indexOf(level);
                const isActive = originalIndex === currentIndex;
                return (
                  <span key={level.id} className="breadcrumb-item">
                    {i > 0 && <span className="breadcrumb-sep">›</span>}
                    <button
                      className={`breadcrumb-label ${isActive ? 'active' : ''}`}
                      style={{ color: isActive ? level.color : undefined }}
                      onClick={() => navigateTo(originalIndex)}
                    >
                      {level.label}
                    </button>
                  </span>
                );
              })}
            </nav>
          ) : (
            <nav className="breadcrumb" aria-label="Deep dive path">
              <span className="breadcrumb-item">
                <button className="breadcrumb-label" onClick={backToExplorer}>
                  ← Explorer
                </button>
                <span className="breadcrumb-sep">›</span>
                <button className="breadcrumb-label" onClick={() => { backToExplorer(); navigateTo(ZOOM_LEVELS.length - 1); }}>
                  OCM
                </button>
                <span className="breadcrumb-sep">›</span>
                <span className="breadcrumb-label active" style={{ color: '#EE0000' }}>
                  Cluster Types Deep Dive
                </span>
              </span>
            </nav>
          )}
        </div>
      </header>

      {view === 'explorer' ? (
        <main className="app-main">
          <div className="viewer-area">
            <Minimap currentIndex={currentIndex} onNavigate={navigateTo} mode={mode} />
            <ZoomViewer currentIndex={currentIndex} direction={direction} mode={mode} onDeepDive={currentLevel.id === 'ocm' ? openDeepDive : undefined} onNavigate={navigateTo} />
          </div>
          <InfoPanel
            level={currentLevel}
            currentIndex={currentIndex}
            totalLevels={ZOOM_LEVELS.length}
            mode={mode}
            onModeChange={setMode}
            onNavigate={navigateTo}
          />
        </main>
      ) : (
        <main className="app-main rosa-main">
          <DeepDive mode={mode} onModeChange={setMode} initialTab={deepDiveTab} initialRosaVariant={rosaVariant} />
        </main>
      )}
      <GlossaryFooter />
    </div>
  );
}

function GlossaryFooter() {
  const { state } = useGlossary();
  return (
    <>
      {state.term && (
        <div className="glossary-bar">
          <BookOpen size={14} className="glossary-footer-icon" />
          <strong>{state.term}</strong> — {state.definition}
        </div>
      )}
      <footer className="app-footer">by Dave Taylor</footer>
    </>
  );
}

function AppWithProvider() {
  return (
    <GlossaryProvider>
      <App />
    </GlossaryProvider>
  );
}

export default AppWithProvider;
