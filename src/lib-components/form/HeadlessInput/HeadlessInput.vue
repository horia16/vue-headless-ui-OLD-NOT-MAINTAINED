<template>
  <component :is="group ? 'fieldset' : 'div'">
    <slot :errorMessage="errorMessage" :handleBlur="handleBlur" :meta="meta" :state="state" :validate="validate" />
  </component>
</template>
<script lang="ts">
import { defineComponent, provide } from "vue";
import { emits, props, useFieldContext } from "@/hooks/input";
import { injectionKeys } from "@/utils";

export default defineComponent({
  name: "HeadlessInput",
  props,
  emits,
  setup(props, context) {
    const { errorMessage, inputValue, inputName, inputId, state, validate, handleBlur, meta } = useFieldContext(
      props,
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
    provide(injectionKeys.FORM.OPTIONS, props.options);
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
