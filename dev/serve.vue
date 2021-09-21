<template>
  <div>
    <inputs />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import Inputs from "./component-tests/Inputs.vue";

export default defineComponent({
  components: { Inputs },
  name: "ServeDev"
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
