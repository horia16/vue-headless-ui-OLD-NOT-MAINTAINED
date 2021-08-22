<template>
  <form @submit="submit">
    <slot :submit="submit" :errors="errors" :errorCount="errorCount"> </slot>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useHeadlessForm from "@/hooks/form";
export default defineComponent({
  name: "HeadlessForm",
  props: {
    scrollToError: { type: Boolean, default: false },
  },
  setup(props, context) {
    const { submit, errors, errorCount } = useHeadlessForm(props, context);
    return { submit, errors, errorCount };
  },
});
</script>
