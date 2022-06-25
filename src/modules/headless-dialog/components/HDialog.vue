<script lang="ts" setup>
import transitionProps from "@/utilities/transition-props";
import type { StyleValue } from "vue";
import useDialog from "../composables/use-dialog";
import keys from "../keys";

const props = defineProps({
  id: { type: String, default: undefined },
  zIndex: { type: Number, default: 100 },
  modelValue: { type: Boolean, default: null },
  fullScreen: { type: Boolean, default: true },
  class: { type: [String, Object, Array], default: undefined },
  style: { type: [String, Object, Array], default: undefined },
  ...transitionProps
});

const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

const className = computed(() => props.class);
const height = ref(window.innerHeight);

const { open, dialogId } = useDialog(props, emit);

const styleValue = computed(() => {
  return [
    props.style,
    props.fullScreen
      ? { top: 0, left: 0, position: "fixed", width: "100vw", height: `${height.value}px`, zIndex: props.zIndex }
      : {}
  ] as StyleValue;
});

function updateHeight() {
  height.value = window.innerHeight;
}

onMounted(() => {
  window.addEventListener("resize", updateHeight);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateHeight);
});

provide(keys.ID, dialogId);
provide(keys.OPEN, open);
</script>

<template>
  <teleport to="body">
    <transition
      :name="transitionName"
      :css="transitionCss"
      :type="transitionType"
      :duration="transitionDuration"
      :mode="transitionMode"
      :appear="transitionAppear"
      :enter-from-class="transitionEnterFromClass"
      :enter-active-class="transitionEnterActiveClass"
      :enter-to-class="transitionEnterToClass"
      :appear-from-class="transitionAppearFromClass"
      :appear-active-class="transitionAppearActiveClass"
      :appear-to-class="transitionAppearToClass"
      :leave-from-class="transitionLeaveFromClass"
      :leave-active-class="transitionLeaveActiveClass"
      :leave-to-class="transitionLeaveToClass"
    >
      <div v-if="open" :style="styleValue" :class="className">
        <slot />
      </div>
    </transition>
  </teleport>
</template>
