<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { VueHeadlessUiSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  VueHeadlessUiSample,
  // }
});
</script>

<template>
  <div id="app">
    <vue-headless-ui-sample />
  </div>
</template>
