import { motion, AnimatePresence } from 'framer-motion';
import type { ExplainMode } from './types';
import { AppScene, ContainerScene, PodScene, NodeScene, ClusterScene, OpenShiftScene } from './scenes';
import type { SceneProps } from './types';
import type { ComponentType } from 'react';

interface SceneConfig {
  component: ComponentType<SceneProps>;
  viewBox: string;
  /** Scale from 0–1: how much of the max-width this scene should use.
   *  Level 1 (App) is small, Level 6 (OpenShift) fills the space. */
  scale: number;
}

const SCENES: SceneConfig[] = [
  { component: AppScene,       viewBox: '100 40 310 340',  scale: 0.45 },
  { component: ContainerScene, viewBox: '65 30 370 315',   scale: 0.55 },
  { component: PodScene,       viewBox: '5 0 490 385',     scale: 0.85 },
  { component: NodeScene,      viewBox: '5 0 490 395',     scale: 0.82 },
  { component: ClusterScene,   viewBox: '8 4 485 390',     scale: 0.92 },
  { component: OpenShiftScene, viewBox: '5 4 490 390',     scale: 1.0 },
];

interface ZoomViewerProps {
  currentIndex: number;
  direction: number;
  mode: ExplainMode;
}

export function ZoomViewer({ currentIndex, direction, mode }: ZoomViewerProps) {
  const { component: SceneComponent, viewBox, scale } = SCENES[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      scale: dir > 0 ? 2.5 : 0.3,
      opacity: 0,
    }),
    center: {
      scale: 1,
      opacity: 1,
    },
    exit: (dir: number) => ({
      scale: dir > 0 ? 0.3 : 2.5,
      opacity: 0,
    }),
  };

  return (
    <div className="zoom-viewer">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="scene-container"
          style={{ maxWidth: `${scale * 900}px` }}
        >
          <svg
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            className="scene-svg"
          >
            <SceneComponent mode={mode} />
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
