<template>
  <form @submit="submit">
    <slot :errorCount="errorCount" :errors="errors" :submit="submit"></slot>
  </form>
</template>
<script lang="ts">
export default {
  name: "HeadlessForm"
};
</script>
<script setup lang="ts">
import useHeadlessForm from "@/hooks/from";
import { PropType } from "vue";

const props = defineProps({
  scrollToError: { type: Boolean, default: false },
  scrollOptions: {
    type: Object as PropType<{
      behavior?: "auto" | "smooth";
      block?: "center" | "end" | "nearest" | "start";
    }>,
    default: () => ({})
  }
});
const emit = defineEmits<{
  (e: "valid", value: Record<string, unknown>): void;
  (e: "error", value: Record<string, string | undefined>): void;
}>();
const { submit, errors, errorCount } = useHeadlessForm(props, emit);
</script>
