import { useState, useCallback, useRef } from 'react';
import { ZOOM_LEVELS } from './types';
import type { ExplainMode } from './types';
import { ZoomViewer } from './ZoomViewer';
import { InfoPanel } from './InfoPanel';
import { Minimap } from './Minimap';
import { DeepDive } from './DeepDive';
import './App.css';

type View = 'explorer' | 'deep-dive';

function App() {
  const [view, setView] = useState<View>('explorer');
  const [currentIndex, setCurrentIndex] = useState(ZOOM_LEVELS.length - 1);
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

  const openDeepDive = useCallback(() => setView('deep-dive'), []);
  const backToExplorer = useCallback(() => setView('explorer'), []);

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
            <span className="logo-icon">🔭</span>
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
          <DeepDive mode={mode} onModeChange={setMode} />
        </main>
      )}
      <footer className="app-footer">by Dave Taylor</footer>
    </div>
  );
}

export default App;
