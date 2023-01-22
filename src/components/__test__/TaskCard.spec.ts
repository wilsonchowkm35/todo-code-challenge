import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { describe, it, expect } from "vitest";
import TaskCard from "@/components/TaskCard.vue";

describe("TaskCard.vue", () => {
  const vuetify = createVuetify({ components, directives });
  const task = {
    id: "123",
    title: "test",
    description: "description",
    color: "green",
  };
  const wrapper = mount(TaskCard, {
    props: {
      modelValue: "123",
      task,
    },
    global: {
      plugins: [vuetify],
    },
  });

  it("should render card element", () => {
    expect(wrapper.find(".task-card").isVisible()).toBe(true);
  });

  it("should render title", () => {
    expect(wrapper.html()).toContain(task.title);
  });

  it("should render description", () => {
    expect(wrapper.html()).toContain(task.title);
  });

  it("should render card in specific color", () => {
    expect(wrapper.html()).toContain(task.color);
  });
});
