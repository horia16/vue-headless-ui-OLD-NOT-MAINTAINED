<template>
  <table>
    <tr>
      <td v-for="(day, index) in weekdays" :key="index">
        <slot :weekday="day" />
      </td>
    </tr>
  </table>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { injectionKeys } from "@/utils";
import { weekdayNames } from "@/utils/calendar";

export default defineComponent({
  name: "HCalendarWeekdays",
  setup() {
    const startSunday = inject(
      injectionKeys.CALENDAR.START_SUNDAY,
      computed(() => false)
    );
    function swapFirstLast<T>(array: Array<T>) {
      [array[0], array[array.length - 1]] = [array[array.length - 1], array[0]];
      return array;
    }
    const weekdays = computed(() => {
      return startSunday.value ? swapFirstLast(weekdayNames) : weekdayNames;
    });
    return {
      weekdays,
      startSunday
    };
  }
});
</script>
