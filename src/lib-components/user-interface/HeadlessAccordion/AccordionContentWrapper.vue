<template>
  <div ref="content">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";

export default defineComponent({
  name: "AccordionContentWrapper",
  emits: {
    mounted: null
  },
  setup(props, { emit }) {
    const content: Ref<null | HTMLElement> = ref(null);
    onMounted(() => {
      if (content.value) {
        emit("mounted", content.value.scrollHeight);
      }
    });
    return {
      content
    };
  }
});
</script>
