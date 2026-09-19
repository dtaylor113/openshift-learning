import { motion, AnimatePresence } from 'framer-motion';
import { ZOOM_LEVELS } from './types';
import type { ZoomLevel, ExplainMode } from './types';

interface InfoPanelProps {
  level: ZoomLevel;
  currentIndex: number;
  totalLevels: number;
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
  onNavigate: (index: number) => void;
}

export function InfoPanel({ level, currentIndex, totalLevels, mode, onModeChange, onNavigate }: InfoPanelProps) {
  const content = level[mode];

  return (
    <div className="info-panel">
      {/* Mode toggle */}
      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === 'beginner' ? 'active' : ''}`}
          onClick={() => onModeChange('beginner')}
        >
          🌱 Beginner
        </button>
        <button
          className={`mode-btn ${mode === 'expert' ? 'active' : ''}`}
          onClick={() => onModeChange('expert')}
        >
          ⚡ Expert
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${level.id}-${mode}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="info-content"
        >
          {/* Clickable level stepper */}
          <div className="level-stepper">
            {Array.from({ length: totalLevels }).map((_, i) => (
              <button
                key={i}
                className={`step-dot ${i === currentIndex ? 'active' : ''} ${i < currentIndex ? 'visited' : ''}`}
                style={{
                  backgroundColor: i === currentIndex ? level.color : undefined,
                }}
                onClick={() => onNavigate(i)}
                title={ZOOM_LEVELS[i].label}
              />
            ))}
          </div>

          <div className="level-badge" style={{ backgroundColor: level.color }}>
            Level {currentIndex + 1}
          </div>

          <h2 className="level-title" style={{ color: level.color }}>
            {level.label}
          </h2>

          <p className="level-description">{content.description}</p>

          <ul className="level-details">
            {content.details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                {detail}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      <div className="nav-buttons">
        <button
          className="nav-btn prev-btn"
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          ← Previous Level
        </button>
        <button
          className="nav-btn next-btn"
          onClick={() => onNavigate(currentIndex + 1)}
          disabled={currentIndex === totalLevels - 1}
          style={{
            backgroundColor: currentIndex < totalLevels - 1 ? level.color : undefined,
          }}
        >
          Next Level →
        </button>
      </div>

      <div className="scroll-hint">
        {currentIndex < totalLevels - 1 && (
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓ scroll to advance
          </motion.span>
        )}
      </div>
    </div>
  );
}
