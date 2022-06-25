import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import type { InjectionKey } from "vue";
import { HAccordion, HAccordionContent, HAccordionToggle } from "../";
import injectDefined from "@/utilities/inject-defined";

const accordion = defineComponent({
  components: {
    HAccordion,
    HAccordionContent,
    HAccordionToggle
  },
  props: {
    openByDefault: { type: Boolean, default: false }
  },
  template: `
    <HAccordion id="test_id" :animation-delay="700" :open-by-default="openByDefault">
      <HAccordionToggle> Toggle </HAccordionToggle>
        <HAccordionContent>
          <h1>Content Block</h1>
      </HAccordionContent>
    </HAccordion>
      `
});

describe("acordion", () => {
  it("should be open by default", () => {
    const wrapper = mount(accordion, { props: { openByDefault: true }, attachTo: "body" });
    expect(wrapper.text().includes("Content Block")).toBeTruthy();
  });

  it("should be closed by default", () => {
    const wrapper = mount(accordion, { props: { openByDefault: false }, attachTo: "body" });
    expect(wrapper.text().includes("Content Block")).toBeFalsy();
  });

  it("should open on click", async () => {
    const wrapper = mount(accordion, { props: { openByDefault: false }, attachTo: "body" });
    await wrapper.find("button").trigger("click");
    expect(wrapper.text().includes("Content Block")).toBeTruthy();
  });

  it("should close on click", async () => {
    vi.useFakeTimers();
    const wrapper = mount(accordion, { props: { openByDefault: true }, attachTo: "body" });
    await wrapper.find("button").trigger("click");
    vi.runAllTimers();
    await nextTick();
    expect(wrapper.text().includes("Content Block")).toBeFalsy();
  });

  it("should still be closing/animating", async () => {
    const wrapper = mount(accordion, { props: { openByDefault: true }, attachTo: "body" });
    await wrapper.find("button").trigger("click");
    await nextTick();
    expect(wrapper.text().includes("Content Block")).toBeTruthy();
  });

  it("should have content visible form the start", async () => {
    const wrapper = mount(accordion, { props: { openByDefault: false }, attachTo: "body" });
    await wrapper.find("button").trigger("click");
    await nextTick();
    expect(wrapper.text().includes("Content Block")).toBeTruthy();
  });
});

describe("variable injection", () => {
  it("should error out", () => {
    const key: InjectionKey<string> = Symbol("test");
    expect(() => injectDefined(key)).toThrowError(/defined/);
  });
});

describe("accordion accessibility", () => {
  it("should have an aria-expanded of false", async () => {
    const wrapper = mount(accordion, { props: { openByDefault: false }, attachTo: "body" });
    expect(wrapper.find("button").attributes()).toMatchObject({ "aria-expanded": "false", id: "test_id_toggle" });
  });

  it("should have an aria-expanded of true and the respective aria-controls", async () => {
    const wrapper = mount(accordion, { props: { openByDefault: true }, attachTo: "body" });
    expect(wrapper.find("button").attributes()).toMatchObject({
      "aria-expanded": "true",
      id: "test_id_toggle",
      "aria-controls": "test_id"
    });
  });

  it("should have an the correct labelledby attribute", async () => {
    const wrapper = mount(accordion, { props: { openByDefault: true }, attachTo: "body" });
    expect(wrapper.find("div[role='region']").attributes()).toMatchObject({
      "aria-labelledby": "test_id_toggle",
      id: "test_id"
    });
  });
});
