<template>
  <div>
    <HeadlessInput v-model="test">
      <TextField />
    </HeadlessInput>

    <HeadlessInput v-model="test" textarea>
      <TextField />
    </HeadlessInput>
    <HeadlessInput
      v-model="data.select"
      :options="[
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: '3' }
      ]"
    >
      <SelectField />
    </HeadlessInput>
    <HeadlessInput v-model="data.tick" radio>
      <HeadlessInputLabel text="Test Legend" />
      <TickboxField value="2" class="test">
        <template #after>
          <HeadlessInputLabel text="This is a test label" />
        </template>
      </TickboxField>
      <TickboxField value="3" />
      <TickboxField value="4" />
      <TickboxField value="5" />
      <TickboxField value="6" />
    </HeadlessInput>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import HeadlessInput from "@/components/HeadlessInput/HeadlessInput.vue";
import TextField from "@/components/HeadlessInput/fields/TextField.vue";
import SelectField from "@/components/HeadlessInput/fields/SelectField.vue";
import TickboxField from "@/components/HeadlessInput/fields/TickboxField.vue";
import HeadlessInputLabel from "@/components/HeadlessInput/shared/InputLabel.vue";
const test = ref<string | null>(null);
const data = reactive({
  select: null,
  tick: []
});
</script>
