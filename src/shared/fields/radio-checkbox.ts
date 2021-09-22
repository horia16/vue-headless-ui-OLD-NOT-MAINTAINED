import { inject, PropType } from "vue";
import { injectionKeys, isMissingInjectable } from "@/utils";
import useArrayLink from "@/hooks/arrayLink";

export const props = {
  value: {
    type: [String, Number, Object, Array] as PropType<string | number | boolean | Array<unknown> | Record<string, any>>,
    default: null
  }
};

export function setup() {
  const inputValue = inject(injectionKeys.FORM.INPUT_VALUE);
  const id = inject(injectionKeys.FORM.ID);
  const name = inject(injectionKeys.FORM.NAME);
  const errorMessage = inject(injectionKeys.FORM.ERROR_MESSAGE);
  const state = inject(injectionKeys.FORM.STATE);
  const meta = inject(injectionKeys.FORM.META);
  const handleBlur = inject(injectionKeys.FORM.HANDLE_BLUR);
  const inputs = inject(injectionKeys.FORM.INPUTS);
  isMissingInjectable(id, inputValue, name, errorMessage, state, handleBlur, inputs);
  const { id: inputId } = useArrayLink(inputs);
  return {
    inputValue,
    id,
    inputId,
    name,
    handleBlur,
    errorMessage,
    state,
    meta
  };
}
