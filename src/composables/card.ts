export function getBgClass(
  color: string,
  isLighten: boolean = true,
  n: number = 1
): string {
  return `bg-${color}-${isLighten ? "lighten" : "darken"}-${n}`;
}

export function getColors(): string[] {
  return ["green", "blue", "purple", "pink"];
}
