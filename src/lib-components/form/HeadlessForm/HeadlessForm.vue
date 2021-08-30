<template>
  <form @submit="submit">
    <slot :errorCount="errorCount" :errors="errors" :submit="submit"></slot>
  </form>
</template>
<script lang="ts">
  import {defineComponent} from "vue";
  import useHeadlessForm from "@/hooks/form";

  export default defineComponent({
    name: "HeadlessForm",
    props: {
      scrollToError: {type: Boolean, default: false},
    },
    emits: ["submitted", "error"],
    setup(props, context) {
      const {submit, errors, errorCount} = useHeadlessForm(props, context);
   
      return {submit, errors, errorCount};

    },
  });
</script>
