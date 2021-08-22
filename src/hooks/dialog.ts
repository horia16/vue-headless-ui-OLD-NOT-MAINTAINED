import { randomString } from "@/utils";
import { SetupContext, computed, watch, ref, Ref } from "vue";

export const dialogs: Ref<Array<string>> = ref([]);

export function useDialogModel(props: { modelValue: boolean; [key: string]: any }, context: SetupContext<any>) {
  /**
   * Random dialog id.
   */
  const id = randomString();
  const value = computed({
    get: () => props.modelValue,
    set: (newVal) => {
      if (newVal) {
        document.body.style.overflow = "hidden";
      }
      context.emit("update:modelValue", newVal);
    },
  });

  let activeElement: HTMLElement | null = null;

  watch(value, () => {
    if (value.value) {
      // We are opening the dialog so push it to the dialogs array
      dialogs.value.push(id);
      // Make sure we hide the scroll on the body
      document.body.style.overflow = "hidden";
      // When we open the modal keep the element that we were focused on in memory
      if (document.activeElement) {
        activeElement = document.activeElement as HTMLElement;
      }
    } else {
      // Closing the dialog so remove it from the array. It should always be on top for nested dialogs.
      dialogs.value = dialogs.value.filter((x) => x != id);
      // If we have note left remove the overflow from the body
      if (dialogs.value.length == 0) {
        document.body.style.overflow = "";
      }
      // Focus back on the element that we were focused on prior to opening the modal
      if (activeElement) {
        activeElement.focus();
      }
    }
  });

  return { value, id };
}
