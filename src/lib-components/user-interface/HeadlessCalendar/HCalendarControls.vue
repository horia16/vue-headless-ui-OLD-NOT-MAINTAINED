<template>
  <component :is="as">
    <slot
      :update-day="updateDay"
      :update-month="updateMonth"
      :update-year="updateYear"
      :day="date.d"
      :month="date.m"
      :year="date.y"
      :weekday-names="weekdayNames"
      :month-names="monthNames"
      :month-name="monthNames[date.m - 1]"
    />
  </component>
</template>
<script lang="ts">
import { defineComponent, inject, computed, PropType } from "vue";
import { injectionKeys } from "@/utils";
import { getMonthNames, getWeekdayNames } from "@/utils/calendar";

export default defineComponent({
  name: "HCalendarControls",
  props: {
    as: { type: String, default: "div" },
    nameLength: { type: String as PropType<"short" | "long" | "narrow">, default: "short" }
  },
  setup(props) {
    const updateDay = inject(injectionKeys.CALENDAR.UPDATE_DAY, () => {
      return;
    });
    /**
     * Update the month of our date. Negative values or values bigger than 12 will change the year.
     */
    const updateMonth = inject(injectionKeys.CALENDAR.UPDATE_MONTH, () => {
      return;
    });
    const updateYear = inject(injectionKeys.CALENDAR.UPDATE_YEAR, () => {
      return;
    });
    const date = inject(injectionKeys.CALENDAR.DATE_OBJECT, { d: 0, m: 0, y: 0 });
    const locale = inject(injectionKeys.CALENDAR.LOCALE);
    const weekdayNames = computed(() => getWeekdayNames(locale?.value ?? "en-US", props.nameLength));
    const monthNames = computed(() => getMonthNames(locale?.value ?? "en-US", props.nameLength));
    return {
      updateDay,
      updateMonth,
      updateYear,
      date,
      weekdayNames,
      monthNames
    };
  }
});
</script>
