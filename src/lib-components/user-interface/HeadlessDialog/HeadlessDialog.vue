<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      :style="!fullScreen ? { top: 0, left: 0, position: 'fixed', width: '100vw', height: `${height}px`, zIndex } : ''"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </teleport>
</template>
<script lang="ts">
import { useDialogModel } from "@/hooks/dialog";
import { injectionKeys } from "@/utils";
import { defineComponent, onBeforeUnmount, onMounted, provide, ref } from "vue";
export default defineComponent({
  name: "HeadlessDialog",
  props: {
    zIndex: { type: Number, default: 100 },
    modelValue: { type: Boolean, default: null },
    fullScreen: { type: Boolean, default: false }
  },
  inheritAttrs: false,
  setup(props, context) {
    const height = ref(window.innerHeight);
    const { value: isOpen, id } = useDialogModel(props, context);
    provide(injectionKeys.DIALOG.ID, id);
    provide(injectionKeys.DIALOG.IS_OPEN, isOpen);

    function updateHeight() {
      height.value = window.innerHeight;
    }

    onMounted(() => {
      window.addEventListener("resize", updateHeight);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateHeight);
    });
    return { height, isOpen };
  }
});
</script>
