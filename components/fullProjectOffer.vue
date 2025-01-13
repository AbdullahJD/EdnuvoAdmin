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
          <v-list-item-subtitle>مجمل الأيام</v-list-item-subtitle>
          <v-list-item-title>{{ durationDays }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-subtitle>المتبقي</v-list-item-subtitle>
          <v-list-item-title>
            {{
              remaining < 0 ? `متأحر ${remaining * -1} يوم` : remaining
            }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-subtitle>أيام العمل</v-list-item-subtitle>
          <v-list-item-title>{{ injazDays }}</v-list-item-title>
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
      durationDays: this.offer.offer.durationDays,
      totalCost: this.offer.totalCost,
      finishDate: this.offer.finishDate,
      endDate: '',
      todayOrFinish: '',
      // did not work due to value cant be set to data or computed object
      //   items: [
      //     { title: 'تاريخ البداية', value: this.startDate },
      //     { title: 'مجمل الأيام', value: 'durationDays' },
      //     { title: 'المتبقي', value: this.remaining },
      //     { title: 'أيام الإنجاز', value: this.injazDays },
      //   ],
    }
  },
  computed: {
    remaining() {
      return this.durationDays - this.injazDays
    },
    injazDays() {
      return this.dateDiffInDays(this.startDate, this.todayOrFinish)
    },
  },
  mounted() {
    const today = new Date()
    // today.setMinutes(today.getMinutes() + 180)
    const durationNum = parseInt(this.durationDays)
    let finishDateDate = this.finishDate?.slice(0, 10)
    let finishDateTime = this.finishDate?.slice(11)
    let finishDateFormatedd = finishDateDate + 'T' + finishDateTime
    const finishDateLocal = new Date(finishDateFormatedd)
    // finishDateLocal.setMinutes(finishDateLocal.getMinutes() + 180)
    this.todayOrFinish = this.finishDate ? finishDateLocal : today
    let startDateDate = this.startDate.slice(0, 10)
    let startDateTime = this.startDate.slice(11)
    let startDateFormatedd = startDateDate + 'T' + startDateTime
    const startdate = new Date(startDateFormatedd)
    // startdate.setMinutes(startdate.getMinutes() + 180)
    const endDate = new Date(
      startdate.getTime() + durationNum * 24 * 60 * 60 * 1000
    )
    const dd = endDate.getDate()
    const mm = endDate.getMonth() + 1
    const y = endDate.getFullYear()
    this.endDate = y + '-' + mm + '-' + dd
  },
  methods: {
    dateDiffInDays(date1, date2) {
      // Discard the time and time-zone information.
      const _MS_PER_DAY = 1000 * 60 * 60 * 24
      let a = new Date(date1)
      let b = new Date(date2)
      return Math.floor((b - a) / _MS_PER_DAY)
    },
  },
}
</script>

<style></style>
