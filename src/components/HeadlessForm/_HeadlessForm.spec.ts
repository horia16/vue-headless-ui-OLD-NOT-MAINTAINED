/* eslint-disable vue/one-component-per-file */
import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import HeadlessInput from "../HeadlessInput/HeadlessInput.vue";
import TextField from "../HeadlessInput/fields/TextField.vue";
import InputError from "../HeadlessInput/shared/InputError.vue";
import InputLabel from "../HeadlessInput/shared/InputLabel.vue";
import HeadlessForm from "./HeadlessForm.vue";

function required(val: string) {
  if (val && val.length > 0) return true;
  return "Rendered Error";
}

const form = defineComponent({
  components: {
    HeadlessInput,
    TextField,
    InputError,
    InputLabel,
    HeadlessForm
  },
  props: {
    openByDefault: { type: Boolean, default: false }
  },
  setup() {
    const test = ref("Input Block Value");
    const submitted = ref(false);
    const error = ref(false);

    function onSubmit() {
      submitted.value = true;
    }

    return {
      test,
      required,
      submitted,
      onSubmit,
      error
    };
  },
  template: `
      <div>
      <HeadlessForm @valid="onSubmit" @error="error = true">
        <HeadlessInput v-model="test" :rules="required">
            <InputLabel>Label Test</InputLabel>
            <TextField />
            <InputError/>
        </HeadlessInput>
        <button type="submit">Sub</button>
      </HeadlessForm>
      </div>
      `
});

test("Form: submit", async () => {
  const wrapper = mount(form, { attachTo: "body" });
  await wrapper.find("button").element.click();
  // Set an arbitrary timeout for the and wait for the form to update
  await new Promise(r => setTimeout(r, 300));
  expect(wrapper.vm.submitted === true).toBeTruthy();
});

test("Form: error", async () => {
  const wrapper = mount(form, { attachTo: "body" });
  const inputElement = wrapper.find("input");
  // Fail the required rule
  await inputElement.setValue("");
  await wrapper.find("button").element.click();
  // Set an arbitrary timeout for the and wait for the form to update
  await new Promise(r => setTimeout(r, 300));
  expect(wrapper.vm.submitted === false).toBeTruthy();
  expect(wrapper.vm.error === true).toBeTruthy();
});
