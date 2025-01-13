<template>
  <div class="mt-5">
    <v-row class="align-center ml-1">
      <v-btn
        v-for="item in durations"
        :key="item"
        @click="chooseDuration(item)"
        depressed
        class="px-4 py-1 font-weight-bold mr-2"
        :class="[duration === item ? 'primary' : 'white']"
        >{{ durationTranslate[item] }}</v-btn
      >

      <div>عرض نتائج</div>
    </v-row>
    <v-row class="justify-end">
      <v-col
        v-for="(value, stat) in stats"
        :key="stat"
        cols="6"
        md="3"
        class="mb-4"
      >
        <v-card outlined class="px-4 py-5">
          <v-row>
            <v-col cols="12" class="d-flex flex-column align-end">
              <div class="text-h6">{{ stat }}</div>
              <div class="primary--text text-h5">{{ value }}</div>
            </v-col>

            <!-- <v-col class="d-flex justify-end">
              <v-card
                outlined
                rounded="lg"
                width="50"
                height="50"
                class="d-flex justify-center align-center"
                >s</v-card
              >
            </v-col> -->
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-overlay :value="loading" opacity="0.2">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay> -->
  </div>
</template>

<script>
export default {
  props: {
    fetchStats: {
      required: true,
    },
    stats: {
      required: false,
    },
  },
  data() {
    return {
      loading: true,
      duration: 'month',
      durations: ['full', 'year', 'month', 'day'],
      durationTranslate: {
        day: 'يوم',
        month: 'شهر',
        year: 'سنة',
        full: 'كامل المدة',
      },
    }
  },
  watch: {
    duration(val) {
      this.fetchStats(val)
    },
  },
  methods: {
    chooseDuration(d) {
      this.duration = d
    },
  },
}
</script>

<style></style>
