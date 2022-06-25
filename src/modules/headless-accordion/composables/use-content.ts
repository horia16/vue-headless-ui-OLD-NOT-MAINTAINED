import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";
import type { Ref } from "vue";

export enum AccordionContentState {
  OPEN,
  OPENING,
  CLOSED,
  CLOSING
}

export default function (wrapper: Ref<HTMLElement | null>) {
  const animationDelay = injectDefined(keys.ANIMATION_DELAY);
  const transitionCurve = injectDefined(keys.TRANSITION_CURVE);
  const open = injectDefined(keys.OPEN);
  const accordionId = injectDefined(keys.ID);

  const state = ref<AccordionContentState>(open.value ? AccordionContentState.OPEN : AccordionContentState.CLOSED);
  const height = ref(0);
  const displayHeight = ref<null | number>(open?.value ? null : 0);
  const overflow = ref<string | undefined>("hidden");

  const computedStyle = computed(() => ({
    height: displayHeight.value !== null ? `${displayHeight.value}px` : undefined,
    overflow: overflow.value,
    transition: `height ${animationDelay?.value}ms`,
    transitionTimingFunction: transitionCurve?.value
  }));

  let setOpenTimeout: NodeJS.Timeout | null = null;
  let setClosedTimeout: NodeJS.Timeout | null = null;

  watch(open, (newVal) => {
    if (newVal) {
      state.value = AccordionContentState.OPENING;
      if (setClosedTimeout) clearTimeout(setClosedTimeout);
      setOpenTimeout = setTimeout(() => {
        state.value = AccordionContentState.OPEN;
      }, animationDelay.value);
    } else {
      state.value = AccordionContentState.CLOSING;
      if (setOpenTimeout) clearTimeout(setOpenTimeout);
      setClosedTimeout = setTimeout(() => {
        state.value = AccordionContentState.CLOSED;
      }, animationDelay.value);
    }
  });

  watch([state, height], () => {
    switch (state.value) {
      case AccordionContentState.OPEN:
        nextTick(() => {
          overflow.value = undefined;
          displayHeight.value = null;
        });
        break;
      case AccordionContentState.OPENING:
        overflow.value = "hidden";
        nextTick(() => {
          displayHeight.value = height.value;
        });
        break;
      case AccordionContentState.CLOSED:
        nextTick(() => {
          displayHeight.value = 0;
          overflow.value = "hidden";
        });
        break;
      case AccordionContentState.CLOSING:
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

  return {
    state,
    accordionId,
    computedStyle
  };
}
