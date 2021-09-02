<template>
  <div v-if="index == currentTab" :id="id" :aria-labelledby="switches[index]" role="tabpanel" tabindex="0">
    <slot :currentTab="currentTab" :switchTab="switchTab" :tabIndex="index" />
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
    const switches = inject(injectionKeys.TABS.SWITCH_ARRAY);
    const currentTab = inject(injectionKeys.TABS.CURRENT_TAB);
    const switchTab = inject(injectionKeys.TABS.SWITCH_TAB);
    isMissingInjectable(tabs, switches, currentTab, switchTab);
    const { id, index } = useTabLink(tabs);
    return { currentTab, index, switchTab, id, switches };
  }
});
</script>
