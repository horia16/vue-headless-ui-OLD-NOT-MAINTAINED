<template>
  <div>
    <headless-input v-model="testData.input1" rules="required">
      <input-label text="Test Label" />
      <input-field />
      <input-error />
    </headless-input>
    <headless-input v-model="testData.input2" rules="required">
      <input-label text="Test Label" />
      <select-field
        :options="[
          { name: 'test', value: 'test' },
          { name: 'test2', value: 'test2' },
        ]"
      />
      <input-error />
    </headless-input>

    <headless-input element="fieldset" v-model="testData.input3" rules="required">
      <input-label text="Test Label" element="legend" />
      <input-label isWrapper>
        <radio-field value="test" :index="1" />
        Test label
      </input-label>
      <input-label isWrapper>
        <radio-field value="test2" :index="2" />
        Test label 2
      </input-label>
      <input-error />
    </headless-input>

    <headless-input element="fieldset" v-model="testData.input4" rules="required">
      <input-label text="Test Label" element="legend" />
      <input-label isWrapper>
        <checkbox-field value="test" :index="1" />
        Test checkbox label
      </input-label>
      <input-label isWrapper>
        <checkbox-field value="test2" :index="2" />
        Test checkbox label 2
      </input-label>
      <input-error />
    </headless-input>

    <headless-input element="fieldset" v-model="testData.input5" rules="required">
      <input-label text="Test Label" element="legend" />
      <input-label isWrapper>
        <checkbox-field value="test" :index="1" />
        Test checkbox truthy/falsy
      </input-label>
      <input-error />
    </headless-input>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "ServeDev",
  components: {},
  setup() {
    const testData = reactive({
      input1: null,
      input2: null,
      input3: null,
      input4: [],
      input5: null,
    });

    return {
      testData,
    };
  },
});
</script>
