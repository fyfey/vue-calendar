import Vue from 'vue'
import Calendar from './Calendar.vue'
import CalendarDay from './CalendarDay.vue'
import TimeSlot from './TimeSlot.vue'

Vue.component('calendar-day', CalendarDay);
Vue.component('time-slot', TimeSlot);

new Vue({
  el: '#app',
  render: h => h(Calendar)
})
