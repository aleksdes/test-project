<template>
  <v-app>
    <v-main>
      <div class="mainContent">
        <div
          class="mainContent__content d-flex align-center justify-center"
          fluid
        >
          <Nuxt />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'ErrorPageDefault',
  components: {},

  data() {
    return {};
  },

  head: {
    meta: [
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    ]
  }
};
</script>

<style lang="sass" scoped>
.mainContent
  display: flex
  flex-direction: column
  height: 100%

  &__content
    flex: 1 0 auto
    background-color: var(--v-basic_primary-base)
</style>
