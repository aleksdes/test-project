<template lang="pug">
  v-app#app
    the-snackbar
    v-main.content-box
      nuxt-child

</template>

<script>
import TheSnackbar from '@/components/TheSnackbar';

export default {
  name: 'DefaultLayout',
  components: {
    TheSnackbar
  }
};
</script>

<style lang="sass">
@import '@/assets/variables.sass'
</style>
