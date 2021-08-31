<template lang="pug">
  .container-content.d-flex.flex-row
    contacts-book
    contact-item   
</template>

<script>
import ContactsBook from '@/components/contacts/ContactsBook';
import ContactItem from '@/components/contacts/ContactItem';

export default {
  name: 'Contacts',

  components: {
    ContactsBook,
    ContactItem
  },

  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="sass">
@import '@/assets/variables.sass'
.container-content
  width: 100vw
</style>
