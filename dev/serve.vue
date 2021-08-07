<script lang="ts">
import { defineComponent, ref } from "vue";
// Uncomment import and local "components" registration if library is not registered globally.
// import { VueHeadlessUiSample } from '@/entry.esm';

export default defineComponent({
  components: {},
  name: "ServeDev",
  // components: {
  //  VueHeadlessUiSample,
  // }
  setup() {
    const model = ref("");
    return {
      model,
    };
  },
});
</script>

<template>
  <div id="app">
    <headless-input v-model="model">
      <input-label text="Test Label" />
      <input-field />
      <input-error />
    </headless-input>
  </div>
</template>
