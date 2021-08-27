<template>
  <div>
    <headless-tabs v-model="tab">
      <headless-tab-switches>
        <headless-tab-switch> Preview </headless-tab-switch>
        <headless-tab-switch> Code </headless-tab-switch>
      </headless-tab-switches>
      <headless-tab>a</headless-tab>
      <headless-tab>b</headless-tab>
    </headless-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  name: "ServeDev",
  setup() {
    const tab = ref(0);
    return { tab };
  },
});
</script>

<style>
@import url(https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css);
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
