<template lang="pug">
//- .d-flex.align-center.justify-center(style="height: 95vh;")
.contact-item.d-flex.align-start.justify-center
  add-contact(v-if="templateAction === 'addNew'")
  change-contact(v-if="templateAction === 'change'" :data="dataUser")
  data-user(v-if="templateAction === 'default'" :data="dataUser" @delete:item-contact="deleteContactById")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddContact from '~/components/contacts/components/TemplateAddContact';
import ChangeContact from '~/components/contacts/components/TemplateChangeUser';
import DataUser from '~/components/contacts/components/TemplateDataUser';

export default {
  name: 'Contacts',

  components: {
    AddContact,
    ChangeContact,
    DataUser
  },

  data() {
    return {
      templateAction: '',
      dataUser: null
    };
  },

  computed: {
    ...mapGetters(['GET_SELECTED_CONTACT'])
  },

  watch: {
    GET_SELECTED_CONTACT: {
      handler(v) {
        if (!v.action) this.templateAction = '';
        if (v.action === 'view') {
          this.templateAction = 'default';
          this.dataUser = v.dataUser;
        }
        if (v.action === 'change') {
          this.templateAction = 'change';
          this.dataUser = v.dataUser;
        }
      },
      deep: true
    }
  },

  mounted() {
    this.$root.$on('add-new-contact', this.addNewContact);
  },

  methods: {
    ...mapActions(['setSelectedContact']),

    addNewContact(value) {
      if (value) {
        this.templateAction = 'addNew';
        return false;
      } else {
        this.templateAction = '';
        this.setSelectedContact({});
      }
    },

    async deleteContactById(id) {
      console.log('deleteContactById', id);
      let resultRespContacts;
      try {
        resultRespContacts = await this.$axios.delete(`contacts/${id}`);
      } catch (e) {
        console.log('Error getContacts', e);
      }
      if (resultRespContacts) {
        this.$root.$emit('get:new-contacts');
        if (this.GET_SELECTED_CONTACT.dataUser.id === id) {
          this.setSelectedContact({});
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/variables.sass'

.contact-item
  width: 65vw
  max-height: 95vh
  margin: auto 0
  overflow: hidden
  overflow-y: scroll
  scrollbar-width: none

  &::-webkit-scrollbar
    display: none
</style>
