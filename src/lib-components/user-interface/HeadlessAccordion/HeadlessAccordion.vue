<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
import { injectionKeys, randomString } from "@/utils";
import { computed, defineComponent, provide, ref } from "vue";

export default defineComponent({
  name: "HeadlessAccordion",
  props: {
    modelValue: { type: Boolean, default: null },
    self: { type: Boolean, default: false },
    openByDefault: { type: Boolean, default: false },
    animationDelay: { type: Number, default: 700 },
    id: { type: [String, Number], default: null },
  },
  setup(props, context) {
    const selfOpen = ref(props.openByDefault ? true : false);
    const accordionId = computed(() => {
      return props.id ? `${props.id}` : `accordion-${randomString()}`;
    });
    const delay = computed(() => props.animationDelay);
    // If we are open by default and the v-model is set to false make it true
    //! This will still trigger the animation delay as of now because we are updating a proxy async and the initial state has been loaded already
    if (props.openByDefault == true && props.modelValue == false) {
      context.emit("update:modelValue", true);
    }

    const isOpen = computed({
      get: () => (props.self ? selfOpen.value : props.modelValue),
      set: (newValue) => (props.self ? (selfOpen.value = newValue) : context.emit("update:modelValue", newValue)),
    });
    function toggle() {
      isOpen.value = !isOpen.value;
    }

    provide(injectionKeys.ACCORDION.DELAY, delay);
    provide(injectionKeys.ACCORDION.IS_OPEN, isOpen);
    provide(injectionKeys.ACCORDION.TOGGLE, toggle);
    provide(injectionKeys.ACCORDION.COMPUTED_ID, accordionId);
  },
});
</script>
