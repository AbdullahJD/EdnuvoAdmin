<template>
  <div>
    <v-row class="mt-5">
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn class="primary py-2 mr-4" x-large @click="searchProjects">
        بحث
      </v-btn>
      <v-text-field
        v-model="searchQuery"
        outlined
        label="البحث"
        prepend-inner-icon="mdi-magnify"
        reverse
        class="mr-3"
        @keyup.enter="searchProjects"
      ></v-text-field>
    </v-row>
    <v-tabs v-model="tab" right>
      <v-tab v-for="(cTab, index) in tabs" :key="index">
        {{ cTab }}
      </v-tab>
    </v-tabs>
    <v-row class="mt-5" v-for="project in projects" :key="project.id">
      <v-col cols="3" v-if="tab === 3">
        <v-card outlined>
          <v-list>
            <template v-for="(item, index) in tabsActions[tab]">
              <v-list-item
                class="text-right"
                :key="index"
                @click="handleClick(item.action, project)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-icon
                  ><v-icon>{{ item.icon }} </v-icon></v-list-item-icon
                >
              </v-list-item>
              <v-divider v-if="index !== tabsActions[tab].length - 1">
              </v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col :cols="tab !== 3 ? 12 : 9">
        <v-card outlined class="rtl">
          <v-row>
            <v-col cols="9">
              <!-- <v-chip label color="success">{{ project.status }}</v-chip> -->
              <v-card-title>{{ project.title }}</v-card-title>
              <v-card-text>{{ project.description }}</v-card-text>
              <div class="d-flex align-center flex-wrap pr-4 pb-4">
                <span class="text-subtitle font-weight-bold"
                  >المهارات المطلوبة:</span
                >
                <div
                  v-for="(s, index) in project.RequiredSpecialties"
                  :key="index"
                >
                  <v-chip label class="mr-2">
                    {{ s.speciality }}
                  </v-chip>
                </div>
              </div>
            </v-col>
            <v-col class="d-flex justify-center align-center py-5">
              <v-card
                color="grey lighten-5 px-2 py-1"
                class="d-flex flex-column justify-center align-center"
                rounded
                outlined
              >
                <v-avatar size="64">
                  <img :src="project.profileImage" alt="no avatar" />
                </v-avatar>
                <v-card-title
                  >{{ project.firstName }} {{ project.lastName }}</v-card-title
                >
                <v-card-subtitle>{{ project.job }}</v-card-subtitle>
                <div>
                  <v-rating
                    color="warning"
                    background-color="warning"
                    empty-icon="mdi-star-outline"
                    full-icon="mdi-star"
                    half-icon="mdi-star-halfFull"
                    length="5"
                    readonly
                    size="19"
                    :value="project.rating"
                  ></v-rating>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-card outlined class="py-4" rounded="0">
                <v-row class="align-center justify-center">
                  <v-icon right> mdi-identifier </v-icon>
                  <div>
                    <div class="">رقم المشروغ</div>
                    <div class="font-weight-bold primary--text">
                      {{ project.id }}
                    </div>
                  </div>
                </v-row>
              </v-card>
            </v-col>
            <v-col>
              <v-card outlined class="py-4" rounded="0">
                <v-row class="align-center justify-center">
                  <v-icon right> mdi-message-text-outline </v-icon>
                  <div>
                    <div class="">عدد العروض</div>
                    <div class="font-weight-bold primary--text">
                      {{ project.offersCount }}
                    </div>
                  </div>
                </v-row>
              </v-card>
            </v-col>
            <v-col>
              <v-card elevation="0" rounded="0">
                <v-card outlined class="py-4">
                  <v-row class="align-center justify-center">
                    <v-icon right> mdi-star-outline</v-icon>
                    <div>
                      <div class="">التقييم المطلوب</div>
                      <div class="font-weight-bold primary--text">
                        {{ project.requiredRating }}
                      </div>
                    </div>
                  </v-row>
                </v-card>
              </v-card>
            </v-col>
            <v-col>
              <v-card elevation="0" rounded="0">
                <v-card outlined class="py-4">
                  <v-row class="align-center justify-center">
                    <v-icon right> mdi-tag-multiple-outline </v-icon>
                    <div>
                      <div class="">التخصص المطلوب</div>
                      <div class="font-weight-bold primary--text">
                        {{
                          project.speciality === 'programming'
                            ? 'برمجة'
                            : 'تصميم'
                        }}
                      </div>
                    </div>
                  </v-row>
                </v-card>
              </v-card>
            </v-col>
            <v-col>
              <v-card elevation="0" rounded="0">
                <v-card outlined class="py-4">
                  <v-row class="align-center justify-center">
                    <v-icon right> mdi-cog-outline </v-icon>
                    <div>
                      <div class="">نظام العمل</div>
                      <div class="font-weight-bold primary--text">
                        {{
                          project.requiredWorkSystem === 'FullProject'
                            ? 'بالمشروع'
                            : null
                        }}
                        {{
                          project.requiredWorkSystem === 'PhaseProject'
                            ? 'بالمراحل'
                            : null
                        }}
                        {{
                          project.requiredWorkSystem === 'HourProject'
                            ? 'بالساعات'
                            : null
                        }}
                      </div>
                    </div>
                  </v-row>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <span class="text-h5">رفض مشروع</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="reject.message"
              label="*سبب الرفض"
              required
              reverse
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="rejectProject()">
            ارسال
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              dialog = false
              reject = {}
            "
          >
            اغلاق
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-pagination
      v-model="page"
      :length="totalPages"
      class="my-10"
    ></v-pagination>
    <v-overlay :value="pageLoading" opacity="0.8">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageLoading: true,
      projects: null,
      totalItems: null,
      totalPages: null,
      page: 1,
      tab: 3,
      tabs: [
        'جميع المشاريع',
        'مشاريع قيد التنفيذ',
        'مشاريع جديدة',
        'مشاريع بإنتظار القبول',
      ],
      tabsTranslate: {
        0: 'all',
        1: 'inProgress',
        2: 'new',
        3: 'waitingAdmin',
      },
      tabsActions: {
        3: [
          {
            title: 'قبول المشروع',
            icon: 'mdi-check-decagram-outline',
            action: 'acceptProject',
          },
          {
            title: 'رفض المشروع',
            icon: 'mdi-close-octagon-outline',
            action: 'openDialog',
          },
        ],
        2: [],
        1: [],
        0: [],
      },
      searchQuery: '',
      dialog: false,
      reject: {
        id: '',
        message: '',
      },
    }
  },
  watch: {
    page(val) {
      this.fetchProjects(this.tabsTranslate[this.tab], val)
    },
    tab(val) {
      this.pageLoading = true
      this.fetchProjects(this.tabsTranslate[val], 1)
    },
  },
  methods: {
    fetchProjects(type, page) {
      this.pageLoading = true
      this.$axios
        .get(`/api/admin/projects?type=${type}&page=${page}`)
        .then((res) => {
          this.projects = res.data.data
          //   users.name = users.firstName + " " + users.lastName
          this.totalItems = res.data.total
          this.totalPages = Math.ceil(res.data.total / 3)
        })
        .finally((e) => {
          this.pageLoading = false
        })
    },
    acceptProject(project) {
      // but in brackets because of backend expects it to be in array
      this.$axios
        .post('/api/admin/projects/accept', { id: [project.id] })
        .then((res) => {
          this.fetchProjects('waitingAdmin', this.page)
        })
        .catch((e) => {
          this.$store.commit('showAlert', {
            isVisible: true,
            text: e.response.data,
            color: 'error',
          })
        })
        .finally((f) => {
          this.fetchProjects(this.tabsTranslate[tab], this.page)
        })
    },
    openDialog(project) {
      this.dialog = true
      this.reject.id = [project.id]
    },
    rejectProject(project) {
      // but in brackets because of backend expects it to be in array

      this.$axios
        .post('/api/admin/projects/reject', this.reject)
        .then((res) => {
          this.fetchProjects('waitingAdmin', this.page)
          this.dialog = false
          this.reject = {}
        })
        .catch((e) => {
          console.log(e.response.data)
        })
    },
    handleClick(callback, param) {
      // console.log(callback)
      this[callback](param)
    },
    searchProjects() {
      this.pageLoading = true
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
        .get(
          `/api/admin/projects/search?${type}=${query}&type=${
            this.tabsTranslate[this.tab]
          }`
        )
        .then((res) => {
          if (type === 'id') {
            this.projects = []
            this.projects.push(res.data)
            this.totalPages = 1
            this.page = 1
          } else {
            this.projects = res.data.data
            this.totalItems = res.data.total
            this.totalPages = Math.ceil(res.data.total / 10)
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
          this.pageLoading = false
        })
    },
  },
  mounted() {
    this.fetchProjects('waitingAdmin', 1)
  },
}
</script>

<style></style>
