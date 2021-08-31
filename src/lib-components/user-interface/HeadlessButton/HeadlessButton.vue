<template>
  <button>
    <slot>
      {{ label }}
    </slot>
    <span v-if="loading">
      <slot name="loading">
        Loading...
      </slot>
    </span>
  </button>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import HeadlessIcon from "../HeadlessIcon.vue";

export default defineComponent({
  components: {HeadlessIcon},
  name: "HeadlessButton",
  props: {
    label: {type: [String, Number], default: null},
    loading: {type: Boolean, default: false},
  },
  setup() {
  },
});
</script>
