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
import { computed, defineComponent, inject, PropType } from "vue";
import { injectionKeys } from "@/utils";
import { getWeekdayNames } from "@/utils/calendar";

export default defineComponent({
  name: "HCalendarWeekdays",
  props: { length: { type: String as PropType<"short" | "long" | "narrow">, default: "short" } },
  setup(props) {
    const startSunday = inject(
      injectionKeys.CALENDAR.START_SUNDAY,
      computed(() => false)
    );
    function swapFirstLast<T>(array: Array<T>) {
      [array[0], array[array.length - 1]] = [array[array.length - 1], array[0]];
      return array;
    }
    const locale = inject(injectionKeys.CALENDAR.LOCALE);
    const weekdayNames = computed(() => getWeekdayNames(locale?.value ?? "en-US", props.length));
    const weekdays = computed(() => {
      return startSunday.value ? swapFirstLast(weekdayNames.value) : weekdayNames.value;
    });
    return {
      weekdays,
      startSunday
    };
  }
});
</script>
