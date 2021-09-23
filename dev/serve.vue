<template>
  <div>
    <inputs />
    <headless-calendar v-model="date" #default="{day}">
      <h-calendar-days #default="{dayObject, updateDay}">
        <button
          v-if="dayObject"
          style="width:2rem;height:2rem;"
          :style="{ backgroundColor: dayObject.pos === day ? 'blue' : undefined }"
          @click="updateDay(dayObject.pos)"
        >
          {{ dayObject.pos }}
        </button>
      </h-calendar-days>
    </headless-calendar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import Inputs from "./component-tests/Inputs.vue";
import HeadlessCalendar from "@/lib-components/user-interface/HeadlessCalendar/HeadlessCalendar.vue";
import HCalendarDays from "@/lib-components/user-interface/HeadlessCalendar/HCalendarDays.vue";

export default defineComponent({
  components: { HCalendarDays, HeadlessCalendar, Inputs },
  name: "ServeDev",
  setup() {
    const date = ref("2020-01-01");
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
