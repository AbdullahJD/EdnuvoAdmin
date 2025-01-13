<template>
  <div class="mt-5">
    <stats type="general" :fetchStats="fetchStats" :stats="stats" />
    <div class="d-flex align-center my-10 w-full">
      <v-row class="align-center ml-1">
        <v-btn
          v-for="item in types"
          :key="item"
          @click="chooseType(item)"
          depressed
          class="px-4 py-1 font-weight-bold mr-2"
          :class="[type === item ? 'primary' : 'white']"
          >{{ typesTranslate[item] }}</v-btn
        >
      </v-row>

      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <div class="text-h5 mr-5">أخر الحركات</div>
        <svg
          id="Group_49641"
          data-name="Group 49641"
          xmlns="http://www.w3.org/2000/svg"
          width="21.849"
          height="21.621"
          viewBox="0 0 21.849 21.621"
        >
          <g id="Group_49288" data-name="Group 49288">
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1" data-name="Layer 1">
                <g id="swap_horiz" data-name="swap horiz">
                  <path
                    id="Path_40535"
                    data-name="Path 40535"
                    d="M17.125,4.59H3.737L6.244,2.071A1.111,1.111,0,0,0,4.7.538L.326,4.908a1.111,1.111,0,0,0,0,1.548l4.37,4.37A1.111,1.111,0,0,0,6.244,9.278l-2.507-2.5H17.125a1.093,1.093,0,0,0,0-2.185Z"
                    transform="translate(-0.012 -0.348)"
                    fill="#fd8f06"
                  />
                  <path
                    id="Path_40536"
                    data-name="Path 40536"
                    d="M27.347,34.386l-4.37-4.37a1.111,1.111,0,0,0-1.548,1.548l2.507,2.5H10.548a1.111,1.111,0,1,0,0,2.185H23.936l-2.507,2.518a1.111,1.111,0,0,0,1.548,1.548l4.37-4.37a1.111,1.111,0,0,0,0-1.563Z"
                    transform="translate(-5.819 -18.901)"
                    fill="#fd8f06"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
    <v-data-table
      :headers="type === 'deposits' ? headers : withdrawalHeaders"
      :items="transactions"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:item.isPaid="{ item }">
        <v-chip label :color="item.isPaid === 1 ? 'success' : 'error'">
          {{ item.isPaid === 1 ? 'مدفوع' : 'غير مدفوع' }}
        </v-chip>
      </template>
      <template v-slot:item.confirmWithdrawal="{ item }">
        <v-btn
          v-if="item.isPaid !== 1"
          depressed
          color="primary"
          @click="confirmWithdrawal(item.id)"
          >تأكيد</v-btn
        >
        <v-chip label v-if="item.isPaid === 1" depressed class="success">
          تم التأكيد
        </v-chip>
      </template>
    </v-data-table>
    <div>
      <v-pagination
        v-model="page"
        :length="totalPages"
        class="mb-10"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import stats from '~/components/stats.vue'
export default {
  components: { stats },
  data() {
    return {
      loading: true,
      page: 1,
      totalItems: null,
      totalPages: null,
      itemsPerPage: 10,
      transactions: [],
      type: 'deposits',
      types: ['withdrawalRequests', 'deposits'],
      typesTranslate: {
        deposits: 'ايداع',
        withdrawalRequests: 'سحب',
      },
      stats: {},
      options: {},
      headers: [
        {
          text: 'الحالة',
          sortable: false,
          value: 'isPaid',
        },
        {
          text: 'التاريخ',
          sortable: false,
          value: 'created_at',
        },
        {
          text: 'رقم العملية',
          sortable: false,
          value: 'orderId',
        },
        {
          text: 'المبلغ',
          sortable: false,
          value: 'amount',
        },
        {
          text: 'الإسم الأخير',
          sortable: false,
          value: 'lastName',
        },
        {
          text: 'الإسم الأول',
          sortable: false,
          value: 'firstName',
        },
      ],
      withdrawalHeaders: [
        {
          text: 'تأكيد الدفع',
          sortable: false,
          value: 'confirmWithdrawal',
        },
        {
          text: 'الحالة',
          sortable: false,
          value: 'isPaid',
        },
        {
          text: 'الأيبان',
          sortable: false,
          value: 'IBAN',
        },
        {
          text: 'اسم الحساب',
          sortable: false,
          value: 'accountName',
        },
        {
          text: 'رقم الحساب',
          sortable: false,
          value: 'accountNumber',
        },
        {
          text: 'المبلغ',
          sortable: false,
          value: 'amount',
        },
        {
          text: 'اسم البنك',
          sortable: false,
          value: 'bankName',
        },
        {
          text: 'الدولة',
          sortable: false,
          value: 'country',
        },

        {
          text: 'الرقم',
          sortable: false,
          value: 'id',
        },

        {
          text: 'ايميل البايبال',
          sortable: false,
          value: 'paypalEmail',
        },
        {
          text: 'السويفت',
          sortable: false,
          value: 'swiftCode',
        },
        {
          text: 'رقم المستخدم',
          sortable: false,
          value: 'user_id',
        },
      ],
    }
  },
  watch: {
    type(val) {
      this.fetchTransactions(val, 1)
    },
    page(val) {
      this.fetchTransactions(this.type, val)
    },
  },
  methods: {
    fetchStats(duration) {
      this.loading = true
      this.$axios
        .get(`api/admin/statistics/money?duration=${duration}`)
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
    chooseType(d) {
      this.type = d
    },
    confirmWithdrawal(withdrawalID) {
      this.$axios
        .post('/api/admin/withdrawalRequests/confirm', { id: withdrawalID })
        .then((res) => {
          this.fetchTransactions('withdrawalRequests', this.page)
          this.$store.commit('showAlert', {
            isVisible: true,
            text: res.data,
            color: 'success',
          })
          // console.log(res.data)
        })
        .catch((e) => {
          this.$store.commit('showAlert', {
            isVisible: true,
            text: e.response.data.errors,
            color: 'error',
          })
          console.log(e.response.data)
        })
    },
    fetchTransactions(type, page) {
      this.loading = true
      this.$axios
        .get(`/api/admin/${type}?page=${page}`)
        .then((res) => {
          this.transactions = res.data.data
          this.totalItems = res.data.total
          this.totalPages = Math.ceil(res.data.total / 10)
          console.log(res.data)
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
    this.fetchTransactions('deposits', 1)
  },
}
</script>

<style></style>
