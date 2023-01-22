import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { describe, it, expect } from "vitest";
import LoginBox from "@/components/LoginBox.vue";

describe("LoginBox.vue", () => {
  const vuetify = createVuetify({ components, directives });

  it("should render login form", () => {
    const wrapper = mount(LoginBox, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.find("button").isVisible()).toBe(true);
  });
});
