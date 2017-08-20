<template>
  <div id="app">
      <table>
          <thead>
              <tr>
                  <td colspan="7">
                      <a href="#" class="prev" @click.prevent="previous">&lt;&lt;</a>
                      {{monthName}} {{year}}
                      <a href="#" class="next" @click.prevent="next">&gt;&gt;</a>
                  </td>
             </tr>
              <tr>
                  <td v-for="day in days">{{day}}</td>
              </tr>
          </thead>
          <tbody>
              <tr v-for="week in calendar">
                  <calendar-day v-for="day in week" :day="day" :month="month" :year="year" :today="today" :key="''+year+month+day" :selectedSlots="selectedSlots" :selected-day="selectedDay" v-on:select-day="selectDay" />
              </tr>
          </tbody>
      </table>

      <template v-if="selectedDay">
          Select availability for {{selectedDay.day}} {{selectedDayMonthName}} {{selectedDay.year}}:
          <table>
            <thead>
                <tr>
                    <td v-for="slot in timeSlots">{{slot.label}}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <time-slot v-for="slot in timeSlots" :selected-day="selectedDay" :selectedSlots="selectedSlots" v-on:choose-slot="toggleSlot" :time-slot="slot" :key="''+slot.value"/>
                </tr>
            </tbody>
          </table>
      </template>
  </div>
</template>

<script>

import Calendar from './calendar.js';
import _ from "lodash";

export default {
    name: 'app',
    data () {
        return {
            year: 2000,
            month: 1,
            today: 1,
            selectedDay: false,
            selectedSlots: {},
        }
    },
    created() {
        var date = new Date;
        this.today = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        };
        this.year = date.getFullYear();
        this.month = date.getMonth();
    },
    computed: {
        days: function() {
            return Calendar.getDays();
        },
        monthName: function () {
            return Calendar.months[this.month];
        },
        selectedDayMonthName: function () {
            return Calendar.months[this.selectedDay.month];
        },
        calendar: function () {
            return Calendar.makeMonth(this.year, this.month);
        },
        dayStart: function () {
            return 7;
        },
        dayEnd: function() {
            return 20;
        },
        timeSlots: function () {
            var slots = [], label;
            for (var i = this.dayStart; i < this.dayEnd; i++) {
                label = ((i > 12) ? i-12 : i) + ((i < 12) ? "am" : "pm");
                slots.push({
                    label: label,
                    value: i-1,
                });
            }
            return slots;
        },
    },
    methods: {
        previous() {
            this.month--;
            if (this.month < 0) {
                this.month = 11;
                this.year--;
            }
        },
        next() {
            this.month++;
            if (this.month > 11) {
                this.month = 0;
                this.year++;
            }
        },
        selectDay(selectedDay) {
            this.selectedDay = selectedDay;
        },
        toggleSlot(day, time) {
            var key = `${day.year}-${day.month}-${day.day}`;
            this.ensureArrayExists(key);
            // If it isn't in the array, set it, if not, remove it
            if (!_.includes(this.selectedSlots[key], time)) {
                this.selectedSlots[key].push(time);
            } else {
                this.selectedSlots[key].splice(this.selectedSlots[key].indexOf(time), 1);
            }
            this.ensureNoGaps(key);
        },
        ensureArrayExists(key) {
            if (!this.selectedSlots[key]) {
                this.$set(this.selectedSlots, key, []);
            }
        },
        ensureNoGaps(key) {
            for (let i = _.min(this.selectedSlots[key]); i < _.max(this.selectedSlots[key]); i++) {
                if (!_.includes(this.selectedSlots[key], i)) {
                    this.selectedSlots[key].push(i);
                }
            }
        }
    }
}
</script>

<style>
.prev {
    float: left;
    padding-left: 5px;
}
.next {
    float: right;
    padding-right: 5px;
}
table { 
    background:#fff; 
    border-collapse:collapse; 
    font-family: sans-serif;
} 
td { 
    color:#2b2b2b; 
    width:30px; 
    height:30px; 
    line-height:30px; 
    text-align:center; 
    border:1px solid #e6e6e6; 
    cursor:default; 
} 
thead td { 
    height:26px; 
    line-height: 26px; 
    text-transform:uppercase; 
    font-size:90%; 
} 
thead td:not(:last-child) { 
    border-right:1px solid #fff; 
}


td.nil {
    //background:#ededed; 
}
td.today { 
    font-weight: bold;
} 
td.chosen {
    background: #c1ffc1;
}
td.active {
    //border: 2px solid #999;
    box-shadow: inset 0 0 5px #00f;
}
tbody td a {
    width: 100%;
    height: 100%;
    display: block;
}

</style>
