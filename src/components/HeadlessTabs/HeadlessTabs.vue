<template>
  <slot :currentTab="currentTab" :switchToTab="switchTab" />
</template>
|
<script lang="ts">
export default {
  name: "HeadlessTabs"
};
</script>
<script setup lang="ts">
import { tabKeys } from "@/injection-keys/tabs";
import { provide, ref, Ref, computed } from "vue";
const props = defineProps({
  modelValue: { type: Number, default: 0 }
});
const emit = defineEmits<(e: "update:modelValue", value: number) => void>();
const currentTab = computed({
  get: () => props.modelValue,
  set: newVal => emit("update:modelValue", newVal)
});
const tabs: Ref<Array<string>> = ref([]);
const switches: Ref<Array<string>> = ref([]);
function switchTab(index: number) {
  currentTab.value = index;
}
provide(tabKeys.CurrentTab, currentTab);
provide(tabKeys.TabArray, tabs);
provide(tabKeys.SwitchArray, switches);
provide(tabKeys.SwitchTab, switchTab);
</script>
