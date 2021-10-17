<template>
  <table>
    <tr v-for="(array, i) in matrix" :key="i">
      <td v-for="(day, j) in array" :key="j">
        <slot :day-object="day" :update-day="updateDay" :selected="compare(day)">
          {{ day ? day.number : undefined }}
        </slot>
      </td>
    </tr>
  </table>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { injectionKeys } from "@/utils";
import { compareDate, DayObject } from "@/utils/calendar";
export default defineComponent({
  name: "HCalendarDays",
  setup() {
    const matrix = inject(
      injectionKeys.CALENDAR.MATRIX,
      computed(() => [])
    );
    const updateDay = inject(injectionKeys.CALENDAR.UPDATE_DAY, () => {
      return;
    });
    const model = inject(injectionKeys.CALENDAR.MODEL);
    function compare(day: DayObject | undefined | null) {
      if (Array.isArray(model?.value)) {
        return (
          compareDate(day ? day.date : null, model?.value[0], "equal") ||
          compareDate(day ? day.date : null, model?.value[1], "equal")
        );
      } else {
        return compareDate(day ? day.date : null, model?.value, "equal");
      }
    }

    return {
      matrix,
      updateDay,
      compare
    };
  }
});
</script>
