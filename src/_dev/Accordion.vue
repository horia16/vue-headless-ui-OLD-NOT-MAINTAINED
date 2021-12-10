<template>
  <div>
    <HeadlessAccordion :animation-delay="700" open-by-default>
      <div>
        <HeadlessAccordionToggle> Test Button </HeadlessAccordionToggle>
      </div>
      <HeadlessAccordionContent style="background: #000; color: white; display: flex; flex-direction: column">
        <button @click="test++">increase</button>
        <div v-for="x in test" :key="x">test Content {{ x }}</div>
      </HeadlessAccordionContent>
    </HeadlessAccordion>
  </div>
</template>
<script setup lang="ts">
import HeadlessAccordion from "@/components/HeadlessAccordion/HeadlessAccordion.vue";
import HeadlessAccordionToggle from "@/components/HeadlessAccordion/HeadlessAccordionToggle.vue";
import HeadlessAccordionContent from "@/components/HeadlessAccordion/HeadlessAccordionContent.vue";
import { ref } from "vue";
const test = ref(25);
</script>
