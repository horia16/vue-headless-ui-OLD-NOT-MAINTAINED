import type { Ref } from "vue";
import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";
import { activeDialogs } from "./use-dialog";

const focusableElements =
  'button:not([disabled="true"]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function (wrapper: Ref<HTMLElement | null>) {
  const open = injectDefined(keys.OPEN);
  const id = injectDefined(keys.ID);

  let focusableContent: null | NodeListOf<HTMLElement> | undefined = null;

  function reloadDomArray(wrapper: HTMLElement) {
    focusableContent = wrapper.querySelectorAll<HTMLElement>(focusableElements);
    // If we are already focused on an element form this array we should not not reset the focus.
    if (focusableContent) {
      let shouldResetFocus = true;
      for (let index = 0; index < focusableContent.length; index++) {
        if (document.activeElement === focusableContent[index]) {
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
    if (activeDialogs.value[activeDialogs.value.length - 1] == id.value) {
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
    nextTick(() => {
      if (wrapper.value) reloadDomArray(wrapper.value);
    });
  });

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", onKeyDown);
  });

  onUpdated(() => {
    nextTick(() => {
      if (wrapper.value) reloadDomArray(wrapper.value);
    });
  });

  return { id };
}
