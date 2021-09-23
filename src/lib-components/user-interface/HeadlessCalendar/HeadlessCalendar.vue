<template>
  <component :is="as">
    <slot :updateDay="updateDay" :day="date.d" :month="date.m" :year="date.y" />
  </component>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, provide, reactive, watch } from "vue";
import { convertToDate, convertToObjectDate, createDayMapping, shiftMatrix } from "@/utils/calendar";
import { injectionKeys } from "@/utils";

export default defineComponent({
  name: "HeadlessCalendar",
  props: {
    modelValue: {
      type: [String, Date] as PropType<string | Date>,
      default: null,
      validator(value: unknown) {
        if (typeof value === "string") {
          // Validate the prop to be a valid date
          return !isNaN(Date.parse(value));
        } else if (value instanceof Date) {
          return true;
        }
        return false;
      }
    },
    as: { type: String, default: "div" },
    useDate: { type: Boolean, default: null },
    startSunday: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const date = reactive<{ d?: number; m?: number; y?: number }>(convertToObjectDate(props.modelValue ?? new Date()));
    const mode = computed(() =>
      props.useDate == null
        ? typeof props.modelValue === "string"
          ? "string"
          : "date"
        : this.props.useDate
        ? "date"
        : "string"
    );
    const model = computed({
      get: () => {
        return props.modelValue;
      },
      set: val => {
        emit("update:modelValue", val);
      }
    });

    watch(date, () => {
      if (date.d && date.m && date.y) {
        model.value = convertToDate(date, mode.value);
      }
    });

    function updateDay(val: number) {
      date.d = val;
    }

    const matrix = computed(() =>
      props.startSunday ? createDayMapping(date.m, date.y) : shiftMatrix(createDayMapping(date.m, date.y))
    );
    provide(injectionKeys.CALENDAR.MATRIX, matrix);
    provide(injectionKeys.CALENDAR.UPDATE_DAY, updateDay);
    return {
      matrix,
      updateDay,
      model,
      mode,
      date
    };
  }
});
</script>
