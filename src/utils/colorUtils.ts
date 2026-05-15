const PALETTE = [
  '#3B82F6', // blue
  '#10B981', // emerald
  '#8B5CF6', // violet
  '#F59E0B', // amber
  '#EF4444', // red
  '#06B6D4', // cyan
  '#EC4899', // pink
  '#84CC16', // lime
  '#F97316', // orange
  '#6366F1', // indigo
];

let colorIndex = 0;

export function nextPatientColor(): string {
  const color = PALETTE[colorIndex % PALETTE.length];
  colorIndex += 1;
  return color;
}

export function resetColorIndex(): void {
  colorIndex = 0;
}
