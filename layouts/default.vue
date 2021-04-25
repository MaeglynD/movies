<template>
  <v-app light>
    <!-- Nuxt component, used loading pages -->
    <nuxt />

    <!-- Global snackbar -->
    <v-snackbar
      v-model="snackbar.visible"
      transition="scroll-y-transition"
      :color="snackbar.color"
      bottom
      right
      :timeout="-1"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    //
  }),

  computed: {
    ...mapState([
      'snackbar',
    ]),
  },

  async created() {
    //
  },
};
</script>
