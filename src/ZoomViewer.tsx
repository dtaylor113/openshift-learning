import { motion, AnimatePresence } from 'framer-motion';
import type { ExplainMode } from './types';
import { ZOOM_LEVELS } from './types';
import { AppScene, ContainerScene, PodScene, NodeScene, ClusterScene, OpenShiftScene, OcmScene } from './scenes';
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
  { component: NodeScene,      viewBox: '5 0 490 410',     scale: 0.82 },
  { component: ClusterScene,   viewBox: '8 4 500 405',     scale: 0.92 },
  { component: OpenShiftScene, viewBox: '5 4 490 390',     scale: 1.0 },
  { component: OcmScene,       viewBox: '5 2 480 415',     scale: 1.0 },
];

interface ZoomViewerProps {
  currentIndex: number;
  direction: number;
  mode: ExplainMode;
  onDeepDive?: (tab?: string) => void;
  onNavigate?: (levelIndex: number) => void;
}

export function ZoomViewer({ currentIndex, direction, mode, onDeepDive, onNavigate }: ZoomViewerProps) {
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
          {ZOOM_LEVELS[currentIndex].id === 'openshift' && (
            <div className="scene-info-banner">
              ℹ️ {mode === 'beginner'
                ? 'Most clusters managed by OCM are OpenShift (OCP) clusters — including ROSA and OSD. This level shows what OpenShift adds on top of Kubernetes. The specific cluster "flavor" (ROSA, OSD, bare-metal) determines who manages it and where it runs.'
                : 'OCP (OpenShift Container Platform) is the common base for ROSA, OSD, and self-managed clusters. The platform layer shown here (Routes, OAuth, SCCs, OLM, RHCOS) is identical across all deployment models — the difference is operational: who manages the control plane and infrastructure.'}
            </div>
          )}
          <svg
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            className="scene-svg"
          >
            <SceneComponent mode={mode} onDeepDive={onDeepDive} onNavigate={onNavigate} />
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
