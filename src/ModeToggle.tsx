import { BookOpen, Monitor } from 'lucide-react';
import type { ExplainMode } from './types';

interface ModeToggleProps {
  mode: ExplainMode;
  onModeChange: (mode: ExplainMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="mode-toggle">
      <button className={`mode-btn ${mode === 'beginner' ? 'active' : ''}`} onClick={() => onModeChange('beginner')}>
        <BookOpen size={14} color={mode === 'beginner' ? '#2E7D32' : undefined} /> Beginner
      </button>
      <button className={`mode-btn ${mode === 'expert' ? 'active' : ''}`} onClick={() => onModeChange('expert')}>
        <Monitor size={14} color={mode === 'expert' ? '#1565C0' : undefined} /> Expert
      </button>
    </div>
  );
}
