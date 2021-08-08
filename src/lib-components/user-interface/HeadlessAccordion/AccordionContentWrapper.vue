<template>
  <div ref="content">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";

export default defineComponent({
  name: "AccordionContentWrapper",
  setup({}, context) {
    const content: Ref<null | HTMLElement> = ref(null);
    onMounted(() => {
      if (content.value) {
        context.emit("mounted", content.value.scrollHeight);
      }
    });
    return {
      content,
    };
  },
});
</script>
