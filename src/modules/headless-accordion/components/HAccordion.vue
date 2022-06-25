<script lang="ts" setup>
import keys from "../keys";
import randomString from "@/utilities/random-string";

const props = defineProps({
  id: {
    type: String,
    default: undefined
  },
  modelValue: {
    type: Boolean,
    default: undefined
  },
  openByDefault: {
    type: Boolean,
    default: false
  },
  animationDelay: {
    type: Number,
    default: 0
  },
  transitionCurve: {
    type: String,
    default: "cubic-bezier(0.4, 0, 0.2, 1)"
  }
});

const emit = defineEmits<(e: "update:modelValue", value: boolean) => void>();
const accordionId = computed(() => {
  return props.id ? `${props.id}` : `accordion_${randomString()}`;
});
const internalState = ref(props.openByDefault);
const open = computed({
  get: () => (props.modelValue === undefined ? internalState.value : props.modelValue),
  set: (newValue) => {
    if (props.modelValue === undefined) {
      internalState.value = newValue;
    } else {
      emit("update:modelValue", newValue);
    }
  }
});
const animationDelay = computed(() => props.animationDelay);
const transitionCurve = computed(() => props.transitionCurve);

function toggleAccordion() {
  open.value = !open.value;
}

provide(keys.ID, accordionId);
provide(keys.OPEN, open);
provide(keys.ANIMATION_DELAY, animationDelay);
provide(keys.TRANSITION_CURVE, transitionCurve);
provide(keys.TOGGLE_ACCORDION, toggleAccordion);
</script>
<template>
  <slot :open="open" :component-id="accordionId" :toggle-accordion="toggleAccordion"></slot>
</template>
