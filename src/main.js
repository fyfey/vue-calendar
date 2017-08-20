import Vue from 'vue'
import Calendar from './Calendar.vue'
import CalendarDay from './CalendarDay.vue'

Vue.component('calendar-day', CalendarDay);

new Vue({
  el: '#app',
  render: h => h(Calendar)
})
