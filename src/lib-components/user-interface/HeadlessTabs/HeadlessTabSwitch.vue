<template>
  <button type="button" @click="switchTab(index)">
    <slot :index="index" :currentTab="currentTab" :switchTab="switchTab" />
  </button>
</template>
<script lang="ts">
import { useTabLink } from "@/hooks/tabs";
import { injectionKeys, isMissingInjectable } from "@/utils";
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "HeadlessTabSwitch",
  inheritAttrs: false,
  setup() {
    const switches = inject(injectionKeys.TABS.SWITCH_ARRAY);
    const currentTab = inject(injectionKeys.TABS.CURRENT_TAB);
    const switchTab = inject(injectionKeys.TABS.SWITCH_TAB);
    isMissingInjectable(switches, currentTab, switchTab);

    const { index } = useTabLink(switches);

    return { currentTab, index, switchTab };
  },
});
</script>
