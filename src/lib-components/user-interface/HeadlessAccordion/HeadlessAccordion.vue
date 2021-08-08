<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, provide, ref } from "vue";

export default defineComponent({
  name: "HeadlessAccordion",
  props: {
    modelValue: { type: Boolean, default: null },
    self: { type: Boolean, default: false },
    openOnCreate: { type: Boolean, default: false },
  },
  setup(props, context) {
    const selfOpen = ref(props.openOnCreate ? true : false);
    if (props.openOnCreate == true && props.modelValue == false) {
      context.emit("update:modelValue", true);
    }

    const isOpen = computed({
      get: () => (props.self ? selfOpen.value : props.modelValue),
      set: (newValue) => (props.self ? (selfOpen.value = newValue) : context.emit("update:modelValue", newValue)),
    });
    function toggle() {
      isOpen.value = !isOpen.value;
    }

    provide("isOpen", isOpen);
    provide("toggle", toggle);
  },
});
</script>
