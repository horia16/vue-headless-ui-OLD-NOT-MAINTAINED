<template>
  <div ref="content">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, PropType, Ref, ref } from "vue";

export default defineComponent({
  name: "DomObserver",
  props: {
    config: {
      type: Object as PropType<{ attributes: boolean; childList: boolean; subtree: boolean }>,
      default: () => {
        return { attributes: true, childList: true, subtree: true };
      }
    }
  },
  emits: { updated: null, mounted: null },
  setup(props, context) {
    const content: Ref<null | HTMLElement> = ref(null);
    function callback() {
      context.emit("updated", content.value);
    }
    const observer = new MutationObserver(callback);
    onMounted(() => {
      if (content.value) {
        observer.observe(content.value, props.config);
        context.emit("mounted", content.value);
      }
    });
    onBeforeMount(() => {
      observer.disconnect();
    });
    return {
      content
    };
  }
});
</script>
