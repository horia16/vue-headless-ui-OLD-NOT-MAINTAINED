<template>
  <div>
    <slot :currentTab="currentTab" :switchTab="switchTab" />
  </div>
</template>
<script lang="ts">
import { useModel } from "@/hooks/input";
import { injectionKeys } from "@/utils";
import { defineComponent, provide, ref, Ref } from "vue";

export default defineComponent({
  name: "HeadlessTabs",
  props: {
    modelValue: { type: Number, default: null }
  },
  setup(props, context) {
    const currentTab = useModel(props, context);
    const tabs: Ref<Array<string>> = ref([]);
    const switches: Ref<Array<string>> = ref([]);
    function switchTab(index: number) {
      currentTab.value = index;
    }
    provide(injectionKeys.TABS.CURRENT_TAB, currentTab);
    provide(injectionKeys.TABS.TAB_ARRAY, tabs);
    provide(injectionKeys.TABS.SWITCH_ARRAY, switches);
    provide(injectionKeys.TABS.SWITCH_TAB, switchTab);

    return {
      currentTab,
      switchTab
    };
  }
});
</script>
