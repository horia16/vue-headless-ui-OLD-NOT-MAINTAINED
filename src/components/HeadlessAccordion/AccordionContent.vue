<template>
  <component
    :is="tag"
    v-if="state !== 'closed'"
    :id="accordionId"
    :class="contentClass"
    ref="wrapper"
    :aria-labelledby="`${accordionId}_toggle`"
    :style="[style, computedStyle]"
    role="region"
  >
    <slot :open="open" :toggleAccordion="toggleAccordion" />
  </component>
</template>
<script lang="ts">
export default {
  name: "AccordionContent"
};
</script>
<script setup lang="ts">
import { accordionKeys } from "@/injection-keys/accordion";
import { inject, Ref, ref, watch, computed, onUpdated, onMounted, nextTick } from "vue";
const props = defineProps({
  tag: { type: String, default: "div" },
  class: { type: [String, Object, Array], default: undefined },
  style: { type: [String, Object, Array], default: undefined }
});
const contentClass = computed(() => props.class);
const animationDelay = inject(accordionKeys.AnimationDelay);
const transitionCurve = inject(accordionKeys.TransitionCurve);
const open = inject(
  accordionKeys.Open,
  computed(() => false)
);
const accordionId = inject(accordionKeys.Id);
const toggleAccordion = inject(accordionKeys.ToggleAccordion);
const wrapper: Ref<HTMLElement | null> = ref(null);
const state = ref<"open" | "opening" | "closed" | "closing">(open?.value ? "open" : "closed");
const height = ref(0);
const displayHeight = ref<null | number>(open?.value ? null : 0);
const overflow = ref<string | undefined>("hidden");
const computedStyle = computed(() => ({
  height: displayHeight.value !== null ? `${displayHeight.value}px` : undefined,
  overflow: overflow.value,
  transition: `height ${animationDelay?.value}ms`,
  transitionTimingFunction: transitionCurve?.value
}));
// eslint-disable-next-line no-undef
let setOpenTimeout: NodeJS.Timeout | null = null;
// eslint-disable-next-line no-undef
let setClosedTimeout: NodeJS.Timeout | null = null;
watch(open, newVal => {
  if (newVal) {
    state.value = "opening";
    if (setClosedTimeout) clearTimeout(setClosedTimeout);
    setOpenTimeout = setTimeout(() => {
      state.value = "open";
    }, animationDelay?.value);
  } else {
    state.value = "closing";
    if (setOpenTimeout) clearTimeout(setOpenTimeout);
    setClosedTimeout = setTimeout(() => {
      state.value = "closed";
    }, animationDelay?.value);
  }
});

watch([state, height], () => {
  switch (state.value) {
    case "open":
      nextTick(() => {
        overflow.value = undefined;
        displayHeight.value = null;
      });
      break;
    case "opening":
      overflow.value = "hidden";
      nextTick(() => {
        displayHeight.value = height.value;
      });
      break;
    case "closed":
      nextTick(() => {
        displayHeight.value = 0;
        overflow.value = "hidden";
      });
      break;
    case "closing":
      displayHeight.value = height.value;
      overflow.value = "hidden";
      nextTick(() => {
        displayHeight.value = 0;
      });
      break;
  }
});
onMounted(() => {
  if (wrapper.value) height.value = wrapper.value.scrollHeight;
});
onUpdated(() => {
  if (wrapper.value) height.value = wrapper.value.scrollHeight;
  nextTick(() => {
    if (wrapper.value) height.value = wrapper.value.scrollHeight;
  });
});
</script>
