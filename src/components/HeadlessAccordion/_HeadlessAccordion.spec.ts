/* eslint-disable vue/one-component-per-file */
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import HeadlessAccordion from "./HeadlessAccordion.vue";
import AccordionContent from "./AccordionContent.vue";
import AccordionToggle from "./AccordionToggle.vue";

const accordion = defineComponent({
  components: {
    HeadlessAccordion,
    AccordionContent,
    AccordionToggle
  },
  props: {
    openByDefault: { type: Boolean, default: false }
  },
  template: `
    <div>
      <HeadlessAccordion :animation-delay="700" :open-by-default="openByDefault">
      <div>
        <AccordionToggle> Test Button </AccordionToggle>
      </div>
      <AccordionContent>
        <h1>Content Block</h1>
      </AccordionContent>
      </HeadlessAccordion>
    </div>
    `
});

test("Accordion: open by default", async () => {
  const wrapper = mount(accordion, { props: { openByDefault: true }, attachTo: "body" });
  expect(wrapper.text().includes("Content Block")).toBeTruthy();
});

test("Accordion: closed by default", async () => {
  const wrapper = mount(accordion, { props: { openByDefault: false }, attachTo: "body" });
  expect(wrapper.text().includes("Content Block")).toBeFalsy();
});

test("Accordion: open on click", async () => {
  const wrapper = mount(accordion, { props: { openByDefault: false }, attachTo: "body" });
  await wrapper.find("button").trigger("click");
  expect(wrapper.text().includes("Content Block")).toBeTruthy();
});

test("Accordion: close on click", async () => {
  jest.useFakeTimers();
  const wrapper = mount(accordion, { props: { openByDefault: true }, attachTo: "body" });
  await wrapper.find("button").trigger("click");
  // Run the timeout and wait for the next tick
  jest.runAllTimers();
  await nextTick();
  expect(wrapper.text().includes("Content Block")).toBeFalsy();
});

test("Accordion: not closed yet", async () => {
  const wrapper = mount(accordion, { props: { openByDefault: true }, attachTo: "body" });
  await wrapper.find("button").trigger("click");
  expect(wrapper.text().includes("Content Block")).toBeTruthy();
});
