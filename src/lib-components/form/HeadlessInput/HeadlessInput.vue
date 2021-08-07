<template>
  <component :is="element">
    <slot :errorMessage="errorMessage" :state="state" :validate="validate" :handleBlur="handleBlur" :meta="meta" />
  </component>
</template>
<script lang="ts">
import { defineComponent, PropType, provide } from "vue";
import { useInput, InputBaseProps } from "../../../hooks/input";
export default defineComponent({
  name: "HeadlessInput",
  props: {
    modelValue: { type: [String, Number, Boolean, Array], default: null },
    id: { type: [String, Number], default: null },
    name: { type: [String, Number], default: null },
    rules: { type: [String, Function], default: null },
    element: {
      type: String as PropType<"div" | "fieldset">,
      default: "div",
      validator: (value: string) => {
        return ["div", "fieldset"].indexOf(value) != -1;
      },
    },
  },
  emits: ["update:modelValue", "blur"],
  setup(props, context) {
    const { errorMessage, inputValue, inputName, inputId, state, validate, handleBlur, meta } = useInput(
      props as InputBaseProps,
      context
    );
    provide("errorMessage", errorMessage);
    provide("inputValue", inputValue);
    provide("name", inputName);
    provide("id", inputId);
    provide("state", state);
    provide("validate", validate);
    provide("handleBlur", handleBlur);
    provide("meta", meta);
    return {
      errorMessage,
      state,
      validate,
      handleBlur,
      meta,
    };
  },
});
</script>
