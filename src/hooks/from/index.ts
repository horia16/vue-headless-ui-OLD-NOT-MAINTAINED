import { useForm } from "vee-validate";
import { computed, ref } from "vue";

export default function useHeadlessForm(
  props: {
    scrollToError: boolean;
    scrollOptions: {
      behavior?: ScrollBehavior;
      block?: ScrollLogicalPosition;
    };
  },
  emit: {
    (e: "valid", value: Record<string, unknown>): void;
    (e: "error", value: Record<string, string | undefined>): void;
  }
) {
  const { handleSubmit, errors } = useForm();
  const triedToSubmit = ref(false);
  let sendErrorEvent: boolean;
  const onSubmit = handleSubmit(values => {
    sendErrorEvent = false;
    emit("valid", values);
  });
  async function submit(event: Event) {
    sendErrorEvent = true;
    triedToSubmit.value = true;
    await onSubmit(event);
    if (sendErrorEvent) {
      emit("error", errors.value);
      setTimeout(() => {
        // Get the first error in the document
        let errorElement = document.querySelectorAll("[data-error]")[0];
        if (errorElement && props.scrollToError) {
          let parentElement = errorElement.parentElement;
          let inputElement: HTMLElement | null = null;
          // Try and extract the input element
          while (parentElement !== null && inputElement === null) {
            if (parentElement.getAttribute("data-input")) {
              inputElement = parentElement;
            } else {
              parentElement = parentElement.parentElement;
            }
          }
          if (inputElement) {
            errorElement = inputElement;
          }
          errorElement.scrollIntoView(props.scrollOptions);
        }
      }, 200);
    }
  }
  const errorCount = computed(() => (!triedToSubmit.value ? 0 : Object.keys(errors.value).length));
  return {
    submit,
    errors,
    errorCount
  };
}
