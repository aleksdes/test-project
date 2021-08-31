<template lang="pug">
v-form.add-contact.d-flex.flex-column.justify-center(
  ref="dataUser" v-model="dataUserForm" :lazy-validation="true"
)
  .add-contact__box-item.d-flex.flex-row
    .add-contact__item.mr-2
      p.add-contact__item-label Имя
      v-text-field.myInput(
        v-model="dataUser.name"
        :rules="fieldRequiredRules()"
        placeholder="Имя"
        required
        outlined
        dense
        height="40px"
      )
        template(v-slot:message='{key, message}')
          span.myInput-message.myInput-message_color-red {{$t(message)}}
    .add-contact__item.ml-2
      p.add-contact__item-label Должность/роль
      v-text-field.myInput(
        v-model="dataUser.role"
        :rules="fieldRequiredRules()"
        placeholder="Должность/роль"
        required
        outlined
        dense
        height="40px"
      )
        template(v-slot:message='{key, message}')
          span.myInput-message.myInput-message_color-red {{$t(message)}}

  .add-contact__item
    p.add-contact__item-label Био
    v-textarea.myInput(
      class="myInput_textarea-input"
      outlined
      placeholder="Биография"
      v-model="dataUser.bio"
      rows="2"
      type="text"
      no-resize
    )
  
  .add-contact__box-item.d-flex.flex-column.mb-4
    p.add-contact__item-label Телефон
    .d-flex.flex-row(
      v-for="(phone,index) in dataUser.phones"
      :key="phone.id"
    )
      .add-contact__item.d-flex.flex-column(style="width: 100%;")
        v-text-field.myInput.mr-3(
          v-model="phone.value"
          :rules="dataUser.phones.length === 1 || index===0 ? phoneReqRules() : phoneRules()"
          placeholder="Телефон"
          required
          outlined
          dense
          height="40px"
        )
          template(v-slot:message='{key, message}')
            span.myInput-message.myInput-message_color-red {{$t(message)}}

      .add-contact__item-action.d-flex.flex-row
        v-tooltip.tooltip-box(bottom)
          template(v-slot:activator="slotData")
            button-basic.mr-3(
              :slotData="slotData"
              :hover="index===0 ? '#6B59CC' : 'rgba(77, 76, 172, 0.1)'"
              :background="index===0 ? '#6B59CC' : '#fff'"
              width="40px"
              height="40px"
              borderRadius="10px"
              borderColor="#ECEEF5"
              :outlined="true"
              borderHeight="1px"
              @click="sendActivElement(dataUser.phones, index)"
            )
              template(v-slot:button-icon-before)
                v-icon(size=18 :color="index===0 ? '#fff' : '#8083A3'") mdi-clippy
          p.tooltip__title(style="color: #fff;" v-html="index===0 ? 'Основной': 'Сделать основным'") 

        button-basic(
          hover="rgba(77, 76, 172, 0.1)"
          background="#fff"
          width="40px"
          height="40px"
          borderRadius="10px"
          borderColor="#ECEEF5"
          :outlined="true"
          borderHeight="1px"
          @click="deleteItemElement(phone.id, 'phone')"
        )
          template(v-slot:button-icon-before)
            v-icon.button-basic__icon(size=18) mdi-close

    p.add-contact__add-new(@click="addNewElement('phone')") Добавить телефон 

  .add-contact__box-item.d-flex.flex-column
    p.add-contact__item-label Email
    .d-flex.flex-row(
      v-for="(email,index) in dataUser.emails"
      :key="email.id"
    )
      .add-contact__item.d-flex.flex-column(style="width: 100%;")
        v-text-field.myInput.mr-3(
          v-model="email.value"
          :rules="emailReqRules()"
          placeholder="Email"
          required
          outlined
          dense
          height="40px"
        )
          template(v-slot:message='{key, message}')
            span.myInput-message.myInput-message_color-red {{$t(message)}}

      .add-contact__item-action.d-flex.flex-row
        v-tooltip.tooltip-box(bottom)
          template(v-slot:activator="slotData")
            button-basic.mr-3(
              :slotData="slotData"
              :hover="index===0 ? '#6B59CC' : 'rgba(77, 76, 172, 0.1)'"
              :background="index===0 ? '#6B59CC' : '#fff'"
              width="40px"
              height="40px"
              borderRadius="10px"
              borderColor="#ECEEF5"
              :outlined="true"
              borderHeight="1px"
              @click="sendActivElement(dataUser.emails, index)"
            )
              template(v-slot:button-icon-before)
                v-icon(size=18 :color="index===0 ? '#fff' : '#8083A3'") mdi-clippy
          p.tooltip__title(style="color: #fff;" v-html="index===0 ? 'Основной': 'Сделать основным'") 

        button-basic(
          hover="rgba(77, 76, 172, 0.1)"
          background="#fff"
          width="40px"
          height="40px"
          borderRadius="10px"
          borderColor="#ECEEF5"
          :outlined="true"
          borderHeight="1px"
          @click="deleteItemElement(email.id, 'email')"
        )
          template(v-slot:button-icon-before)
            v-icon.button-basic__icon(size=18) mdi-close

    p.add-contact__add-new(@click="addNewElement('email')") Добавить Email

  .add-contact__action-all.d-flex.flex-row.align-center.justify-center.mt-6
    .d-flex
      button-basic.mr-3(
        hover="rgba(77, 76, 172, 0.1)"
        background="#fff"
        color="#8083A3"
        textHover="#8083A3"
        text="button_text_basic_cancel"
        paddingX="20px"
        height="40px"
        borderRadius="10px"
        borderColor="#ECEEF5"
        :outlined="true"
        borderHeight="1px"
        @click="cancelAddContact"
      )

    .d-flex
      button-basic.ml-3(
        hover="#4B59C5"
        background="#6B59CC"
        color="#fff"
        text="button_text_basic_save"
        textHover="#fff"
        fontSize="16px"
        textFontWeight="700"
        textTransform="none"
        paddingX="20px"
        height="40px"
        borderRadius="10px"
        :disabled="!valueSaveButtonDisabled"
        @click="saveAllDataContacts"
      )
        template(v-slot:button-icon-before)
          v-icon.button-basic__icon.button-basic__icon_white.mr-2(size=18) mdi-cube-send
