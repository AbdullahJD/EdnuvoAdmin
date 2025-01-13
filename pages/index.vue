<template>
  <div class="mt-5">
    <stats type="general" :fetchStats="fetchStats" :stats="stats" />

    <v-overlay :value="loading" opacity="0.2">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import stats from '~/components/stats.vue'
export default {
  components: { stats },
  data() {
    return {
      loading: true,
      stats: '',
    }
  },
  methods: {
    fetchStats(duration) {
      this.loading = true
      this.$axios
        .get(`api/admin/statistics/general?duration=${duration}`)
        .then((res) => {
          this.stats = res.data
        })
        .catch((e) => {
          console.log(e.response.data)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  mounted() {
    this.fetchStats('month')
  },
}
</script>

<style></style>
