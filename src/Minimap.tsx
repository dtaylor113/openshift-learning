import { motion } from 'framer-motion';
import { ZOOM_LEVELS } from './types';
import type { ExplainMode } from './types';

interface MinimapProps {
  currentIndex: number;
  onNavigate: (index: number) => void;
  mode: ExplainMode;
}

const ANALOGIES = [
  { icon: '🍽️', label: 'Dish (on the menu)' },
  { icon: '🥡', label: 'Meal kit (recipe + all ingredients)' },
  { icon: '👨‍🍳', label: 'Cook station (kit + helper tools)' },
  { icon: '🍳', label: 'Kitchen (stations, shared ovens)' },
  { icon: '🏪', label: 'The restaurant (kitchens + front desk)' },
  { icon: '🏢', label: 'Franchise (security, POS, health inspections)' },
  { icon: '🏛️', label: 'Corporate HQ (oversees all locations)' },
];

export function Minimap({ currentIndex, onNavigate, mode }: MinimapProps) {
  const levels = [...ZOOM_LEVELS].reverse();
  const totalLevels = levels.length;

  const mapSize = 270;
  const padding = 12;
  const innerSize = 44;
  const availableSpace = (mapSize - innerSize) / 2;
  const layerStep = availableSpace / totalLevels;

  return (
    <div className="minimap-column">
      {/* Analogy legend — fills the space above the map */}
      {mode === 'beginner' && (
        <div className="analogy-legend">
          <div className="analogy-legend-title">🍽️ Restaurant Analogy</div>
          {[...ZOOM_LEVELS].reverse().map((level, ri) => {
            const i = ZOOM_LEVELS.length - 1 - ri;
            return (
              <button
                key={level.id}
                className={`analogy-badge ${i === currentIndex ? 'active' : ''}`}
                style={{
                  borderColor: i === currentIndex ? level.color : 'transparent',
                  color: i === currentIndex ? level.color : '#888',
                }}
                onClick={() => onNavigate(i)}
              >
                <span className="analogy-icon">{ANALOGIES[i].icon}</span>
                <span className="analogy-text">
                  <strong>{level.mapLabel}</strong> = {ANALOGIES[i].label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="minimap">
        <div className="minimap-label">Architecture Map</div>
        <svg
          viewBox={`0 0 ${mapSize} ${mapSize}`}
          width={mapSize}
          height={mapSize}
          className="minimap-svg"
        >
          {levels.map((level, i) => {
            const actualIndex = totalLevels - 1 - i;
            const isCurrent = actualIndex === currentIndex;
            const isInner = actualIndex < currentIndex;
            const isOuter = actualIndex > currentIndex;

            const offset = padding + i * layerStep;
            const size = mapSize - 2 * offset;

            return (
              <g
                key={level.id}
                onClick={() => onNavigate(actualIndex)}
                style={{ cursor: 'pointer' }}
              >
                <motion.rect
                  x={offset}
                  y={offset}
                  width={size}
                  height={size}
                  rx={Math.max(4, 14 - i * 1.5)}
                  fill={isCurrent ? level.color : 'transparent'}
                  fillOpacity={isCurrent ? 0.18 : 0}
                  stroke={level.color}
                  strokeWidth={isCurrent ? 2.5 : isInner ? 1.5 : 1.2}
                  strokeOpacity={isCurrent ? 1 : isInner ? 0.75 : 0.55}
                  strokeDasharray={isOuter ? '4 3' : 'none'}
                  animate={{
                    strokeWidth: isCurrent ? 2.5 : isInner ? 1.5 : 1.2,
                    fillOpacity: isCurrent ? 0.18 : 0,
                    strokeOpacity: isCurrent ? 1 : isInner ? 0.75 : 0.55,
                  }}
                  transition={{ duration: 0.4 }}
                />
                <rect
                  x={offset}
                  y={offset}
                  width={size}
                  height={layerStep + 2}
                  fill="transparent"
                />
                <motion.text
                  x={offset + 5}
                  y={offset + 13}
                  fontSize={isCurrent ? 11 : 9}
                  fontWeight={isCurrent ? 'bold' : '600'}
                  fill={level.color}
                  fillOpacity={isCurrent ? 1 : isInner ? 0.8 : 0.6}
                  animate={{
                    fillOpacity: isCurrent ? 1 : isInner ? 0.8 : 0.6,
                  }}
                >
                  {level.mapLabel}
                </motion.text>
              </g>
            );
          })}

          <motion.circle
            cx={mapSize / 2}
            cy={mapSize / 2}
            r={5}
            fill="#4FC3F7"
            animate={{ r: [5, 7, 5], opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={mapSize / 2}
            cy={mapSize / 2}
            r={10}
            fill="none"
            stroke="#4FC3F7"
            strokeWidth={1}
            animate={{ r: [10, 16, 10], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
          <text
            x={mapSize / 2}
            y={mapSize / 2 + 18}
            textAnchor="middle"
            fontSize={9}
            fill="#4FC3F7"
            fontWeight="bold"
            fontFamily="monospace"
          >
            myapp
          </text>
        </svg>
      </div>
    </div>
  );
}
