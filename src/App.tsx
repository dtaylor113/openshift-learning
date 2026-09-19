import { useState, useCallback, useRef } from 'react';
import { ZOOM_LEVELS } from './types';
import type { ExplainMode } from './types';
import { ZoomViewer } from './ZoomViewer';
import { InfoPanel } from './InfoPanel';
import { Minimap } from './Minimap';
import { RosaMap } from './RosaMap';
import './App.css';

type Track = 'explorer' | 'rosa';

function App() {
  const [track, setTrack] = useState<Track>('explorer');
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (track !== 'explorer') return;
      e.preventDefault();
      if (isTransitioning.current) return;

      scrollAccumulator.current += e.deltaY;

      if (scrollAccumulator.current > SCROLL_THRESHOLD) {
        navigateTo(currentIndex + 1);
      } else if (scrollAccumulator.current < -SCROLL_THRESHOLD) {
        navigateTo(currentIndex - 1);
      }
    },
    [track, currentIndex, navigateTo]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (track !== 'explorer') return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        navigateTo(currentIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateTo(currentIndex - 1);
      }
    },
    [track, currentIndex, navigateTo]
  );

  const currentLevel = ZOOM_LEVELS[currentIndex];
  const breadcrumb = ZOOM_LEVELS.slice(0, currentIndex + 1);

  return (
    <div
      className="app"
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ backgroundColor: track === 'explorer' ? currentLevel.bgColor : '#F5F5F5' }}
    >
      <header className="app-header">
        <div className="header-left">
          <h1>
            <span className="logo-icon">🔭</span>
            OpenShift Explorer
          </h1>
          {track === 'explorer' && (
            <nav className="breadcrumb" aria-label="Zoom level path">
              {breadcrumb.map((level, i) => (
                <span key={level.id} className="breadcrumb-item">
                  {i > 0 && <span className="breadcrumb-sep">›</span>}
                  <button
                    className={`breadcrumb-label ${i === currentIndex ? 'active' : ''}`}
                    style={{ color: i === currentIndex ? level.color : undefined }}
                    onClick={() => navigateTo(i)}
                  >
                    {level.label}
                  </button>
                </span>
              ))}
            </nav>
          )}
          {track === 'rosa' && (
            <span className="breadcrumb" style={{ color: '#888', fontSize: 11 }}>
              ROSA Cluster Architecture — who manages what
            </span>
          )}
        </div>
        <div className="header-right">
          <div className="track-toggle">
            <button
              className={`track-btn ${track === 'explorer' ? 'active' : ''}`}
              onClick={() => setTrack('explorer')}
            >
              🔭 Explorer
            </button>
            <button
              className={`track-btn ${track === 'rosa' ? 'active' : ''}`}
              onClick={() => setTrack('rosa')}
            >
              ☁️ ROSA Map
            </button>
          </div>
        </div>
      </header>

      {track === 'explorer' ? (
        <main className="app-main">
          <div className="viewer-area">
            <Minimap currentIndex={currentIndex} onNavigate={navigateTo} mode={mode} />
            <ZoomViewer currentIndex={currentIndex} direction={direction} mode={mode} />
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
          <RosaMap mode={mode} onModeChange={setMode} />
        </main>
      )}
    </div>
  );
}

export default App;
