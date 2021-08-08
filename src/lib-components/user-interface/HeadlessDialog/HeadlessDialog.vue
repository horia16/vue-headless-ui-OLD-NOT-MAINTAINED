<template>
  <teleport to="body">
    <div v-if="isOpen" :style="{ position: 'fixed', width: '100vw', height: `${height}px`, zIndex }">
      <slot />
    </div>
  </teleport>
</template>
<script lang="ts">
import { useModel } from "@/hooks/input";
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";

export default defineComponent({
  name: "HeadlessDialog",
  props: {
    zIndex: { type: Number, default: 100 },
    modelValue: { type: Boolean, default: null },
  },
  setup(props, context) {
    const height = ref(window.innerHeight);
    const isOpen = useModel(props, context);

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
  },
});
</script>
