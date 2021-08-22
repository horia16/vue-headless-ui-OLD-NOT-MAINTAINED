<template>
  <div v-if="index == currentTab">
    <slot :switchTab="switchTab" :currentTab="currentTab" :tabIndex="index" />
  </div>
</template>
<script lang="ts">
import { injectionKeys, isMissingInjectable } from "@/utils";
import { defineComponent, inject } from "vue";
import { useTabLink } from "@/hooks/tabs";
export default defineComponent({
  name: "HeadlessTab",
  setup() {
    const tabs = inject(injectionKeys.TABS.TAB_ARRAY);
    const currentTab = inject(injectionKeys.TABS.CURRENT_TAB);
    const switchTab = inject(injectionKeys.TABS.SWITCH_TAB);
    isMissingInjectable(tabs, currentTab, switchTab);
    const { index } = useTabLink(tabs);
    return { currentTab, index, switchTab };
  },
});
</script>
