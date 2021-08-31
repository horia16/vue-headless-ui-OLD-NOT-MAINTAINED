<template>
  <accordion-content-wrapper
      v-if="visible"
      :id="accordionId"
      ref="wrapper"
      :aria-labelledby="`${accordionId}_toggle`"
      :style="{ height: height != null ? `${height}px` : 'auto', overflow, transition: `height ${delay}ms` }"
      role="region"
      @mounted="contentMounted"
  >
    <slot/>
  </accordion-content-wrapper>
</template>
<script lang="ts">
import {injectionKeys, isMissingInjectable} from "@/utils";
import {defineComponent, inject, Ref, ref, watchEffect} from "vue";
import AccordionContentWrapper from "./AccordionContentWrapper.vue";

export default defineComponent({
  components: {AccordionContentWrapper},
  name: "AccordionContent",
  setup() {
    const delay = inject(injectionKeys.ACCORDION.DELAY);
    const isOpen = inject(injectionKeys.ACCORDION.IS_OPEN);
    const accordionId = inject(injectionKeys.ACCORDION.COMPUTED_ID);
    const toggle = inject(injectionKeys.ACCORDION.TOGGLE);
    isMissingInjectable(delay, isOpen, accordionId, toggle);

    const wrapper: Ref<{ $el: HTMLElement } | null> = ref(null);

    const visible = ref(!!isOpen?.value);

    const height: Ref<number | null> = ref(isOpen?.value ? null : 0);
    const overflow = ref("hidden");

    let zeroOutHeightTimeout: NodeJS.Timeout | null = null;
    let setInvisibleTimeout: NodeJS.Timeout | null = null;
    let setHeightAutoTimeout: NodeJS.Timeout | null = null;

    function setHeightAuto() {
      height.value = null;
      // Set the overflow to auto when the accordion is fully expanded.
      overflow.value = "auto";
    }

    function setInvisible() {
      visible.value = false;
    }

    function setVisible() {
      visible.value = true;
    }

    function zeroOutHeight() {
      height.value = 0;
      overflow.value = "hidden";
      // Remove the content completely from the dom after the animation has been completed.
      setInvisibleTimeout = setTimeout(setInvisible, delay?.value);
    }

    function contentMounted(scrollHeight: number) {
      height.value = scrollHeight;
      // Set the height to auto after the animation has been finished.
      setHeightAutoTimeout = setTimeout(setHeightAuto, delay?.value);
    }

    watchEffect(() => {
      // We are opening the accordion
      if (isOpen?.value) {
        // If we have any timeout set for closing the accordion, i.e. opening it while the closing animation did not finish,  clear them
        if (setInvisibleTimeout) clearTimeout(setInvisibleTimeout);
        if (zeroOutHeightTimeout) clearTimeout(zeroOutHeightTimeout);
        // If the content wrapper is mounted already, get the height
        if (wrapper.value?.$el) {
          height.value = wrapper.value.$el.scrollHeight;
        }
        // Set the visibility of the content to true
        setVisible();
      } else {
        // If we have any timeout set for opening the accordion, clear it
        if (setHeightAutoTimeout) clearTimeout(setHeightAutoTimeout);
        // If we have a wrapper set from height auto to the height of the wrapper so we can get a nice transition
        if (wrapper.value?.$el) {
          height.value = wrapper.value.$el.scrollHeight;
        }
        // Set the height to 0 after 20 ms so the css engine will play the transition
        zeroOutHeightTimeout = setTimeout(zeroOutHeight, 20);
      }
    });

    return {
      isOpen,
      toggle,
      wrapper,
      height,
      overflow,
      visible,
      delay,
      accordionId,
      contentMounted,
    };
  },
});
</script>
