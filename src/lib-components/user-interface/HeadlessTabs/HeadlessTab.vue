<template>
  <component :is="as" v-if="index === currentTab" :id="id" :aria-labelledby="switches[index]" role="tabpanel">
    <slot :currentTab="currentTab" :switchTab="switchTab" :tabIndex="index" />
  </component>
</template>
<script lang="ts">
import { injectionKeys, isMissingInjectable } from "@/utils";
import { defineComponent, inject, ref } from "vue";
import useArrayLink from "@/hooks/arrayLink";

export default defineComponent({
  name: "HeadlessTab",
  props: {
    as: { type: String, default: "div" }
  },
  setup() {
    const tabs = inject(injectionKeys.TABS.TAB_ARRAY);
    const switches = inject(injectionKeys.TABS.SWITCH_ARRAY, ref([]));
    const currentTab = inject(injectionKeys.TABS.CURRENT_TAB);
    const switchTab = inject(injectionKeys.TABS.SWITCH_TAB);
    isMissingInjectable(tabs, switches, currentTab, switchTab);
    const { id, index } = useArrayLink(tabs);
    return { currentTab, index, switchTab, id, switches };
  }
});
</script>
