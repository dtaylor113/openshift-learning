/**
 * Inline SVG callout showing a restaurant analogy for beginner mode.
 * Rendered inside each scene's SVG at the bottom.
 */
export function AnalogyCallout({ x, y, width, text }: { x: number; y: number; width: number; text: string }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="22" rx="6" fill="#FFF9C4" stroke="#FDD835" strokeWidth="1" />
      <text x={x + 10} y={y + 15} fontSize="8" fill="#F57F17">
        🍽️ {text}
      </text>
    </g>
  );
}
