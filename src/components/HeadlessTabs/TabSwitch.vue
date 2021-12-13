<template>
  <button
    :id="id"
    :class="switchClass"
    :style="style"
    ref="switchButton"
    :aria-controls="tabs[index]"
    :aria-selected="index === currentTab"
    :tabindex="index !== currentTab ? -1 : undefined"
    role="tab"
    type="button"
    @click="switchToCurrentTab"
    @keydown="onKeyDown"
  >
    <slot :currentTab="currentTab" :index="index" :switchTab="switchToCurrentTab" />
  </button>
</template>
<script setup lang="ts">
import useArrayLink from "@/hooks/array-link";
import { tabKeys } from "@/injection-keys/tabs";
import { inject, Ref, ref, watchEffect, computed, PropType, StyleValue } from "vue";
const props = defineProps({
  class: { type: [String, Object, Array], default: undefined },
  style: { type: [String, Object, Array] as PropType<StyleValue>, default: undefined }
});
const switchClass = computed(() => props.class);
const switchButton: Ref<HTMLButtonElement | null> = ref(null);
const switches = inject(tabKeys.SwitchArray);
const tabs = inject(tabKeys.TabArray, ref([]));
const currentTab = inject(tabKeys.CurrentTab);
const switchTab = inject(tabKeys.SwitchTab, () => {
  return;
});
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
const { id, index } = useArrayLink(switches);

function switchToCurrentTab() {
  switchTab(index.value);
}

watchEffect(() => {
  if (currentTab?.value == index.value) {
    // Get the focus only if we move from another tab button
    if (switchButton.value && document.activeElement?.getAttribute("role") == "tab") {
      switchButton.value.focus();
    }
  }
});
</script>
