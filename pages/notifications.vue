<template>
  <div>
    <v-row>
      <v-spacer> </v-spacer>
      <v-btn
        color="blue-grey"
        class="ma-2 white--text mb-5"
        text
        @click="dialog = true"
      >
        ارسال اشعار
        <v-icon right dark> mdi-cloud-upload </v-icon>
      </v-btn>
    </v-row>
    <v-list>
      <template v-for="n in notifications">
        <v-list-item :key="n.id" class="rtl">
          <v-badge color="primary" dot class="ml-5" v-if="!n.isRead">
            <v-icon>{{ nIcons[n.category] }}</v-icon>
          </v-badge>
          <v-icon v-else class="ml-5">{{ nIcons[n.category] }}</v-icon>

          <v-list-item-content>
            <v-list-item-title>{{ n.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ n.body }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-list>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <span class="text-h5">إرسال إشعار</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="form.title"
              label="*عنوان الإشعار"
              required
              reverse
            ></v-text-field>
            <v-text-field
              v-model="form.body"
              label="*نص الإشعار"
              required
              reverse
            ></v-text-field>
            <v-select
              :items="userTypes"
              label="*حدد نوع المستخدمين"
              required
              v-model="form.notified"
              reverse
            ></v-select>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="sendNotification">
            ارسال
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            اغلاق
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="pageLoading" opacity="0.2">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: null,
      pageLoading: true,
      dialog: false,
      form: {
        title: '',
        body: '',
        notified: '',
      },
      nIcons: {
        userCreated: 'mdi-account',
        projectCreated: 'mdi-text-box-multiple-outline',
        withdrawalRequest: 'mdi-cash-minus',
      },
      userTypes: ['جميع المستخدمين', 'المستقلين', 'أصحاب العمل', 'الشركات'],
      userTypesTranslate: {
        'جميع المستخدمين': 'All',
        المستقلين: 'Freelancer',
        'أصحاب العمل': 'Bussinesman',
        الشركات: 'Company',
      },
    }
  },
  methods: {
    sendNotification() {
      this.form.notified = this.userTypesTranslate[this.form.notified]
      this.$axios
        .post('/api/admin/notifications', this.form)
        .then((res) => {
          this.$store.commit('showAlert', {
            isVisible: true,
            color: 'success',
            text: 'تم إرسال الإشعار بنجاح',
          })
          this.dialog = false
        })
        .catch((e) => {
          this.$store.commit('showAlert', {
            isVisible: true,
            color: 'error',
            text: 'حصل خطأ ما',
          })
        })
    },
    fetchNotifications() {
      this.$axios
        .get('/api/admin/notifications')
        .then((res) => {
          console.log(res.data)
          this.notifications = res.data
          // this.$store.commit('changeUnreadNotifications', res.data.unreadCount)
        })
        .catch((e) => {
          this.$store.commit('showAlert', {
            isVisible: true,
            color: 'error',
            text: 'حصل خطأ ما',
          })
        })
        .finally((e) => {
          this.pageLoading = false
        })
    },
  },
  mounted() {
    this.fetchNotifications()
  },
}
</script>

<style></style>
