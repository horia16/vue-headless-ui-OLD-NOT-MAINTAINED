<template>
  <teleport to="body">
    <div
      v-bind="context.attrs"
      v-if="isOpen"
      :style="{ top: 0, left: 0, position: 'fixed', width: '100vw', height: `${height}px`, zIndex }"
    >
      <slot />
    </div>
  </teleport>
</template>
<script lang="ts">
import { useDialogModel } from "@/hooks/dialog";
import { defineComponent, onBeforeUnmount, onMounted, provide, ref } from "vue";

export default defineComponent({
  name: "HeadlessDialog",
  props: {
    zIndex: { type: Number, default: 100 },
    modelValue: { type: Boolean, default: null },
  },
  inheritAttrs: false,
  setup(props, context) {
    const height = ref(window.innerHeight);
    const { value: isOpen, id } = useDialogModel(props, context);
    provide("id", id);
    provide("state", isOpen);

    function updateHeight() {
      height.value = window.innerHeight;
    }

    onMounted(() => {
      window.addEventListener("resize", updateHeight);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateHeight);
    });
    return { height, isOpen, context };
  },
});
</script>
