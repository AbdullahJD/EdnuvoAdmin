<template>
  <v-list>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-subtitle>تاريخ البداية</v-list-item-subtitle>
        <v-list-item-title>{{ startDate }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item
      two-line
      v-for="(phase, index) in offer.offer.phases"
      :key="phase.id"
    >
      <div class="text-caption">
        {{ phase.status === 'inProgress' ? 'قيد العمل' : null }}
        {{ phase.status === 'new' ? 'جديدة' : null }}
        {{ phase.status === 'finished' ? 'منتهية' : null }}
      </div>
      <v-spacer></v-spacer>
      <div>
        <div>{{ phase.goal }} - {{ index + 1 }}</div>

        <div class="text-caption">{{ phase.cost }}</div>
      </div>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    offer: {
      required: true,
    },
    startDate: {
      required: true,
    },
  },
}
</script>

<style></style>
