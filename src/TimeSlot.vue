<template>
    <td :class="slotClass"><a href="#" @click="$emit('choose-slot', selectedDay, timeSlot.value)">{{timeSlot.value}}</a></td>
</template>

<script>
import _ from "lodash";

export default {
    name: 'time-slot',
    props: ["selectedDay", "selectedSlots", "timeSlot"],
    computed: {
        slotClass: {
            cache: false,
            get() {
                let key = `${this.selectedDay.year}-${this.selectedDay.month}-${this.selectedDay.day}`;
                return {
                    chosen: _.has(this.selectedSlots[key], this.timeSlot.value),
                }
            }
        }
    }
}
</script>
