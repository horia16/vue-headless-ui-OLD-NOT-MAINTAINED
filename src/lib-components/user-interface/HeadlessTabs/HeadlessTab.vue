<template>
  <div v-if="currentTab == id">
    <slot :id="id" :currentTab="currentTab" :data="userTabs[id]" />
  </div>
</template>
<script lang="ts">
import { ComputedRef, defineComponent, inject, ref, Ref, WritableComputedRef } from "vue";

export default defineComponent({
  name: "HeadlessTab",
  setup() {
    const currentTab = inject("currentTab") as WritableComputedRef<number | null>;
    const tabs = inject("tabs") as Ref<Array<number>>;
    const userTabs = inject("userTabs") as ComputedRef<Array<Record<string, any>>>;
    const id = ref(tabs.value.length);
    tabs.value.push(id.value);
    return {
      id,
      currentTab,
      userTabs,
    };
  },
});
</script>
