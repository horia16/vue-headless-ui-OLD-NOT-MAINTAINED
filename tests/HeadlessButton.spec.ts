import { shallowMount } from "@vue/test-utils";
// import HeadlessButton from "../../src/lib-components/user-interface/HeadlessButton/HeadlessButton.vue";
import { HeadlessButton } from "../src/entry.esm";
test("ToggleButton", () => {
  let wrapper = shallowMount(HeadlessButton, {
    slots: {
      default: "<div>Test</div>",
    },
    props: {
      loading: false,
      label: "Should be overriden by the slot",
    },
  });

  expect(wrapper.text()).toContain("Test");
});

// it("should render loading slot", () => {
//   let wrapper = shallowMount(HeadlessButton, {
//     slots: {
//       default: "<div class='slot'>Test</div>",
//       loading: "<div class='slot-loading'>Loading</div>",
//     },
//     props: {
//       loading: true,
//       label: "Should be overriden by the slot",
//     },
//   });

//   expect(wrapper.findAll(".slot-loading").length).to.equal(1);
// });

// it("should render label", () => {
//   let wrapper = shallowMount(HeadlessButton, {
//     props: {
//       loading: false,
//       label: "Test Label",
//     },
//   });
//   expect(wrapper.element.textContent == "Test Label").to.be.true;
// });
