<template>
  <div>
    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-subtitle>تاريخ البداية</v-list-item-subtitle>
          <v-list-item-title>{{ startDate }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-subtitle>مجمل الساعات</v-list-item-subtitle>
          <v-list-item-title>{{ durationHours }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-subtitle>متبقي الساعات</v-list-item-subtitle>
          <v-list-item-title>{{ timeSpent.hours }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-subtitle>متبقي الدقائق</v-list-item-subtitle>
          <v-list-item-title>{{ timeSpent.minutes }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-subtitle>متبقي الثواني</v-list-item-subtitle>
          <v-list-item-title>{{ timeSpent.seconds }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    offer: {
      required: true,
    },
    startDate: {
      required: true,
    },
  },
  data() {
    return {
      durationHours: this.offer.offer.durationHours,
      totalCost: this.offer.totalCost,
      finishDate: this.offer.finishDate,
      endDate: '',
      todayOrFinish: '',
      startdate: '',
      enddate: '',
      todayOrFinish: '',
      timeLeft: null,
      timeSpent: null,
      // to clear setInterval, to prevent memory leak
      interval: null,
    }
  },

  created() {
    let startDateDate = this.startDate.slice(0, 10)
    let startDateTime = this.startDate.slice(11)
    let startDateFormatedd = startDateDate + 'T' + startDateTime
    this.startdate = new Date(startDateFormatedd)
    // startdate.setMinutes(startdate.getMinutes() + 180)
    this.enddate = new Date(startDateFormatedd)
    this.enddate.setHours(this.enddate.getHours() + this.durationHours)
    // enddate.setMinutes(enddate.getMinutes() + 180)
    let finishDateDate = this.finishDate?.slice(0, 10)
    let finishDateTime = this.finishDate?.slice(11)
    let finishDateFormatedd = finishDateDate + 'T' + finishDateTime
    const finishDateLocal = new Date(finishDateFormatedd)
    // finishDateLocal.setMinutes(finishDateLocal.getMinutes() + 180)
    const today = new Date()
    this.todayOrFinish = this.finishDate ? finishDateLocal : today
    this.timeLeft = this.calculateTimeLeft(this.todayOrFinish, this.enddate)
    this.timeSpent = this.calculateTimeSpent(this.todayOrFinish, this.startdate)
    this.interval = setInterval(() => {
      const today = new Date()
      this.todayOrFinish = this.finishDate ? finishDateLocal : today
      this.timeLeft = this.calculateTimeLeft(this.todayOrFinish, this.enddate)
      this.timeSpent = this.calculateTimeSpent(
        this.todayOrFinish,
        this.startdate
      )
    }, 1000)
  },
  methods: {
    calculateTimeLeft(t, e) {
      let difference = +e - +t
      let timeLeft = {}
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
      // if (difference < 0) {
      //   late = true
      // }
      return timeLeft
    },

    calculateTimeSpent(t, s) {
      let difference = +t - +s
      let timeSpent = {}
      timeSpent = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
      return timeSpent
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style></style>
