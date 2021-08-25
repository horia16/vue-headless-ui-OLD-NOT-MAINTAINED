<template>
  <div>
    <test />
  </div>
</template>
<script lang="ts">
import Test from "../tests/unit/form/helpers/Test.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { Test },
  name: "ServeDev",
  setup() {
    return {};
  },
});
</script>

<style>
@import url(https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css);
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
