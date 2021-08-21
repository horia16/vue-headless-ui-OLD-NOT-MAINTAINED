<template>
  <dom-observer @updated="reloadDomArray" @mounted="reloadDomArray" aria-modal="true" :id="id">
    <slot />
  </dom-observer>
</template>
<script lang="ts">
import DomObserver from "@/lib-components/utility/DomObserver.vue";
import { defineComponent, inject, onBeforeUnmount, onMounted, Ref } from "vue";
import { dialogs } from "@/hooks/dialog";
export default defineComponent({
  components: { DomObserver },
  name: "DialogContent",
  setup() {
    const state = inject("state") as Ref<boolean>;
    const id = inject("id") as string;

    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
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
    }
    function onKeyDown(e: KeyboardEvent) {
      // If the last active dialog is this
      if (dialogs.value[dialogs.value.length - 1] == id) {
        if (state.value && focusableContent) {
          const isTabPressed = e.key == "Tab";

          if (e.key == "Escape") {
            state.value = false;
          }

          if (!isTabPressed) {
            return;
          }
          if (e.shiftKey) {
            if (document.activeElement === focusableContent[0]) {
              focusableContent[focusableContent.length - 1].focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === focusableContent[focusableContent.length - 1]) {
              focusableContent[0].focus();
              e.preventDefault();
            }
          }
        }
      }
    }
    onMounted(() => {
      document.addEventListener("keydown", onKeyDown);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", onKeyDown);
    });
    return { reloadDomArray, id };
  },
});
</script>
