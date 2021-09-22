<template>
  <dom-observer :id="id" aria-modal="true" @mounted="reloadDomArray" @updated="reloadDomArray">
    <slot />
  </dom-observer>
</template>
<script lang="ts">
import DomObserver from "@/lib-components/utility/DomObserver.vue";
import { defineComponent, inject, onBeforeUnmount, onMounted } from "vue";
import { dialogs } from "@/hooks/dialog";
import { injectionKeys, isMissingInjectable } from "@/utils";

export default defineComponent({
  components: { DomObserver },
  name: "DialogContent",
  setup() {
    const isOpen = inject(injectionKeys.DIALOG.IS_OPEN);
    const id = inject(injectionKeys.DIALOG.ID);
    isMissingInjectable(isOpen, id);
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
    function onKeyDown(event: KeyboardEvent) {
      // If the last active dialog is this
      if (dialogs.value[dialogs.value.length - 1] == id) {
        if (isOpen?.value && focusableContent) {
          const isTabPressed = event.key == "Tab";

          if (event.key == "Escape") {
            isOpen.value = false;
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
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", onKeyDown);
    });
    return { reloadDomArray, id };
  }
});
</script>
