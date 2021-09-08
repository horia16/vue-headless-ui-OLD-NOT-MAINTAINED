import { useForm } from "vee-validate";
import { computed, ref, SetupContext } from "vue";

export default function useHeadlessForm(
  props: { scrollToError: boolean; [key: string]: any },
  context: SetupContext<any>
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
      setTimeout(() => {
        let errorElement = document.querySelectorAll("[data-error]")[0];
        if (errorElement) {
          if (errorElement.parentNode) {
            errorElement = errorElement.parentNode as Element;
          }
          if (props.scrollToError) {
            errorElement.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }
          context.emit("error", errors.value);
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
