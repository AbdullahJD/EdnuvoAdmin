<template>
  <div>
    <v-tabs v-model="tab" right>
      <v-tab v-for="(cTab, index) in tabs" :key="index">
        {{ cTab }}
      </v-tab>
    </v-tabs>

    <v-data-table
      :headers="headers"
      :items="data"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      class="elevation-1"
      hide-default-footer
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1,
      loading: true,
      totalItems: 10,
      totalPages: 10,
      itemsPerPage: 10,
      options: {},
      page: 1,
      data: [],
      tabs: ['مخالفات إغلاق حساب', 'مخالفات مرة واحدة'],
      tabsTranslate: {
        0: 'closeAccount',
        1: 'violation',
      },
      headers: [
        {
          text: 'الوصف',
          sortable: false,
          value: 'description',
        },
        {
          text: 'رقم العرض',
          sortable: false,
          value: 'offer_id',
        },
        {
          text: 'رقم المخالف',
          sortable: false,
          value: 'user_id',
        },
        {
          text: 'رقم المخالفة',
          sortable: false,
          value: 'id',
        },
        // { value: 'data-table-select' },
      ],
    }
  },
  watch: {
    page(val) {
      this.fetchViolations(this.tabsTranslate[this.tab], val)
    },
    tab(val) {
      this.pageLoading = true
      this.fetchViolations(this.tabsTranslate[val], 1)
    },
  },
  methods: {
    fetchViolations(type, page) {
      this.loading = true
      this.$axios
        .get(`/api/admin/violations?type=${type}&page=${page}`)
        .then((res) => {
          // console.log(res.data)
          this.data = res.data.data
          this.totalItems = res.data.total
          this.totalPages = Math.ceil(res.data.total / 10)
        })
        .catch((e) => {
          console.log(e.response.data)
        })
        .finally((f) => {
          this.loading = false
        })
    },
  },
  mounted() {
    this.fetchViolations('violation', 1)
  },
}
</script>

<style></style>
