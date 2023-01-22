import { describe, it, expect } from "vitest";
import { formatDate, getBgClass, getColors } from "@/composables/card";

describe("Composables - getBgClass", () => {
  const color = "green";
  const isLighten = false;
  const n = 4;
  it("pass 1 param, should return color background class name", () => {
    expect(getBgClass(color)).toEqual(`bg-green-lighten-1`);
  });
  it("pass 2 param, should return color background class name", () => {
    expect(getBgClass(color, isLighten)).toEqual(`bg-green-darken-1`);
  });
  it("pass 3 param, should return color background class name", () => {
    expect(getBgClass(color, isLighten, n)).toEqual(`bg-green-darken-4`);
  });
});

describe("Composables - getColors", () => {
  it("should return valid colors", () => {
    const colors = ["green", "blue", "purple", "pink"];
    expect(getColors()).toEqual(colors);
  });
});

describe("Composables - format date", () => {
  const currentTime = new Date().getTime();
  it("should return local format date string", () => {
    expect(formatDate(currentTime)).toEqual(
      new Date(currentTime).toLocaleString()
    );
  });
  it("should return N/A", () => {
    expect(formatDate()).toEqual("N/A");
  });
});
