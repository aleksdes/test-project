<template lang="pug">
v-hover(
  v-slot="{ hover }"
)
  v-card.contact-card.d-flex.flex-row.align-center(
    elevation="0"
    color="transparent"
    :disabled="disabled"
    :class="activeView===dataUser.id ? 'contact-card_active': ''"
    @click="setContactStore(dataUser, 'view')"
  )
    .contact-card__header-box-avatar.d-flex.align-center.justify-center
      img(:src="`${dataUser.avatar || '/img/null.png'}`" width="100%")

    .contact-card__box-data-user.d-flex.flex-column
      p.contact-card__name-user {{dataUser.name}}
      p.contact-card__role-user {{dataUser.role}}

    v-spacer
    a.contact-card__link-external(:href='"mailto:"+`${dataUser.emails[0]}`')
      button-basic.align-center.mr-2(
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
          v-icon.button-basic__icon(size=18) mdi-forum

    a.contact-card__link-external(:href='"tel:"+`${dataUser.phones[0]}`')
      button-basic.align-center.mr-2(
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
          @click="setContactStore(dataUser, action.value)"
        )
          p.action-menu__title {{action.title}}

    
</template>

<script>
import { mapActions } from 'vuex';
import ButtonBasic from '~/components/ui/buttons/ButtonBasic';

export default {
  name: 'ContactCard',

  components: {
    ButtonBasic
  },

  props: {
    dataUser: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    activeView: {
      type: [String, Number],
      default: ''
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
    ...mapActions(['setSelectedContact']),

    setContactStore(data, action) {
      if (action === 'view') {
        this.setSelectedContact({ dataUser: data, action: 'view' });
        return false;
      }
      if (action === 'change') {
        this.setSelectedContact({ dataUser: data, action: 'change' });
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

.contact-card
  margin: 4px 0
  width: 100%
  padding: 16px
  border-radius: 12px
  &::before
    display: none
  &:hover
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05) !important
    .button-basic
      &__icon::before
        color: #6B59CC

  &__header-box-avatar
    width: 40px
    height: 40px
    border-radius: 8px
    overflow: hidden
    margin-right: 20px

  &__header-title
    margin-left: 40px
    font-size: 20px
    font-weight: bold

  &__name-user
    font-size: 14px
    font-weight: 700

  &__role-user
    font-size: 14px
    font-weight: 400
    color: #8083A3

  &__link-external
    text-decoration: none

.contact-card_active
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05) !important
  .button-basic
    &__icon::before
      color: #6B59CC

.button-basic
  &__icon::before
    color: #8083A3

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
</style>
