<template>
  <div v-bind="context.attrs" type="button" v-for="(x, index) in tabs" :key="index">
    <slot :index="index" :currentTab="currentTab" :tabs="tabs" :switchTab="switchToTab" :data="userTabs[index] ?? {}" />
  </div>
</template>
<script lang="ts">
import { ComputedRef, defineComponent, inject, Ref, WritableComputedRef } from "vue";

export default defineComponent({
  name: "TabSwitch",
  inheritAttrs: false,
  setup({}, context) {
    const currentTab = inject("currentTab") as WritableComputedRef<number | null>;
    const tabs = inject("tabs") as Ref<Array<number>>;
    const userTabs = inject("userTabs") as ComputedRef<Array<Record<string, any>>>;
    function switchToTab(index: number) {
      currentTab.value = index;
    }

    return {
      currentTab,
      tabs,
      switchToTab,
      context,
      userTabs,
    };
  },
});
</script>
