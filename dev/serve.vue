<template>
  <div>
    <headless-form @valid="testSubmit" @error="testError">
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

      <headless-input v-model="testData.input6" rules="required">
        <input-label text="Test Label" />
        <textarea-field />
        <input-error />
      </headless-input>

      <h1>
        Dynamic Inputs tests
      </h1>
      <headless-input element="fieldset" v-model="testData.dynamicRadio" rules="required">
        <input-label text="Test Label" element="legend" />
        <input-label
          isWrapper
          v-for="(option, index) in [
            { name: 'test', value: 'test' },
            { name: 'test2', value: 'test2' },
            { name: 'test3', value: 'test3' },
            { name: 'test4', value: 'test4' },
          ]"
          :key="index"
        >
          <radio-field :value="option.value" :index="index" />
          {{ option.name }}
        </input-label>
        <input-error />
      </headless-input>
      <headless-input element="fieldset" v-model="testData.dynamicCheckbox" rules="required">
        <input-label text="Test Label" element="legend" />
        <input-label
          isWrapper
          v-for="(option, index) in [
            { name: 'test', value: 'test' },
            { name: 'test2', value: 'test2' },
            { name: 'test3', value: 'test3' },
            { name: 'test4', value: 'test4' },
          ]"
          :key="index"
        >
          <checkbox-field :value="option.value" :index="index" />
          {{ option.name }}
        </input-label>
        <input-error />
      </headless-input>
      <button>Submit</button>
    </headless-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "ServeDev",
  setup() {
    const testData = reactive({
      input1: null,
      input2: null,
      input3: null,
      input4: [],
      input5: null,
      input6: null,
      dynamicRadio: null,
      dynamicCheckbox: [],
    });

    function testSubmit() {
      console.log("valid");
    }
    function testError() {
      console.log("error");
    }
    return {
      testData,
      testSubmit,
      testError,
    };
  },
});
</script>
