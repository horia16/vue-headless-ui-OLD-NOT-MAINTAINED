import { inject } from "vue";
import { injectionKeys, isMissingInjectable } from "@/utils";

export const emits = { blur: null };
export function setup() {
  const inputValue = inject(injectionKeys.FORM.INPUT_VALUE);
  const id = inject(injectionKeys.FORM.ID);
  const name = inject(injectionKeys.FORM.NAME);
  const errorMessage = inject(injectionKeys.FORM.ERROR_MESSAGE);
  const state = inject(injectionKeys.FORM.STATE);
  const handleBlur = inject(injectionKeys.FORM.HANDLE_BLUR);
  isMissingInjectable(id, name, errorMessage, state, handleBlur);
  return {
    inputValue,
    id,
    name,
    handleBlur,
    errorMessage,
    state
  };
}
