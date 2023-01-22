import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { describe, it, expect } from "vitest";
import TaskBoard from "@/components/TaskBoard.vue";

describe("TaskBoard.vue", () => {
  const vuetify = createVuetify({ components, directives });

  it("should render task board element", () => {
    const wrapper = mount(TaskBoard, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.find("#board").isVisible()).toBe(true);
  });
});
