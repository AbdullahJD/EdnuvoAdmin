<template>
  <div>
    <v-sheet width="600" color="transparent">
      <v-row>
        <v-btn class="primary mr-4" x-large @click="callBack(searchFunction)">
          بحث
        </v-btn>
        <v-text-field
          v-model="searchQuery"
          outlined
          label="البحث"
          prepend-inner-icon="mdi-magnify"
          reverse
          @keyup.enter="callBack(searchFunction)"
        ></v-text-field>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    searchFunction: {
      type: Function,
    },
    searchQuery: {
      required: true,
    },
  },
  methods: {
    callBack(func) {
      func
    },
  },
}
</script>

<style></style>