</template>

<script>
import { mapActions } from 'vuex';
import ButtonBasic from '~/components/ui/buttons/ButtonBasic';
import validators from '~/mixins/validators.js';

export default {
  name: 'TemplateAddContact',

  components: {
    ButtonBasic
  },

  mixins: [validators],

  emits: ['get:new-contacts'],

  data() {
    return {
      dataUser: {
        name: '',
        role: '',
        bio: '',
        phones: [],
        emails: []
      },
      dataUserForm: true
      // phoneBasic: '',
      // emailBasic: '',
    };
  },

  computed: {
    valueAllValidate() {
      return this.dataUserForm;
    },

    valueSaveButtonDisabled() {
      return (
        this.valueAllValidate &&
        this.dataUser.phones.length &&
        this.dataUser.emails.length
      );
    }
  },

  methods: {
    ...mapActions(['setSelectedContact']),

    addNewElement(type) {
      switch (type) {
        case 'phone':
          this.dataUser.phones.push({
            id: Math.random(),
            value: '',
            basic: false
          });
          break;
        case 'email':
          this.dataUser.emails.push({
            id: Math.random(),
            value: '',
            basic: false
          });
          break;
      }
    },

    sendActivElement(arr, index) {
      let element = arr[index];
      arr.splice(index, 1);
      arr.splice(0, 0, element);
    },

    deleteItemElement(id, type) {
      console.log(id, type);
      switch (type) {
        case 'phone':
          this.dataUser.phones = this.dataUser.phones.filter(
            item => item.id !== id
          );
          break;
        case 'email':
          this.dataUser.emails = this.dataUser.emails.filter(
            item => item.id !== id
          );
          break;
      }
    },

    cancelAddContact() {
      this.$root.$emit('add-new-contact', false);
    },

    getArrFromObj(arr) {
      return arr.map(item => item.value);
    },

    async saveAllDataContacts() {
      if (!this.$refs.dataUser.validate()) return false;

      let sendDataContact;
      const dataContacts = {
        name: this.dataUser.name,
        role: this.dataUser.role,
        bio: this.dataUser.bio,
        phones: this.getArrFromObj(this.dataUser.phones),
        emails: this.getArrFromObj(this.dataUser.emails)
      };
      try {
        sendDataContact = await this.$axios.post(`contacts/`, dataContacts);
      } catch (e) {
        console.log('Error sendDataContact', e);
        if (e.response) {
          switch (e.response.status) {
            case 500:
              this.$store.dispatch('snackbar/setSnackbar', {
                id: Math.random(),
                color: 'basic_error',
                text: 'snack_bar_for_contact_add_message_wrong_data',
                timeout: 4000
              });
              break;
            case 400:
              this.$store.dispatch('snackbar/setSnackbar', {
                id: Math.random(),
                color: 'basic_error',
                text: 'snack_bar_for_contact_add_message_wrong_data',
                timeout: 4000
              });
              break;
            default:
              this.$store.dispatch('snackbar/setSnackbar', {
                id: Math.random(),
                color: 'basic_error',
                text: 'snack_bar_for_all_error_message_unknown_error',
                timeout: 4000
              });
              break;
          }
        } else {
          this.$store.dispatch('snackbar/setSnackbar', {
            id: Math.random(),
            color: 'basic_error',
            text: 'snack_bar_for_all_error_message_unknown_error',
            timeout: 4000
          });
        }
      }
      if (sendDataContact) {
        console.log('sendDataContact', sendDataContact);
        sendDataContact.data.id = sendDataContact.data._id;

        this.setSelectedContact({
          dataUser: sendDataContact.data,
          action: 'view'
        });

        this.$root.$emit('get:new-contacts');
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/variables.sass'

p,span,li
  margin: 0
  padding: 0

.add-contact
  width: 100%
  max-width: 400px
  max-height: 100%

  &::-webkit-scrollbar
    display: none

  &__item-label
    font-size: 13px
    color: #8083A3
    margin-bottom: 6px

  &__add-new
    color: #6B59CC
    font-size: 14px
    cursor: pointer

.button-basic
  &__icon
    &::before
      color: #8083A3
    &_white::before
      color: #fff
</style>
