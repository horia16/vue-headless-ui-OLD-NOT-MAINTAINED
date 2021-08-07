<template>
  <div>
    <headless-input v-model="model" rules="required">
      <input-label text="Test Label" />
      <input-field />
      <input-error />
    </headless-input>
    <headless-input v-model="model2" rules="required">
      <input-label text="Test Label" />
      <select-field
        :options="[
          { name: 'test', value: 'test' },
          { name: 'test2', value: 'test2' },
        ]"
      />
      <input-error />
    </headless-input>
  </div>
</template>
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
    const model2 = ref("");
    return {
      model,
      model2,
    };
  },
});
</script>
