<template>
  <div>
    <h1>
      Inputs Test
    </h1>
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
        Dynamic Inputs Test
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
    <h1>
      Icon Test
    </h1>
    <div>
      <h4>Iconify</h4>
      <headless-icon name="noto:test-tube" iconify />
    </div>
    <div>
      <h4>Font Icon</h4>
      <headless-icon name="mdi mdi-home" font />
    </div>
    <div>
      <h4>Inline Svg</h4>
      <headless-icon
        name="alien"
        html="<svg
        xmlns='http://www.w3.org/2000/svg'
        xmlns:xlink='http://www.w3.org/1999/xlink'
        aria-hidden='true'
        role='img'
        width='100%'
        height='100%'
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 72 72'
      >
        <path
          fill='#597B91'
          d='M67.9 30.9v-1.2C67.2 13.2 53.6 0 37 0C20.3 0 6.7 13.2 6.1 29.7v2.9C7.1 55.3 28.1 72 37 72c8.8 0 29.8-16.7 30.9-39.4c-.1-.5 0-1.1 0-1.7z'
        />
        <path
          fill='#2B3B47'
          d='M26.3 33.4c-1.3-3.5-5-5.6-8.7-4.6c-3.7 1-5.9 4.6-5.3 8.4h-.1l2.7 9.9c1 3.9 5.1 6.2 9 5.2s6.2-5.1 5.2-9l-2.8-9.9z'
        />
        <path
          fill='#2B3B47'
          d='M61.6 37.1c.7-3.7-1.6-7.4-5.3-8.4c-3.7-1-7.5 1.1-8.7 4.6h-.1l-2.7 9.9c-1 3.9 1.3 7.9 5.2 9c3.9 1 7.9-1.3 9-5.2l2.6-9.9z'
        />
        <path
          fill='#2B3B47'
          d='M37 64.5c-3.2 0-6-1.6-7.6-4.3c-.2-.4-.2-.8 0-1.2c.2-.4.6-.6 1.1-.6h13.2c.4 0 .8.2 1.1.6c.2.4.2.8 0 1.2c-1.8 2.7-4.7 4.3-7.8 4.3z'
        /></svg
      >"
      />
    </div>

    <headless-accordion self>
      <accordion-header #default="{toggle}" style="display:flex;border:1px solid black">
        <button @click="toggle">Toggle</button>
      </accordion-header>
      <accordion-content style="border:1px solid black">
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </accordion-content>
    </headless-accordion>
    <headless-accordion self openOnCreate>
      <accordion-header #default="{toggle}" style="display:flex;border:1px solid black">
        <button @click="toggle">Toggle</button>
      </accordion-header>
      <accordion-content style="border:1px solid black">
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </accordion-content>
    </headless-accordion>
    <h1>Content Smootness test</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  components: {},
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
<style>
@import url(https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css);
</style>
