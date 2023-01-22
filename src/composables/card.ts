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

export function formatDate(datetime: number | undefined): string {
  if (datetime) {
    return new Date(datetime).toLocaleString();
  }
  return "N/A";
}
