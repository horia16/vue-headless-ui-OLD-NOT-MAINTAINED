<template>
  <table>
    <tr v-for="(array, i) in matrix" :key="i">
      <td v-for="(day, j) in array" :key="j">
        <slot :dayObject="day" :updateDay="updateDay">
          {{ day ? day.pos : undefined }}
        </slot>
      </td>
    </tr>
  </table>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { injectionKeys } from "@/utils";

export default defineComponent({
  name: "HCalendarDays",
  setup() {
    const matrix = inject(
      injectionKeys.CALENDAR.MATRIX,
      computed(() => [])
    );
    const updateDay = inject(injectionKeys.CALENDAR.UPDATE_DAY, () => {});
    return {
      matrix,
      updateDay
    };
  }
});
</script>
