<template>
  <div>
    <headless-input v-model="inputValue">
      <input-label>
        Test Label
      </input-label>
      <input-field />
      <input-error />
    </headless-input>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import HeadlessInput from "@/lib-components/form/HeadlessInput/HeadlessInput.vue";
import InputField from "@/lib-components/form/HeadlessInput/fields/InputField.vue";
import InputLabel from "@/lib-components/form/HeadlessInput/elements/InputLabel.vue";
import InputError from "@/lib-components/form/HeadlessInput/elements/InputError.vue";

export default defineComponent({
  components: { InputError, InputLabel, InputField, HeadlessInput },
  name: "ServeDev",
  setup() {
    const inputValue = ref<string | null>(null);
    return { inputValue };
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
