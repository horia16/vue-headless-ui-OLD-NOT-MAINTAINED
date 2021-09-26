<template>
  <component :is="as">
    <slot
      :updateDay="updateDay"
      :updateMonth="updateMonth"
      :updateYear="updateYear"
      :day="date.d"
      :month="date.m"
      :year="date.y"
      :weekdayNames="weekdayNames"
      :monthNames="monthNames"
    />
  </component>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
import { injectionKeys } from "@/utils";
import { monthNames, weekdayNames } from "@/utils/calendar";

export default defineComponent({
  name: "HCalendarControls",
  props: {
    as: { type: String, default: "div" }
  },
  setup() {
    const updateDay = inject(injectionKeys.CALENDAR.UPDATE_DAY, () => {
      return;
    });
    const updateMonth = inject(injectionKeys.CALENDAR.UPDATE_MONTH, () => {
      return;
    });
    const updateYear = inject(injectionKeys.CALENDAR.UPDATE_YEAR, () => {
      return;
    });
    const date = inject(injectionKeys.CALENDAR.DATE_OBJECT, { d: 0, m: 0, y: 0 });
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
