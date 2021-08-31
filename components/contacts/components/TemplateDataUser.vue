<template lang="pug">
.data-user.d-flex.flex-column.align-center.justify-start
  .data-user__header.d-flex.flex-row.align-center.justify-center
    .data-user__header-box-avatar.d-flex.align-center.justify-center
      img(:src="`${data.avatar? data.avatar : '/img/null.png'}`" width="100%")

    .data-user__header-box-info.d-flex.flex-column
      .data-user__header-data-user.d-flex.flex-column.mb-5
        p.data-user__name-user {{data.name}}
        p.data-user__role-user {{data.role}}

      .data-user__header-actions.d-flex.flex-row
        a.data-user__link-external(:href='"mailto:"+`${data.emails[0]}`')
          button-basic.mr-3(
            hover="#4B59C5"
            background="#6B59CC"
            color="#fff"
            text="button_text_basic_message"
            textHover="#fff"
            fontSize="16px"
            textFontWeight="700"
            textTransform="none"
            paddingX="20px"
            height="40px"
            borderRadius="10px"
          )
            template(v-slot:button-icon-before)
              v-icon.button-basic__icon.button-basic__icon_white.mr-2(size=18) mdi-forum

        a.data-user__link-external(:href='"tel:"+`${data.phones[0]}`')        
          button-basic.mr-3(
            hover="rgba(77, 76, 172, 0.1)"
            background="#fff"
            width="40px"
            height="40px"
            borderRadius="10px"
            borderColor="#ECEEF5"
            :outlined="true"
            borderHeight="1px"
          )
            template(v-slot:button-icon-before)
              v-icon.button-basic__icon(size=18) mdi-phone

        v-menu(
          role="action-menu"
        )
          template(v-slot:activator="slotData")
            button-basic.align-center(
              :slotData="slotData"
              hover="rgba(77, 76, 172, 0.1)"
              background="#fff"
              width="40px"
              height="40px"
              borderRadius="10px"
              borderColor="#ECEEF5"
              :outlined="true"
              borderHeight="1px"
            )
              template(v-slot:button-icon-before)
                v-icon.button-basic__icon(size=18) mdi-dots-horizontal

          v-list.action-menu__list
            v-list-item.action-menu__item(
              v-for="(action,index) in menuAction"
              :key="action.id"
              @click="setContactStore(data, action.value)"
            )
              p.action-menu__title {{action.title}}

  .data-user__info-contacts.contacts-info.d-flex.flex-column.align-center
    v-row.contacts-info.d-flex.flex-row
      v-col.d-flex.justify-end(cols=3)
        p.contacts-info__title Биография:
      v-col(cols=9)
        p.contacts-info__desc {{data.bio}}

    v-row.contacts-info.d-flex.flex-row
      v-col.d-flex.justify-end(cols=3)
        p.contacts-info__title Email:
      v-col(cols=9)
        .d-flex.flex-row.align-center.mb-3(
          v-for="(email,index) in data.emails"
          :key="index"
        )
          p.contacts-info__desc {{email}}
          v-icon.button-basic__icon.ml-3(v-if="index == 0" size=18) mdi-clippy
        
    v-row.contacts-info.d-flex.flex-row
      v-col.d-flex.justify-end(cols=3)
        p.contacts-info__title Телефон:
      v-col(cols=9)
        .d-flex.flex-row.align-center.mb-3(
          v-for="(phone,index) in data.phones"
          :key="index"
        )
          p.contacts-info__desc {{phone}}
          v-icon.button-basic__icon.ml-3(v-if="index == 0" size=18) mdi-clippy

</template>

<script>
import { mapActions } from 'vuex';
import ButtonBasic from '~/components/ui/buttons/ButtonBasic';

export default {
  name: 'TemplateDataUser',

  components: {
    ButtonBasic
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  emits: ['delete:item-contact'],

  data() {
    return {
      menuAction: [
        { id: 'change', title: 'Редактировать', value: 'change' },
        { id: 'del', title: 'Удалить', value: 'delete' }
      ]
    };
  },

  methods: {
    ...mapActions(['setSelectedContact', 'setSelectedContactAction']),

    setContactStore(data, action) {
      if (action === 'change') {
        this.setSelectedContactAction('change');
        return false;
      }
      if (action === 'delete') {
        this.$emit('delete:item-contact', data.id);
        return false;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/variables.sass'

p,span,li
  padding: 0
  margin: 0

.data-user
  width: 100%
  max-height: 100%

  &__header
    width: 100%
    padding: 0 12px
    margin-bottom: 40px

  &__header-box-avatar
    width: 114px
    height: 114px
    border-radius: 26px
    overflow: hidden
    margin-right: 25px

  &__header-title
    margin-left: 40px
    font-size: 20px
    font-weight: bold

  &__name-user
    font-size: 20px
    font-weight: 700
    line-height: 1.2

  &__role-user
    font-size: 14px
    font-weight: 400
    color: #8083A3

  &__info-contacts
    width: 100%

  &__link-external
    text-decoration: none

.button-basic
  &__icon
    &::before
      color: #8083A3
    &_white::before
      color: #fff

.v-menu__content[role="action-menu"]
  z-index: 10 !important
  box-shadow: none
  border-radius: 10px
  background-color: #fff
  box-shadow: 0px 6px 40px 0px rgba(0,0,0,0.04)

.action-menu
  &__item
    min-height: 30px

  &__title
    color: #8083A3
    font-size: 14px

.contacts-info
  max-width: 600px
  width: 100%

  &__title
    font-size: 14px
    color: #8083A3

  &__desc
    font-size: 14px
</style>
