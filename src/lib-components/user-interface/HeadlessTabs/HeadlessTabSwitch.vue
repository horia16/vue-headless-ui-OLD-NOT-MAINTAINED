<template>
  <button
      :id="id"
      ref="switchButton"
      :aria-controls="tabs[index]"
      :aria-selected="index == currentTab"
      :tabindex="index != currentTab ? '-1' : null"
      role="tab"
      type="button"
      @click="switchTab(index)"
      @keydown="onKeyDown"
  >
    <slot :currentTab="currentTab" :index="index" :switchTab="switchTab"/>
  </button>
</template>
<script lang="ts">
import {useTabLink} from "@/hooks/tabs";
import {injectionKeys, isMissingInjectable} from "@/utils";
import {defineComponent, inject, Ref, ref, watchEffect} from "vue";

export default defineComponent({
  name: "HeadlessTabSwitch",
  setup() {
    const switchButton: Ref<HTMLButtonElement | null> = ref(null);
    const switches = inject(injectionKeys.TABS.SWITCH_ARRAY);
    const tabs = inject(injectionKeys.TABS.TAB_ARRAY);
    const currentTab = inject(injectionKeys.TABS.CURRENT_TAB);
    const switchTab = inject(injectionKeys.TABS.SWITCH_TAB);
    isMissingInjectable(switches, tabs, currentTab, switchTab);

    function onKeyDown(e: KeyboardEvent) {
      if (currentTab && switches && switchTab) {
        switch (e.key) {
          case "ArrowRight":
            if (currentTab.value + 1 <= switches.value.length - 1) {
              switchTab(currentTab.value + 1);
            } else {
              switchTab(0);
            }
            break;
          case "ArrowLeft":
            if (currentTab.value - 1 >= 0) {
              switchTab(currentTab.value - 1);
            } else {
              switchTab(switches.value.length - 1);
            }
            break;
          case "Home":
            switchTab(0);
            break;
          case "End":
            switchTab(switches.value.length - 1);
            break;

          default:
            break;
        }
      }
    }

    const {id, index} = useTabLink(switches);

    watchEffect(() => {
      if (currentTab?.value == index.value) {
        // Get the focus only if we move from another tab button
        if (switchButton.value && document.activeElement?.getAttribute("role") == "tab") {
          switchButton.value.focus();
        }
      }
    });

    return {currentTab, index, id, switchTab, onKeyDown, switchButton, tabs};
  },
});
</script>
