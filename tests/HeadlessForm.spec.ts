/* eslint-disable vue/one-component-per-file */
import { ComponentPublicInstance, defineComponent, nextTick, ref } from "vue";
import { mount, shallowMount } from "@vue/test-utils";
import { HeadlessButton, HeadlessForm, HeadlessInput, InputError, InputField } from "../src/entry.esm";

test("render slot properly", () => {
  const wrapper = shallowMount(HeadlessForm, {
    slots: {
      default: "<div>Test</div>"
    }
  });
  expect(wrapper.text()).toContain("Test");
});

test("no errors on submit", async () => {
  const Form = defineComponent({
    components: {
      InputField,
      HeadlessInput,
      InputError,
      HeadlessButton,
      HeadlessForm
    },
    template: `
          <headless-form>
          <headless-input>
            <input-field/>
            <input-error/>
            <headless-button type="submit">Submit</headless-button>
          </headless-input>
          </headless-form>
        `
  });

  const wrapper = mount(Form, { attachTo: "body" });

  await wrapper.find("button").trigger("click");
  await nextTick();
  const vm = wrapper.getComponent(HeadlessForm).vm as ComponentPublicInstance<{ errorCount: number }>;
  expect(vm.errorCount == 0).toBeTruthy();
});

const Form = defineComponent({
  components: {
    InputField,
    HeadlessInput,
    InputError,
    HeadlessButton,
    HeadlessForm
  },
  template: `
      <headless-form>
      <headless-input v-model="model" :rules="failRule" name="test" id="test">
        <input-field/>
        <input-error/>
        <headless-button type="submit"/>
      </headless-input>
      </headless-form>
    `,
  setup() {
    const model = ref(null);

    function failRule() {
      return false;
    }

    return { model, failRule };
  }
});

test("error on wrong submit", async () => {
  const wrapper = mount(Form, { attachTo: "body" });
  await wrapper.find("button").trigger("click");
  await nextTick();
  const vm = wrapper.getComponent(HeadlessForm).vm as ComponentPublicInstance<{ errorCount: number }>;
  expect(vm.errorCount).toEqual(1);
});

test("error present in the dom", async () => {
  const wrapper = mount(Form, { attachTo: "body" });
  await wrapper.find("button").trigger("click");
  await nextTick();
  await nextTick();
  expect(wrapper.text()).toEqual("test is not valid.");
});
