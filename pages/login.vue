<template>
  <div
    style="
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #eceef1;
    "
  >
    <v-card height="auto" width="600px" color="white">
      <v-toolbar color="#FD8F06">
        <v-spacer></v-spacer>
        <v-toolbar-title class="white--text text-right"
          >تسجيل دخول لوحة التحكم</v-toolbar-title
        >
      </v-toolbar>
      <v-card-text>
        <div v-show="errors">
          <v-alert
            outlined
            type="error"
            v-for="error in errors"
            :key="error[0]"
          >
            {{ error[0] }}
          </v-alert>
        </div>
        <v-form>
          <v-text-field
            outlined
            label="الإيميل"
            prepend-inner-icon="mdi-email"
            reverse
            v-model="form.email"
          ></v-text-field>
          <v-text-field
            outlined
            label="الباسوورد"
            prepend-inner-icon="mdi-lock"
            reverse
            type="password"
            v-model="form.password"
          ></v-text-field>
          <v-card-actions>
            <v-btn
              color="#FD8F06"
              dark
              large
              :loading="loading"
              @click="submitForm"
            >
              تسحيل الدخول</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.auth.loggedIn) {
      return redirect('/')
    }
  },
  data() {
    return {
      loading: false,
      form: {
        email: '',
        password: '',
        device_name: 'web',
      },
      errors: [],
    }
  },
  methods: {
    submitForm() {
      this.loading = true
      this.$auth
        .loginWith('local', { data: this.form })
        .then((res) => {
          console.log(res.data)
          this.$router.push('/')
          // this.$auth.strategy.token.set(res.data.token)
          //   this.$toast.success('تم تسجيل الدخول بنجاح', {
          //     duration: 2000,
          //     position: 'bottom-center',
          //     fullWidth: true,
          //   })
        })
        .catch((e) => {
          console.log(e.response.data.errors)
          this.errors = e.response.data.errors
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
