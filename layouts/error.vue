<template>
  <div class="content-error d-flex align-center justify-center flex-column">
    <div
      class="content-error__box-img d-flex align-center justify-center flex-column px-8"
    >
      <img class="content-error__img mb-8" :src="dataError.img" />
      <p class="content-error__title mb-4" v-html="$t(dataError.title)"></p>
      <p
        v-if="dataError.sub_title"
        class="content-error__sub-title"
        v-html="$t(dataError.title)"
      ></p>

      <ButtonBasic
        v-if="dataError.action"
        class="mt-4"
        hover="var(--v-basic_accent_1_hue_1-base)"
        :text="dataError.text_action"
        @click="goItemAction(dataError.action)"
      />
    </div>
  </div>
</template>

<script>
import ButtonBasic from '~/components/ui/buttons/ButtonBasic';

export default {
  name: 'Error',

  components: {
    ButtonBasic
  },

  layout: `errorPage/error`,

  props: {
    error: {
      type: Object,
      default: () => null
    }
  },

  computed: {
    dataError() {
      if (this.error && this.error.statusCode == 500) {
        return {
          img: this.error.params
            ? this.error.params.img
            : '/img/errorPage/unknownErrorImg.svg',
          title: this.error.params
            ? this.error.params.title
            : 'error_pages_unknown_error_title',
          sub_title: this.error.params ? this.error.params.sub_title : '',
          action: this.error.params ? this.error.params.action : '',
          text_action: this.error.params ? this.error.params.text_action : ''
        };
      }
      if (this.error && this.error.statusCode == 404) {
        return {
          img: this.error.params
            ? this.error.params.img
            : '/img/errorPage/error_404.svg',
          title: this.error.params
            ? this.error.params.title
            : 'error_pages_404_title',
          sub_title: this.error.params ? this.error.params.sub_title : '',
          action: this.error.params ? this.error.params.action : '',
          text_action: this.error.params ? this.error.params.text_action : ''
        };
      }
      return {
        img: '/img/errorPage/unknownErrorImg.svg',
        title: 'error_pages_unknown_error_title',
        sub_title: '',
        action: '',
        text_action: ''
      };
    }
  },

  mounted() {
    console.log('this.error', this.error, this.getUser);
  },

  methods: {
    goItemAction(link) {
      const path = this.localePath({ path: link });
      this.$router.push(path);
    }
  }
};
</script>

<style lang="sass">
@import '@/assets/variables.sass'

.content-error
  height: 100%
  width: 100%

  &__title
    font-size: 2rem
    font-weight: 600

  &__sub-title
    font-size: 1.5rem
    font-weight: 400
    max-width: 900px
  &__box-img
    max-width: 400px

    @include respond-to(medium-screens)
      max-width: 500px

    @include respond-to(large-screens)
      max-width: 700px

    @include respond-to(wide-screens)
      max-width: 900px

    @media screen and (max-height: 768px)
      max-width: 600px

  &__img
    width: 100%
</style>
