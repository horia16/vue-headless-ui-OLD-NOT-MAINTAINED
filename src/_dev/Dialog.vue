<template>
  <div>
    <div>
      <button @click="open = true">Open</button>
    </div>
    <HeadlessDialog v-model="open" style="background-color: rgba(0, 0, 0, 0.397)">
      <DialogContent style="display: flex; flex-direction: column">
        <button @click="open = false">close</button> test <button @click="open = false">close</button> test
        <button @click="open = false">close</button> test <button @click="open = false">close</button> test
      </DialogContent>
    </HeadlessDialog>
  </div>
</template>
<script setup lang="ts">
import HeadlessDialog from "@/components/HeadlessDialog/HeadlessDialog.vue";
import DialogContent from "@/components/HeadlessDialog/DialogContent.vue";
import { ref } from "vue";
const open = ref(false);
</script>
