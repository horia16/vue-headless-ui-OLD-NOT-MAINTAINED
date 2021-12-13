<template>
  <teleport to="body">
    <div
      v-if="open"
      :style="[
        style,
        !fullScreen ? { top: 0, left: 0, position: 'fixed', width: '100vw', height: `${height}px`, zIndex } : {}
      ]"
      :class="dialogClass"
    >
      <slot />
    </div>
  </teleport>
</template>
<script lang="ts">
export default {
  name: "HeadlessDialog"
};
</script>
<script setup lang="ts">
import { useDialogModel } from "@/hooks/dialog";
import { dialogKeys } from "@/injection-keys/dialog";
import { onBeforeUnmount, onMounted, provide, ref, computed, StyleValue, PropType } from "vue";
const props = defineProps({
  zIndex: { type: Number, default: 100 },
  modelValue: { type: Boolean, default: null },
  fullScreen: { type: Boolean, default: false },
  class: { type: [String, Object, Array], default: undefined },
  style: { type: [String, Object, Array] as PropType<StyleValue>, default: "" }
});
const dialogClass = computed(() => props.class);
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();
const height = ref(window.innerHeight);
const { value: open, id } = useDialogModel(props, emit);
provide(dialogKeys.Id, id);
provide(dialogKeys.Open, open);
function updateHeight() {
  height.value = window.innerHeight;
}
onMounted(() => {
  window.addEventListener("resize", updateHeight);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateHeight);
});
</script>
