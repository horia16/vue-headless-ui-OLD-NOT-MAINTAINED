<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
import { useModel } from "@/hooks/input";
import { computed, defineComponent, PropType, provide, Ref, ref } from "vue";

export default defineComponent({
  name: "HeadlessTabs",
  props: {
    modelValue: { type: Number, default: null },
    tabs: {
      type: Array as PropType<Array<Record<string, any>>>,
      default: () => {
        return [];
      },
    },
  },
  setup(props, context) {
    const currentTab = useModel(props, context);
    const tabs: Ref<Array<number>> = ref([]);
    provide("currentTab", currentTab);
    provide("tabs", tabs);
    const userTabs = computed(() => props.tabs);
    provide("userTabs", userTabs);
    return {
      tabs,
    };
  },
});
</script>
