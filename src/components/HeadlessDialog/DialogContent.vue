<template>
  <div ref="wrapper" :id="id" aria-modal="true" :class="contentClass" :style="style">
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: "DialogContent"
};
</script>
<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, onUpdated, nextTick, ref, PropType, StyleValue, computed } from "vue";
import { dialogs } from "@/hooks/dialog";
import { dialogKeys } from "@/injection-keys/dialog";
const props = defineProps({
  class: { type: [String, Object, Array], default: undefined },
  style: { type: [String, Object, Array] as PropType<StyleValue>, default: undefined }
});
const contentClass = computed(() => props.class);
const wrapper = ref<HTMLElement | null>(null);
const open = inject(dialogKeys.Open);
const id = inject(dialogKeys.Id);
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
// eslint-disable-next-line no-undef
let focusableContent: null | NodeListOf<HTMLElement> | undefined = null;
function reloadDomArray(content: HTMLElement | null) {
  focusableContent = content?.querySelectorAll<HTMLElement>(focusableElements);
  // If we are already focused on an element form this array we should not not reset the focus.
  if (focusableContent) {
    let shouldResetFocus = true;
    for (let index = 0; index < focusableContent.length; index++) {
      const element = focusableContent[index];
      if (document.activeElement == element) {
        shouldResetFocus = false;
        break;
      }
    }
    if (focusableContent[0] && shouldResetFocus) {
      // Focus on the first available element
      focusableContent[0].focus();
    }
  }
  console.log(focusableContent);
}
function onKeyDown(event: KeyboardEvent) {
  // If the last active dialog is this
  if (dialogs.value[dialogs.value.length - 1] == id) {
    if (open?.value && focusableContent) {
      const isTabPressed = event.key == "Tab";
      if (event.key == "Escape") {
        open.value = false;
      }
      if (!isTabPressed) {
        return;
      }
      if (event.shiftKey) {
        if (document.activeElement === focusableContent[0]) {
          focusableContent[focusableContent.length - 1].focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === focusableContent[focusableContent.length - 1]) {
          focusableContent[0].focus();
          event.preventDefault();
        }
      }
    }
  }
}
onMounted(() => {
  document.addEventListener("keydown", onKeyDown);
  reloadDomArray(wrapper.value);
  nextTick(() => {
    reloadDomArray(wrapper.value);
  });
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeyDown);
});
onUpdated(() => {
  reloadDomArray(wrapper.value);
  nextTick(() => {
    reloadDomArray(wrapper.value);
  });
});
</script>
