<template>
      <td :class="dayClass">
          <a v-if="day" href="#" @click.prevent="$emit('select-day', {day: day, month: month, year: year})">{{day}}</a>
      </td>
</template>

<script>
import _ from "lodash";

export default {
    name: 'calendar-day',
    props: ["day", "month", "year", "today", "selectedSlots", "selectedDay"],
    computed: {
        dayClass: function() {
            let key = `${this.year}-${this.month}-${this.day}`;
            return {
                today: this.day === this.today.day && this.month === this.today.month && this.year === this.today.year,
                nil: !this.day,
                chosen: _.has(this.selectedSlots, key) && this.selectedSlots[key].length,
                active: this.selectedDay.day === this.day && this.selectedDay.month === this.month && this.selectedDay.year === this.year
            }
        }
    }
}
</script>
