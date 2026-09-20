/**
 * Visual indicator for clickable drill-down zones in SVG scenes.
 * Renders a small magnifier icon at the specified position.
 */
export function ZoomLink({ x, y, size = 7 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x + 4}, ${y - 4})`} opacity="0.7">
      <circle cx="0" cy="0" r={size} fill="#E3F2FD" stroke="#42A5F5" strokeWidth="1.2" />
      <text x={-size + 3} y={size - 3} fontSize={size + 2} fill="#1565C0">🔍</text>
    </g>
  );
}
