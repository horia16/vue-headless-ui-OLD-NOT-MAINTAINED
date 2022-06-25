<script lang="ts" setup>
import useDialogContent from "../composables/use-dialog-content";
const wrapper = ref<HTMLElement | null>(null);
const { id } = useDialogContent(wrapper);
</script>
<template>
  <div :id="id" ref="wrapper" aria-modal="true">
    <slot />
  </div>
</template>
