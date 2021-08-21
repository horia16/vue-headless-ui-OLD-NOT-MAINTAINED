import { randomString } from "@/utils";
import { SetupContext, computed, watch, ref, Ref } from "vue";

export const dialogs: Ref<Array<string>> = ref([]);

export function useDialogModel(props: { modelValue: boolean; [key: string]: any }, context: SetupContext<any>) {
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
      dialogs.value.push(id);
      document.body.style.overflow = "hidden";
      // When we open the modal keep the element that we were focused on
      if (document.activeElement) {
        activeElement = document.activeElement as HTMLElement;
      }
    } else {
      dialogs.value = dialogs.value.filter((x) => x != id);
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
