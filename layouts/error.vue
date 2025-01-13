<template>
  <v-app>
    <div class="text-center">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <NuxtLink to="/"> الصفحة الرئيسية </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'defaultLayout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'الصفحة غير موجودة',
      otherError: 'حصل خطأ ',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
