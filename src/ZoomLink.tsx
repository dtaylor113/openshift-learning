/**
 * Visual indicator for clickable drill-down zones in SVG scenes.
 *
 * Preferred usage: pass the parent rect's bounds and it auto-positions
 * in the top-right corner with proper inset padding.
 *
 *   <ZoomLink parentX={35} parentY={303} parentW={90} parentH={22} />
 *
 * Fallback: pass explicit x, y for manual placement.
 */
export function ZoomLink(props: {
  x?: number;
  y?: number;
  size?: number;
  parentX?: number;
  parentY?: number;
  parentW?: number;
  parentH?: number;
}) {
  const size = props.size ?? 6;
  const diameter = size * 2 + 2;

  let cx: number;
  let cy: number;

  if (props.parentX != null && props.parentY != null && props.parentW != null && props.parentH != null) {
    // Auto-position: top-right corner, inset by half the diameter + 2px padding
    cx = props.parentX + props.parentW - diameter / 2 - 2;
    cy = props.parentY + props.parentH / 2;
  } else {
    cx = (props.x ?? 0);
    cy = (props.y ?? 0);
  }

  return (
    <g opacity="0.8">
      <circle cx={cx} cy={cy} r={size + 1} fill="#E3F2FD" stroke="#42A5F5" strokeWidth="1.2" />
      {/* Magnifier lens */}
      <circle cx={cx - 1} cy={cy - 1} r={size * 0.45} fill="none" stroke="#1565C0" strokeWidth="1.3" />
      {/* Magnifier handle */}
      <line
        x1={cx - 1 + size * 0.35} y1={cy - 1 + size * 0.35}
        x2={cx - 1 + size * 0.7} y2={cy - 1 + size * 0.7}
        stroke="#1565C0" strokeWidth="1.3" strokeLinecap="round"
      />
    </g>
  );
}
