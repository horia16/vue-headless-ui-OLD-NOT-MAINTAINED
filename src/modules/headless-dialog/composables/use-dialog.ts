import randomString from "@/utilities/random-string";

export const activeDialogs = ref<Array<string>>([]);

export default function (
  props: { modelValue: boolean; id?: string },
  emit: { (e: "update:modelValue", value: boolean): void }
) {
  const dialogId = computed(() => {
    return props.id ? `${props.id}` : `dialog_${randomString()}`;
  });

  const open = computed({
    get: () => props.modelValue,
    set: (newVal) => {
      if (newVal) {
        document.body.style.overflow = "hidden";
      }
      emit("update:modelValue", newVal);
    }
  });

  let activeElement: HTMLElement | null = null;

  watch(open, () => {
    if (open.value) {
      // We are opening the dialog so push it to the dialogs array
      activeDialogs.value.push(dialogId.value);
      // Make sure we hide the scroll on the body
      document.body.style.overflow = "hidden";
      // When we open the modal keep the element that we were focused on in memory
      if (document.activeElement) {
        activeElement = document.activeElement as HTMLElement;
      }
    } else {
      // Closing the dialog so remove it from the array. It should always be on top for nested dialogs.
      activeDialogs.value = activeDialogs.value.filter((x) => x != dialogId.value);
      // If we have note left remove the overflow from the body
      if (activeDialogs.value.length == 0) {
        document.body.style.overflow = "";
      }
      // Focus back on the element that we were focused on prior to opening the modal
      if (activeElement) {
        activeElement.focus();
      }
    }
  });
  return { open, dialogId };
}
