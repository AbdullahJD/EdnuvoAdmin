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
      <template v-slot:item.actions="{ item }">
        <nuxt-link
          v-if="item.status === 'open'"
          :to="`/chat/${item.conversation_id}`"
          depressed
        >
          عرض المحادثة
        </nuxt-link>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          v-if="item.status === 'closed'"
          label
          color="#CAE4DB"
          class="green--text"
        >
          مغلقه
        </v-chip>

        <v-chip
          v-if="item.status === 'open'"
          label
          outlined
          color="error"
          class="red--text"
        >
          مفتوحه
        </v-chip>
      </template>
    </v-data-table>

    <v-pagination
      v-model="page"
      :length="totalPages"
      class="my-10"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1,
      data: [],
      loading: true,
      totalItems: 10,
      totalPages: 1,
      itemsPerPage: 10,
      options: {},
      page: 1,
      tabs: ['إغلاق مشروع', 'النزاعات'],
      tabsTranslate: {
        0: 'closeProject',
        1: 'conflict',
      },

      headers: [
        {
          text: 'حركات',
          sortable: false,
          value: 'actions',
        },
        {
          text: 'الوصف',
          sortable: false,
          value: 'description',
        },
        {
          text: 'الحالة',
          sortable: false,
          value: 'status',
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
      this.fetchIssues(this.tabsTranslate[this.tab], val)
    },
    tab(val) {
      this.fetchIssues(this.tabsTranslate[val], 1)
    },
  },
  methods: {
    fetchIssues(type, page) {
      this.loading = true
      this.$axios
        .get(`/api/admin/tickets?type=${type}&page=${page}`)
        .then((res) => {
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
    this.fetchIssues('conflict', 1)
  },
}
</script>

<style></style>
