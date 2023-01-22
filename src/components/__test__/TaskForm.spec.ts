import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { describe, it, expect } from "vitest";
import TaskForm from "@/components/TaskForm.vue";
import type { Task } from "@/interfaces/task";

describe("TaskForm.vue", () => {
  const vuetify = createVuetify({ components, directives });

  // title="" description="" color="" @createTask="createTask"

  const wrapper = mount(TaskForm, {
    props: {
      title: "title",
      description: "",
      color: "",
      createTask: (task: Task) => {
        return task.title === "title";
        // console.log("task", task);
      },
    },
    global: {
      plugins: [vuetify],
    },
  });

  it("should render text input", () => {
    expect(wrapper.find("input").isVisible()).toBe(true);
  });

  it("should render submit button", () => {
    expect(wrapper.find("button").isVisible()).toBe(true);
  });
});
