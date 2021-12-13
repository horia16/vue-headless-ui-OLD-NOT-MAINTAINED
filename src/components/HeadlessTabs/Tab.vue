<template>
  <component
    v-if="index === currentTab"
    :is="tag"
    :class="tabClass"
    :style="style"
    :id="id"
    :aria-labelledby="switches[index]"
    role="tabpanel"
  >
    <slot :currentTab="currentTab" :tabIndex="index" />
  </component>
</template>
<script setup lang="ts">
import useArrayLink from "@/hooks/array-link";
import { tabKeys } from "@/injection-keys/tabs";
import { inject, ref, computed } from "vue";
const props = defineProps({
  tag: { type: String, default: "div" },
  class: { type: [String, Object, Array], default: undefined },
  style: { type: [String, Object, Array], default: undefined }
});
const tabClass = computed(() => props.class);
const tabs = inject(tabKeys.TabArray);
const switches = inject(tabKeys.SwitchArray, ref([]));
const currentTab = inject(tabKeys.CurrentTab);
const { id, index } = useArrayLink(tabs);
</script>
