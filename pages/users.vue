<template>
  <div>
    <v-row class="mt-5">
      <v-btn
        v-for="(item, index) in buttons"
        :key="index"
        class="ml-3 ma-2"
        :color="item.color"
        dark
        @click="usersAction(item.action)"
      >
        {{ item.title }}
        <v-icon dark right> {{ item.icon }} </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn class="primary py-2 mr-4" x-large @click="searchUsers">
        بحث
      </v-btn>
      <v-text-field
        v-model="searchQuery"
        outlined
        label="البحث"
        prepend-inner-icon="mdi-magnify"
        reverse
        class="mr-3"
        @keyup.enter="searchUsers"
      ></v-text-field>
    </v-row>
    <v-tabs v-model="tab" right>
      <v-tab v-for="(cTab, index) in tabs" :key="index">
        {{ cTab }}
      </v-tab>
    </v-tabs>

    <v-data-table
      v-model="selectedUsers"
      :headers="headers"
      :items="users"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      class="elevation-1"
      hide-default-footer
      show-select
    >
      <template v-slot:item.media="{ item }">
        <v-btn @click="viewMedia(item.id, item.profile_type)" depressed>
          عرض الملفات
        </v-btn>
      </template>
      <template v-slot:item.isVerified="{ item }">
        <v-chip
          label
          :color="item.isVerified ? 'success' : 'error'"
          text-color="white"
        >
          {{ item.isVerified ? 'موثق' : 'غير موثق' }}
          <v-icon right>
            {{ item.isVerified ? 'mdi-check-decagram' : 'mdi-close-octagon' }}
          </v-icon>
        </v-chip>
      </template>
      <template v-slot:item.rating="{ item }">
        <div class="d-flex justify-center align-center">
          {{ item.rating }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.424"
            height="14.658"
            viewBox="0 0 15.424 14.658"
          >
            <path
              id="Path"
              d="M7.2,11.422l3.491,2.093a.838.838,0,0,0,1.253-.9l-.925-3.936,3.087-2.652a.831.831,0,0,0-.48-1.459L9.563,4.226,7.973.507a.845.845,0,0,0-1.548,0L4.835,4.217.771,4.559a.831.831,0,0,0-.48,1.459L3.379,8.67l-.925,3.936a.838.838,0,0,0,1.253.9Z"
              transform="translate(0.513 0.5)"
              fill="#ffcf59"
              stroke="#ffc545"
              stroke-width="1"
            />
          </svg>
        </div>
      </template>
      <template v-slot:item.userStatus="{ item }">
        <v-chip
          v-if="item.userStatus === 'activated'"
          label
          color="#CAE4DB"
          class="green--text"
        >
          مفعل
        </v-chip>
        <v-chip
          v-if="item.userStatus === 'new'"
          label
          outlined
          color="grey"
          class="grey--text"
        >
          جديد
        </v-chip>
        <v-chip
          v-if="item.userStatus === 'closed'"
          label
          outlined
          color="error"
          class="red--text"
        >
          مغلق
        </v-chip>
        <v-chip
          v-if="item.userStatus === 'verified'"
          label
          outlined
          color="#17A8FC"
          class="#0079BF"
        >
          بإنتظار القبول
        </v-chip>
      </template>
      <template v-slot:item.speciality="{ item }">
        <div class="d-flex justify-center align-center">
          {{ item.profile.speciality === 'programming' ? 'برمجة' : null }}
          {{ item.profile.speciality === 'design' ? 'تصميم' : null }}
          {{ item.profile.speciality === 'both' ? 'برمجة وتصميم' : null }}
          {{
            item.profile_type === 'App\\Models\\Bussinesman'
              ? item.profile.job
              : null
          }}
        </div>
      </template>
      <template v-slot:item.specificSpeciality="{ item }">
        <div class="d-flex justify-center align-center">
          {{ item.profile.specificSpeciality }}
        </div>
      </template>
    </v-data-table>
    <div>
      <v-pagination
        v-model="page"
        :length="totalPages"
        class="mb-10"
      ></v-pagination>
    </div>

    <v-bottom-sheet v-model="sheet">
      <v-card elevation="0" class="rtl">
        <v-subheader class="text-right mb-0">الروابط</v-subheader>
        <v-skeleton-loader
          v-if="!filesTiles"
          type="list-item-three-line"
          width="300"
        ></v-skeleton-loader>
      </v-card>
      <v-list class="d-flex flex-column align-end">
        <v-list-item v-for="(key, value, index) in filesTiles" :key="index">
          <div class="d-flex align-center">
            <a :href="key" target="_blank" class="font-bold" v-if="key">{{
              value
            }}</a>
            <div v-else>لم يرفع {{ value }} بعد</div>
          </div>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <v-dialog v-model="rejectDialog" persistent max-width="600px">
      <v-card class="px-5">
        <v-card-title>
          <v-spacer></v-spacer>
          <div class="text-h5">رفض مستخدمين</div>
          <v-spacer></v-spacer>
        </v-card-title>
        <div class="text-subtitle text-center">لجميع المستخدمين المحددين</div>
        <v-text-field
          v-model="rejectMessage"
          label="سبب الرفض"
          reverse
        ></v-text-field>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="usersAction(type)">
            ارسال
          </v-btn>
          <v-btn color="blue darken-1" text @click="rejectDialog = false">
            اغلاق
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedUsers: [],
      sheet: false,
      filesTiles: null,
      rejectDialog: false,
      rejectMessage: '',
      loading: true,
      tab: 2,
      page: 1,
      users: [],
      totalItems: 10,
      totalPages: 1,
      transactions: [],
      options: {},
      tabs: ['شركات', 'أصحاب المشاريع', 'المستقلين'],
      tabsTranslate: {
        2: 'Freelancer',
        1: 'Bussinesman',
        0: 'Company',
      },
      headers: [
        {
          text: 'الملفات',
          sortable: false,
          value: 'media',
        },
        {
          text: 'حالة الحساب',
          sortable: false,
          value: 'userStatus',
        },
        {
          text: 'تاريخ التسجيل',
          sortable: false,
          value: 'created_at',
        },
        {
          text: 'حالة التوثيق',
          sortable: false,
          value: 'isVerified',
        },
        {
          text: 'التقييم',
          sortable: false,
          value: 'rating',
        },
        {
          text: 'عدد المشاريع',
          sortable: false,
          value: 'projectsCount',
        },
        {
          text: 'التخصص الفرعي',
          sortable: false,
          value: 'specificSpeciality',
        },
        {
          text: 'التخصص',
          sortable: false,
          value: 'speciality',
        },
        {
          text: 'الإيميل',
          sortable: false,
          value: 'email',
        },
        {
          text: 'رقم الجوال',
          sortable: false,
          value: 'phone',
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
        {
          text: 'رقم الحساب',
          sortable: false,
          value: 'id',
        },
        { value: 'data-table-select' },
      ],
      buttons: [
        { title: 'حظر', color: 'error', icon: 'mdi-cancel', action: 'block' },
        {
          title: 'رفض',
          color: 'error',
          icon: 'mdi-close-octagon',
          action: 'reject',
        },
        {
          title: 'قبول',
          color: 'success',
          icon: 'mdi-checkbox-marked-circle ',
          action: 'accept',
        },
      ],
    }
  },
  watch: {
    page(val) {
      this.fetchUsers(this.tabsTranslate[this.tab], val)
    },
    tab(val) {
      this.fetchUsers(this.tabsTranslate[val], 1)
    },
  },
  methods: {
    fetchUsers(type, page) {
      this.loading = true
      this.$axios
        .get(`/api/admin/users?type=${type}&page=${page}`)
        .then((res) => {
          this.users = res.data.data
          //   users.name = users.firstName + " " + users.lastName
          this.totalItems = res.data.total
          this.totalPages = Math.ceil(res.data.total / 10)
        })
        .finally((e) => {
          this.loading = false
        })
    },
    viewMedia(userID, type) {
      this.sheet = true
      this.filesTiles = null

      this.$axios.get(`/api/admin/users/files?id=${userID}`).then((res) => {
        console.log(res.data)
        this.filesTiles = res.data
      })
    },
    searchUsers() {
      // this.loading = true
      // console.log(isNaN(this.searchQuery))
      let type
      let query
      if (isNaN(this.searchQuery)) {
        type = 'query'
        query = this.searchQuery
      } else {
        type = 'id'
        query = +this.searchQuery
      }

      this.$axios
        .get(`/api/admin/users/search?${type}=${query}`)
        .then((res) => {
          if (type === 'id') {
            this.users = []
            this.users.push(res.data)
            if (res.data.profile_type === 'App\\Models\\Bussinesman') {
              // this.tab = 1
            }
          } else {
            this.users = res.data.data
          }
        })
        .catch((e) => {
          this.$store.commit('showAlert', {
            isVisible: true,
            color: 'error',
            text: 'لا يوجد نتائج تطابق بحثك',
          })
        })
        .finally((e) => {
          this.loading = false
        })
    },
    usersAction(atype) {
      let type = atype
      if (!this.selectedUsers.length > 0) {
        return
      }
      if (type === 'reject' && !this.rejectMessage) {
        return (this.rejectDialog = true)
      }
      if (!type) {
        type = 'reject'
      }
      let ids = []
      this.selectedUsers.forEach((user) => {
        ids.push(user.id)
      })
      let payload = {
        id: ids,
        message: type === 'reject' ? this.rejectMessage : null,
      }
      this.$axios
        .post(`/api/admin/users/${type}`, payload)
        .then((res) => {
          console.log(res.data)
          this.$store.commit('showAlert', {
            isVisible: true,
            color: 'success',
            text: 'تم تحديث البيانات بنجاح',
          })
          this.filesTiles = res.data
          this.fetchUsers(this.tabsTranslate[this.tab], this.page)
        })
        .catch((e) => {
          this.$store.commit('showAlert', {
            isVisible: true,
            color: 'error',
            text: e.response.data,
          })
        })
        .finally((e) => {
          this.rejectMessage = ''

          this.rejectDialog = false
        })
    },
  },

  mounted() {
    this.fetchUsers('Freelancer', 1)
  },
}
</script>

<style></style>
