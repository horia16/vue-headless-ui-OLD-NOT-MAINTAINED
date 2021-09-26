<template>
  <div>
    <headless-input v-model="data.default">
      <input-label>
        Default no rules
      </input-label>
      <input-field />
      <input-error />
    </headless-input>

    <headless-input v-model="data.defaultRequired" rules="required">
      <input-label>
        Default required
      </input-label>
      <input-field />
      <input-error />
    </headless-input>

    <headless-input v-model="data.selectDefault" :options="selectOptions">
      <input-label>
        Select default (name, value pair)
      </input-label>
      <select-field />
      <input-error />
    </headless-input>

    <headless-input v-model="data.selectObject" :options="selectOptionsObjects">
      <input-label>
        Select, object as value
      </input-label>
      <select-field placeholder="test" />
      <input-error />
    </headless-input>

    <headless-input v-model="data.textarea">
      <input-label>
        Text area example
      </input-label>
      <textarea-field />
      <input-error />
    </headless-input>

    <headless-input v-model="data.checkbox" group rules="required">
      <input-label legend>
        Hardcoded default string array
      </input-label>
      <input-label wrapper>
        <checkbox-field value="test" />
        Test 1
      </input-label>
      <input-label wrapper>
        <checkbox-field value="test2" />
        Test 1
      </input-label>
      <input-error />
    </headless-input>

    <headless-input v-model="data.checkboxObject" group rules="required">
      <input-label legend>
        Hardcoded object array
      </input-label>
      <input-label wrapper>
        <checkbox-field :value="{ name: 'Object1' }" />
        Obj 1
      </input-label>
      <input-label wrapper>
        <checkbox-field :value="{ name: 'Object2' }" />
        Obj 2
      </input-label>
      <input-error />
    </headless-input>

    <headless-input v-model="data.radio" group rules="required">
      <input-label legend>
        Hardcoded default string
      </input-label>
      <input-label wrapper>
        <radio-field value="test" />
        Test 1
      </input-label>
      <input-label wrapper>
        <radio-field value="test2" />
        Test 2
      </input-label>
      <input-error />
    </headless-input>

    <headless-input v-model="data.radioObject" group rules="required">
      <input-label legend>
        Hardcoded object
      </input-label>
      <input-label wrapper>
        <radio-field :value="{ name: 'Object1' }" />
        Obj 1
      </input-label>
      <input-label wrapper>
        <radio-field :value="{ name: 'Object2' }" />
        Obj 2
      </input-label>
      <input-error />
    </headless-input>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import HeadlessInput from "@/lib-components/form/HeadlessInput/HeadlessInput.vue";
import InputLabel from "@/lib-components/form/HeadlessInput/elements/InputLabel.vue";
import InputField from "@/lib-components/form/HeadlessInput/fields/InputField.vue";
import InputError from "@/lib-components/form/HeadlessInput/elements/InputError.vue";
import SelectField from "@/lib-components/form/HeadlessInput/fields/SelectField.vue";
import TextareaField from "@/lib-components/form/HeadlessInput/fields/TextareaField.vue";
import CheckboxField from "@/lib-components/form/HeadlessInput/fields/CheckboxField.vue";
import RadioField from "@/lib-components/form/HeadlessInput/fields/RadioField.vue";

export default defineComponent({
  components: {
    RadioField,
    CheckboxField,
    TextareaField,
    SelectField,
    InputError,
    InputField,
    InputLabel,
    HeadlessInput
  },
  setup() {
    const selectOptions = [
      { name: "Pizza", value: "Pizza" },
      { name: "Burger", value: "Burger" },
      { name: "Wrap", value: "Wrap" },
      { name: "Salad", value: "Salad" }
    ];
    const selectOptionsObjects = [
      { name: "Pizza", value: { name: "Pizza", healthy: false } },
      { name: "Burger", value: { name: "Burger", healthy: false } },
      { name: "Wrap", value: { name: "Wrap", healthy: false } },
      { name: "Salad", value: { name: "Salad", healthy: true } }
    ];

    const data = reactive({
      default: null,
      defaultRequired: null,
      selectDefault: null,
      selectObject: null,
      textarea: null,
      checkbox: [],
      checkboxObject: [],
      radio: null,
      radioObject: null
    });

    return { data, selectOptions, selectOptionsObjects };
  }
});
</script>
