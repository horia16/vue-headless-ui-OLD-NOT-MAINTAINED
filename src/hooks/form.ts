import { useForm } from "vee-validate";
import { computed, ref, SetupContext } from "vue";

export default function useHeadlessForm(
  props: { scrollToError: boolean },
  context: SetupContext<{
    submitted: null;
    failed: null;
  }>
) {
  const { handleSubmit, errors } = useForm();
  const triedToSubmit = ref(false);
  let sendErrorEvent = null;
  const onSubmit = handleSubmit(values => {
    sendErrorEvent = false;
    context.emit("submitted", values);
  });

  async function submit(e: Event) {
    sendErrorEvent = true;
    triedToSubmit.value = true;
    await onSubmit(e);
    if (sendErrorEvent) {
      context.emit("failed", errors.value);
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
          errorElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
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
