import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { HeadlessAccordion, HeadlessAccordionContent, HeadlessAccordionToggle } from "../../src";

test("should show the accordion content", async () => {
  const accordion = defineComponent({
    components: {
      HeadlessAccordion,
      HeadlessAccordionContent,
      HeadlessAccordionToggle
    },
    template: `
      <div>
        <HeadlessAccordion :animation-delay="700" open-by-default>
        <div>
          <HeadlessAccordionToggle> Test Button </HeadlessAccordionToggle>
        </div>
        <HeadlessAccordionContent>
          <h1>test</h1>
        </HeadlessAccordionContent>
        </HeadlessAccordion>
      </div>
      `
  });
  const wrapper = mount(accordion, { attachTo: "body" });

  expect(wrapper.find("h1").text()).toEqual("test");
});
