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
                  <calendar-day v-for="day in week" :day="day" :month="month" :year="year" :today="today" :key="''+year+month+day" :selectedSlots="selectedSlots" v-on:select-day="selectDay" />
              </tr>
          </tbody>
      </table>

      <template v-if="selectedDay">
          Select availability for {{selectedDay.day}} {{selectedDayMonthName}} {{selectedDay.year}}:
          <table>
            <tr>
                <td v-for="slot in timeSlots">{{slot.label}}</td>
            </tr>
            <tr>
                <td v-for="slot in timeSlots" :class="slotClass"><a href="#" @click="chooseSlot(selectedDay, slot.value)">{{slot.value}}</a></td>
            </tr>
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
        chooseSlot(day, time) {
            var key = `${day.year}-${day.month}-${day.day}`;
            let slots = _.extend(this.selectedSlots[key]);
            if (!slots[key]) {
                slots[key] = {};
            }
            slots[time] = true;
            this.$set(this.selectedSlots, key, true);
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

</style>