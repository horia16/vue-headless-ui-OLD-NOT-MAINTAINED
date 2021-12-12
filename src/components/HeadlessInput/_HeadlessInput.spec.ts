/* eslint-disable vue/one-component-per-file */
import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import HeadlessInput from "./HeadlessInput.vue";
import SelectField from "./fields/SelectField.vue";
import TextField from "./fields/TextField.vue";
import TickboxField from "./fields/TickboxField.vue";
import InputError from "./shared/InputError.vue";
import InputLabel from "./shared/InputLabel.vue";

function required(val: string) {
  if (val && val.length > 0) return true;
  return "Rendered Error";
}

const input = defineComponent({
  components: {
    HeadlessInput,
    TextField,
    InputError,
    InputLabel
  },
  props: {
    openByDefault: { type: Boolean, default: false }
  },
  setup() {
    const test = ref("Input Block Value");

    return {
      test,
      required
    };
  },
  template: `
      <div>
       <HeadlessInput v-model="test" :rules="required">
          <InputLabel>Label Test</InputLabel>
          <TextField />
          <InputError/>
       </HeadlessInput>
      </div>
      `
});

test("Input: default model", async () => {
  const wrapper = mount(input, { attachTo: "body" });
  expect(wrapper.find("input").element.value === "Input Block Value").toBeTruthy();
});

test("Input: update model", async () => {
  const wrapper = mount(input, { attachTo: "body" });
  const inputElement = wrapper.find("input");
  inputElement.setValue("New Value");
  expect(wrapper.find("input").element.value === "New Value").toBeTruthy();
});

test("Input: label rendering", async () => {
  const wrapper = mount(input, { attachTo: "body" });
  expect(wrapper.find("label").text() === "Label Test").toBeTruthy();
});

const select = defineComponent({
  components: {
    HeadlessInput,
    SelectField,
    InputLabel,
    InputError
  },
  props: {
    openByDefault: { type: Boolean, default: false }
  },
  setup() {
    const test = ref("Input Block Value");
    const options = [
      { name: "1", value: "Input Block Value" },
      { name: "2", value: "Input Block Value Secondary" }
    ];
    return {
      test,
      options
    };
  },
  template: `
        <div>
         <HeadlessInput v-model="test" :options="options">
            <InputLabel text="Test Label" />
            <SelectField />
         </HeadlessInput>
        </div>
        `
});

test("Select: default model", async () => {
  const wrapper = mount(select, { attachTo: "body" });
  expect(wrapper.find("select").element.value === "Input Block Value").toBeTruthy();
});

test("Select: update model", async () => {
  const wrapper = mount(select, { attachTo: "body" });
  const selectElement = wrapper.find("select");
  selectElement.setValue("Input Block Value Secondary");
  expect(wrapper.find("select").element.value === "Input Block Value Secondary").toBeTruthy();
});

const checkbox = defineComponent({
  components: {
    HeadlessInput,
    TickboxField,
    InputLabel
  },
  props: {
    openByDefault: { type: Boolean, default: false }
  },
  setup() {
    const test = ref(true);
    return {
      test
    };
  },
  template: `
        <div>
         <HeadlessInput v-model="test" checkbox>
            <InputLabel text="Label" />
            <TickboxField />
         </HeadlessInput>
        </div>
        `
});

test("Checkbox: update model boolean", async () => {
  const wrapper = mount(checkbox, { attachTo: "body" });
  const checkboxElement = wrapper.find("input");
  checkboxElement.element.click();
  expect(wrapper.vm.test).toBeFalsy();
});

test("Label: Check fieldset context", async () => {
  const wrapper = mount(checkbox, { attachTo: "body" });
  expect(wrapper.find("legend")).toBeTruthy();
});
