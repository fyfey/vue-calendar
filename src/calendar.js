module.exports = {
    cache: {},
    days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    getDays() {
        return this.days;
    },
    getMonths() {
        return this.months;
    },
    makeMonth(year, month) {
        if (this.cache[""+year+month]) {
            console.log("Using cache!");
            return this.cache[""+year+month];
        }
        var day = 1,
            i,
            j,
            haveDays = true,
            startDay = new Date(year, month, day).getDay()-1,
            daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            calendar = [];

        if (startDay < 0) {
            startDay = 6;
        }

        i = 0;
        while (haveDays) {
            calendar[i] = [];
            for (j  = 0; j < 7; j++) {
                if (i === 0) {
                    if (j === startDay && j === 0) {
                        calendar[i] = ["", "", "", "", "", "", ""];
                    } else if (j === startDay) {
                        calendar[i][j] = day++;
                        startDay++;
                    } else {
                        calendar[i][j] = "";
                    }
                } else if (day <= daysInMonths[month]) {
                    calendar[i][j] = day++;
                } else {
                    calendar[i][j] = "";
                    haveDays = false;
                }
                if (day > daysInMonths[month]) {
                    haveDays = false;
                }
            }
            i++;
        }
        if (calendar.length === 5) {
            calendar.push(["", "", "", "", "", "", ""]);
        }

        return this.cache[""+year+month] = calendar;
    }
}
