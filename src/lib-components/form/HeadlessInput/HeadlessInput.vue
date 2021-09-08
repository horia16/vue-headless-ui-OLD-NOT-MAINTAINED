<template>
  <component :is="as">
    <slot :errorMessage="errorMessage" :handleBlur="handleBlur" :meta="meta" :state="state" :validate="validate" />
  </component>
</template>
<script lang="ts">
import { defineComponent, PropType, provide } from "vue";
import { InputBaseProps, useInput } from "@/hooks/input";
import { injectionKeys } from "@/utils";

export default defineComponent({
  name: "HeadlessInput",
  props: {
    modelValue: { type: [String, Number, Boolean, Array], default: null },
    id: { type: [String, Number], default: null },
    name: { type: [String, Number], default: null },
    rules: { type: [String, Function], default: null },
    as: {
      type: String as PropType<"div" | "fieldset">,
      default: "div",
      validator: (value: string) => {
        return ["div", "fieldset"].indexOf(value) != -1;
      }
    }
  },
  emits: ["update:modelValue", "blur"],
  setup(props, context) {
    const { errorMessage, inputValue, inputName, inputId, state, validate, handleBlur, meta } = useInput(
      props as InputBaseProps,
      context
    );
    provide(injectionKeys.FORM.ID, inputId);
    provide(injectionKeys.FORM.INPUT_VALUE, inputValue);
    provide(injectionKeys.FORM.NAME, inputName);
    provide(injectionKeys.FORM.ERROR_MESSAGE, errorMessage);
    provide(injectionKeys.FORM.STATE, state);
    provide(injectionKeys.FORM.VALIDATE, validate);
    provide(injectionKeys.FORM.HANDLE_BLUR, handleBlur);
    provide(injectionKeys.FORM.META, meta);
    return {
      errorMessage,
      state,
      validate,
      handleBlur,
      meta
    };
  }
});
</script>
