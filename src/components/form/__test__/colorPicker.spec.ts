import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ColorPicker from "@/components/form/ColorPicker.vue";
import { getColors } from "@/composables/card";

describe("ColorPicker.vue", () => {
  it("should render color list", () => {
    const wrapper = mount(ColorPicker, {
      props: { modelValue: "green" },
    });
    expect(wrapper.findAll("li").length).toBe(getColors().length);
  });
});
