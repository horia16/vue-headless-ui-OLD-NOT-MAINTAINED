<template>
  <div>
    <headless-accordion self>
      <accordion-header style="display:flex;border:1px solid black">
        <accordion-toggle>Toggle</accordion-toggle>
      </accordion-header>
      <accordion-content style="border:1px solid black">
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </accordion-content>
    </headless-accordion>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import HeadlessAccordion from "@/lib-components/user-interface/HeadlessAccordion/HeadlessAccordion.vue";
import AccordionHeader from "@/lib-components/user-interface/HeadlessAccordion/AccordionHeader.vue";
import AccordionContent from "@/lib-components/user-interface/HeadlessAccordion/AccordionContent.vue";
import AccordionToggle from "@/lib-components/user-interface/HeadlessAccordion/AccordionToggle.vue";

export default defineComponent({
  components: { AccordionToggle, AccordionContent, AccordionHeader, HeadlessAccordion },
  name: "ServeDev",
  setup() {
    const tab = ref(0);
    return { tab };
  }
});
</script>

<style>
@import url(https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css);

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
