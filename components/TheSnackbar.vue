<template>
  <div>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      id="snackbar"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="-1"
      :color="snackbar.color"
      :style="{ '--bottom': `${index * 60 + 5}px` }"
    >
      <p class="snackbar__text">{{ $t(snackbar.text) }}</p>

      <v-spacer></v-spacer>

      <template #action="{}">
        <v-btn text @click="closeSnackBar(snackbar.id)">
          {{ $t('snack_bar_for_all_text_btn_close') }}</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      snackbars: state => state.snackbar.snackbars
    })
  },

  methods: {
    ...mapMutations({ closeSnackBar: 'snackbar/setCloseSnackbarItem' })
  }
};
</script>

<style lang="sass">

#snackbar
  & .v-snack__wrapper
    bottom: var(--bottom) !important

  & p
    padding: 0
    margin: 0
    color: var(--v-text_colorText_secondary-base)
</style>
