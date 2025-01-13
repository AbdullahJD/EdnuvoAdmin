<template>
  <div>
    <!-- {{ }} -->
    <v-row>
      <v-col cols="9">
        <div style="height: 80vh" class="grey lighten-4">
          <div style="height: 90%" class="white px-4 py-4 overflow-y-auto">
            <div
              label
              v-for="message in messages"
              :key="message.message.id"
              class="d-flex d-flex flex-column flex-wrap mt-2"
              :class="[
                message.sender.id === $auth.user.id
                  ? 'align-end'
                  : 'align-start',
              ]"
            >
              <div class="text-subtitle">
                {{ message.sender.firstName }} {{ message.sender.lastName }}
              </div>
              <v-card
                :class="
                  message.sender.id === $auth.user.id ? 'primary' : 'grey'
                "
                dark
                class="text-right px-5 py-2"
                style="max-width: 50%"
                elevation="0"
              >
                {{ message.message.body }}
              </v-card>
            </div>
          </div>

          <div style="height: 10%" class="d-flex items-center">
            <v-btn
              primary
              large
              color="primary"
              class="mr-4"
              style="height: 90%"
              @click="sendMessage()"
              >ارسال</v-btn
            >
            <v-text-field
              style="width: 70%; shadow: none"
              class="elevation-0"
              v-model="message"
              label="اكتب رسالتك هنا"
              outlined
              reverse
              @keyup.enter="sendMessage()"
            ></v-text-field>
          </div>
        </div>
      </v-col>
      <v-col cols="3">
        <v-card
          outlined
          class="text-right py-2 d-flex flex-column align-end"
          v-if="project"
        >
          <div class="px-3">{{ project.id }}# معلومات المشروع</div>
          <v-card-title>
            {{ project.title }}
          </v-card-title>
          <v-card-subtitle
            >{{ project.requiredWorkSystem }} نظام العمل
          </v-card-subtitle>

          <v-chip class="mx-3">
            {{ project.status }}
          </v-chip>
          <v-card-text>
            {{ project.description }}
          </v-card-text>
        </v-card>
        <v-card
          outlined
          class="text-right py-2 d-flex flex-column align-end mt-5"
          v-if="project"
        >
          <div class="px-3">{{ developer.id }}# معلومات المطور</div>
          <v-card-title>
            {{ developer.firstName }}

            {{ developer.lastName ? developer.lastName : null }}
          </v-card-title>

          <v-chip class="mx-3">
            {{ developer.profile.speciality }}
          </v-chip>
          <v-card-text> </v-card-text>
        </v-card>
        <v-card
          outlined
          class="text-right py-2 d-flex flex-column align-end mt-5"
          v-if="project"
        >
          <div class="px-3 pb-3">{{ offer.id }}# معلومات العرض</div>

          <v-chip class="mx-3">
            {{ offer.status }}
          </v-chip>
          <v-card-text> {{ offer.description }}</v-card-text>
          <!-- {{ offer.offer_type }} -->
          <full-project-offer
            v-if="offer.offer_type === 'App\\Models\\FullProjectOffer'"
            :offer="offer"
            :startDate="project.startDate"
          />
          <hour-project-offer
            v-if="offer.offer_type === 'App\\Models\\HourProjectOffer'"
            :offer="offer"
            :startDate="project.startDate"
          />
          <phase-project-offer
            v-if="offer.offer_type === 'App\\Models\\PhaseProjectOffer'"
            :offer="offer"
            :startDate="project.startDate"
          />
        </v-card>
        <v-btn color="primary" @click="dialog = true" class="mt-5" block>
          حل النزاع
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <span class="text-h5">حل نزاع</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-select
              v-model="form.action"
              :items="options"
              label="اختر الرد"
              outlined
              reverse
            ></v-select>
            <div v-if="optionsTranslate[form.action] === 'closeProject'">
              <v-text-field
                v-model="form.developerPercentage"
                label="نسبة المطور"
                type="number"
                :rules="rules"
                append-icon="mdi-percent-outline"
                max="100"
                min="0"
                required
                reverse
              ></v-text-field>
              <v-text-field
                v-model="bussinesPercentage"
                label="نسبة العميل"
                append-icon="mdi-percent-outline"
                readonly
                disabled
                reverse
              ></v-text-field>
            </div>

            <!-- <v-text-field label="*سبب الرفض" required reverse></v-text-field> -->
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="projectAction()"
            :disabled="invalidP"
            :loading="loading"
          >
            ارسال
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              dialog = false
              form = {}
            "
          >
            اغلاق
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FullProjectOffer from '~/components/fullProjectOffer.vue'
import hourProjectOffer from '~/components/hourProjectOffer.vue'
import PhaseProjectOffer from '~/components/phaseProjectOffer.vue'
export default {
  components: { hourProjectOffer, FullProjectOffer, PhaseProjectOffer },
  data() {
    return {
      data: null,
      message: '',
      messages: '',
      dialog: false,
      developer: null,
      bussinesman: null,
      offer: null,
      project: null,
      loading: false,
      options: ['استمرار المشروع', 'اغلاق المشروع مع النسبة'],
      optionsTranslate: {
        'اغلاق المشروع مع النسبة': 'closeProject',
        'استمرار المشروع': 'resumeProject',
      },
      rules: [
        (v) => !!v || 'مطلوب',
        (v) => v >= 0 || 'النسبة لا تقل عن صفر في المية',
        (v) => v <= 100 || 'النسبة لا تزيد عن مية في المية',
      ],
      form: {
        action: '',
        developerPercentage: null,
        conversationId: null,
      },
    }
  },
  computed: {
    bussinesPercentage() {
      let value = 100 - this.form.developerPercentage
      if (value > 100) {
        return 100
      }
      if (value < 0) {
        return 0
      } else {
        return value
      }
    },
    invalidP() {
      return (
        this.form.developerPercentage > 100 ||
        this.form.developerPercentage < 0 ||
        !this.form.action
      )
    },
  },
  methods: {
    fetchConversation(id) {
      this.$axios
        .get(`/api/admin/conversations/messages?conversationId=${id}`)
        .then((res) => {
          console.log(res.data)
          this.data = res.data
          this.developer = res.data.data.developer
          this.bussinesman = res.data.data.bussinesman
          this.offer = res.data.data.offer
          this.project = res.data.data.project
          this.messages = res.data.messages
        })
        .catch((e) => {
          this.$store.commit('showAlert', {
            isVisible: true,
            color: 'error',
            message: 'حصل خطأ ما',
          })
        })
    },
    sendMessage(message) {
      console.log(',', message)
      this.$axios

        .post('/api/admin/conversations/messages', {
          message: message ? message : this.message,
          conversationId: this.data.conversation.id,
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e.response.data)
        })
        .finally((e) => {
          this.message = ''

          this.fetchConversation(this.$route.params.id)
        })
    },
    projectAction() {
      this.loading = true
      this.form.action = this.optionsTranslate[this.form.action]

      this.form.conversationId = this.data.conversation.id
      this.$axios
        .post('/api/admin/tickets/close', this.form)
        .then((res) => {
          console.log(res.data)
          if (this.form.action === 'closeProject') {
            this.sendMessage(
              `تم تسليم نسبة ${this.form.developerPercentage}% للمطور، ونسبة ${this.bussinesPercentage}% للعميل`
            )
          }
          this.dialog = false
          // this.$router.push('/chat')
        })
        .catch((e) => {
          console.log(e.response.data)
        })
        .finally((e) => {
          // this.message = ''
          this.loading = false

          // this.fetchConversation(this.$route.params.id)
        })
    },
  },
  mounted() {
    this.fetchConversation(this.$route.params.id)
  },
}
</script>

<style></style>
