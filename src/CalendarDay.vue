<template>
      <td :class="dayClass">
          <a href="#" @click.prevent="$emit('select-day', {day: day, month: month, year: year})">{{day}}</a>
      </td>
</template>

<script>
import _ from "lodash";

export default {
    name: 'calendar-day',
    props: ["day", "month", "year", "today", "selectedSlots"],
    computed: {
        dayClass: function() {
            return {
                today: this.day === this.today.day && this.month === this.today.month && this.year === this.today.year,
                nil: !this.day,
                chosen: _.has(this.selectedSlots, `${this.year}-${this.month}-${this.day}`),
            }
        }
    }
}
</script>
