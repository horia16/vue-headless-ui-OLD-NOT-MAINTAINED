<template>
  <slot :open="open" :accordionId="accordionId" :toggleAccordion="toggleAccordion"></slot>
</template>
<script lang="ts">
export default {
  name: "HeadlessAccordion"
};
</script>
<script setup lang="ts">
import { accordionKeys } from "@/injection-keys/accordion";
import { randomString } from "@/utils/random";
import { computed, ref, provide } from "vue";
const props = defineProps({
  id: { type: String, default: undefined },
  modelValue: { type: Boolean, default: undefined },
  openByDefault: { type: Boolean, default: false },
  animationDelay: { type: Number, default: 0 },
  transitionCurve: { type: String, default: undefined }
});
const emit = defineEmits<(e: "update:modelValue", value: boolean) => void>();
const accordionId = computed(() => {
  return props.id ? `${props.id}` : `accordion-${randomString()}`;
});
const internalState = ref(props.openByDefault);
const open = computed({
  get: () => (props.modelValue === undefined ? internalState.value : props.modelValue),
  set: newValue =>
    props.modelValue === undefined ? (internalState.value = newValue) : emit("update:modelValue", newValue)
});
function toggleAccordion() {
  open.value = !open.value;
}
provide(accordionKeys.Id, accordionId);
provide(accordionKeys.ToggleAccordion, toggleAccordion);
provide(accordionKeys.Open, open);
provide(
  accordionKeys.AnimationDelay,
  computed(() => props.animationDelay)
);
provide(
  accordionKeys.TransitionCurve,
  computed(() => props.transitionCurve)
);
</script>
