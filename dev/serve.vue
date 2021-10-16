<template>
  <div>
    <inputs />
    <headless-calendar
      is-range
      v-model="date"
      :use-date="false"
      :disabled-dates="['2021-09-24', new Date()]"
      locale="en"
    >
      <h-calendar-controls
        length="long"
        v-slot="{ month, updateMonth, monthName }"
        style="display:flex; margin-bottom: 1rem; margin-top: 1rem"
      >
        <button @click="updateMonth(month - 1)">
          -
        </button>
        <div>
          {{ monthName }}
        </div>
        <button @click="updateMonth(month + 1)">
          +
        </button>
      </h-calendar-controls>
      <h-calendar-weekdays v-slot="{ weekday }">
        <div style="width:2rem;height:2rem;display: flex; justify-content: center; align-items: center">
          {{ weekday }}
        </div>
      </h-calendar-weekdays>
      <h-calendar-days v-slot="{ dayObject, updateDay, selected }">
        <button
          v-if="dayObject"
          style="width:2rem;height:2rem;"
          :disabled="dayObject.disabled"
          :style="selected ? 'background-color: blue;' : ''"
          @click="updateDay(dayObject.number)"
        >
          {{ dayObject.number }}
        </button>
        <button v-else disabled style="width:2rem;height:2rem;"></button>
      </h-calendar-days>
    </headless-calendar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import Inputs from "./component-tests/Inputs.vue";
import HeadlessCalendar from "@/lib-components/user-interface/HeadlessCalendar/HeadlessCalendar.vue";
import HCalendarDays from "@/lib-components/user-interface/HeadlessCalendar/HCalendarDays.vue";
import HCalendarControls from "@/lib-components/user-interface/HeadlessCalendar/HCalendarControls.vue";
import HCalendarWeekdays from "@/lib-components/user-interface/HeadlessCalendar/HCalendarWeekdays.vue";

export default defineComponent({
  name: "ServeDev",
  components: { HCalendarWeekdays, HCalendarControls, HCalendarDays, HeadlessCalendar, Inputs },
  setup() {
    const date = ref(null);
    return {
      date
    };
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
