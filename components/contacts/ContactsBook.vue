<template lang="pug">
.contacts-book.d-flex.flex-column
  .contacts-book__header.d-flex.flex-row.align-center
    .contacts-book__header-box-avatar.d-flex.align-center.justify-center
      img(:src="`${dataUser.img}`" width="100%")

    p.contacts-book__header-title {{$t('contacts_header_title')}}

    v-spacer
    button-basic.align-center(
      hover="rgba(77, 76, 172, 0.1)"
      background="#fff"
      width="40px"
      height="40px"
      borderRadius="10px"
      borderColor="#ECEEF5"
      :outlined="true"
      borderHeight="1px"
      @click="addNewContact"
    )
      template(v-slot:button-icon-before)
        v-icon(size=18 color="#8083A3") mdi-account-plus
        
  .contacts-book__list-contacts
    .search-contacts.d-flex.flex-column
      .search-contacts__box-input.d-flex.flex-column
        p.search-contacts__label {{$t('contacts_search_label')}}
        v-text-field.my-input.mt-0.pt-0(
          v-model="searchContacts"
          :placeholder="$t('contacts_search_input_placeholder')"
          hide-details
        )
          template(v-slot:append)
            v-icon.search-contacts__icon-search(size="18" color="#8083A3") mdi-magnify
      
  .sort-items.d-flex.flex-row.align-center
    v-menu(
      role="sort-menu"
    )
      template(v-slot:activator="{ on, attrs }")
        .sort-items__activator.d-flex.flex-row.align-center(
          v-bind="attrs"
          v-on="on"
        )
          p.sort-items__title-selected.mr-8(
            v-bind="attrs"
            v-on="on"
          ) {{selectSort[selectionSort].title}} 

          .sort-items__box-arrow.d-flex.flex-column.align-center
            v-icon.sort-items__icon-sort(:class="sortDir==='asc'? 'sort-items__icon-sort_active': ''" size="16"  @click.stop="sortDirValue('asc')") mdi-chevron-up
            v-icon.sort-items__icon-sort(:class="sortDir==='desc'? 'sort-items__icon-sort_active': ''" size="16" @click.stop="sortDirValue('desc')") mdi-chevron-down

      v-list.sort-items__list
        v-list-item.sort-items__item(
          v-for="(item,index) in selectSort"
          :key="index"
          @click="selectionSort = index"
        )
          p.sort-items__title-selection(:class="item.id === selectSort[selectionSort].id? 'sort-items__title-selection_active': ''") {{item.title}}

  #list-contacts.box-items.d-flex.flex-column.align-center
    p.box-items__not-data(v-if="!dataContacts.length") Нет данных
    .box-items__item(
      v-for="contact in dataContacts"
      :key="contact.id"
      v-if="dataContacts.length"
    )
      contact-card(:dataUser="contact" @delete:item-contact="deleteContactById" :disabled="allContactsDisabled" :activeView="activeViewContact")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonBasic from '~/components/ui/buttons/ButtonBasic';
import ContactCard from '~/components/contacts/components/ContactCard';

export default {
  name: 'ContactsBook',

  components: {
    ButtonBasic,
    ContactCard
  },

  data() {
    return {
      dataUser: {
        img: ''
      },
      searchContacts: '',
      dataContacts: [],
      selectionSort: 0,
      sortDir: '',
      page: 1,
      perPage: 10,
      selectSort: [
        { id: 'name', value: 'name', title: 'Имя' },
        { id: 'role', value: 'role', title: 'Роль' }
      ],
      allContactsDisabled: false,
      activeViewContact: '',
      requestTimeOut: '',

      lengthArrContacts: ''
    };
  },

  computed: {
    ...mapGetters(['GET_SELECTED_CONTACT'])
  },

  watch: {
    GET_SELECTED_CONTACT: {
      handler(v) {
        if (!v.action || v.action === 'view') {
          this.allContactsDisabled = false;
        }
        if (v.action == 'change') {
          this.allContactsDisabled = true;
        }
        this.activeViewContact = v.dataUser ? v.dataUser.id : '';
      },
      deep: true
    },

    sortDir(v) {
      this.getContacts(v);
    },

    selectionSort(v) {
      this.getContacts(v);
    },

    searchContacts(v) {
      this.getContactMitDelay(v);
    }
  },

  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  async mounted() {
    this.dataUser.img = this.$auth.user.img
      ? this.$auth.user.img
      : '/img/null.png';
    this.$root.$on('get:new-contacts', this.getContacts);

    // const element = document.getElementById('list-contacts');
    // element.addEventListener('scroll', this.handleScroll);

    await this.getContacts();
    // this.handleScroll();
  },

  methods: {
    ...mapActions(['setSelectedContact']),

    handleScroll() {
      const scrollHeight = document.getElementById('list-contacts')
        .scrollHeight;
      const scrollTop = document.getElementById('list-contacts').scrollTop;
      const offsetHeight = document.getElementById('list-contacts')
        .offsetHeight;
      console.log(
        this.dataContacts.length,
        this.lengthArrContacts,
        scrollTop,
        scrollHeight - offsetHeight,
        scrollHeight,
        offsetHeight,
        this.page,
        this.dataContacts
      );
      if (scrollHeight <= offsetHeight) {
        console.log(
          this.dataContacts.length,
          this.lengthArrContacts,
          scrollTop,
          scrollHeight - offsetHeight,
          this.page
        );
        // this.dataContacts = [];
        this.page++;
        this.getContactMitDelay();
        return;
      }
      if (scrollTop >= scrollHeight - offsetHeight) {
        if (this.dataContacts.length == this.lengthArrContacts) return;
        this.page++;
        this.getContactMitDelay();
      }
    },

    async getContacts() {
      const params = {
        page: this.page,
        perPage: this.perPage,
        sortBy: this.selectSort[this.selectionSort].value,
        sortDir: this.sortDir,
        search: this.searchContacts
      };

      let resultRespContacts;
      try {
        resultRespContacts = await this.$axios.get(`contacts/`, {
          params: params
        });
      } catch (e) {
        console.log('Error getContacts', e);
      }
      if (resultRespContacts) {
        this.dataContacts = resultRespContacts.data.items.map(item => {
          return {
            id: item._id,
            name: item.name,
            role: item.role,
            avatar: '',
            bio: item.bio,
            phones: item.phones,
            emails: item.emails
          };
        });
        this.lengthArrContacts = resultRespContacts.data.meta.total;
      }
    },

    sortDirValue(value) {
      if (this.sortDir === value) {
        this.sortDir = '';
        return false;
      }
      if (this.sortDir !== value) {
        this.sortDir = value;
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
        this.getContacts();
        if (this.GET_SELECTED_CONTACT.dataUser.id === id) {
          this.setSelectedContact({});
        }
      }
    },

    addNewContact() {
      this.$root.$emit('add-new-contact', true);
      this.activeViewContact = '';
    },

    getContactMitDelay() {
      clearTimeout(this.requestTimeOut);
      this.requestTimeOut = setTimeout(() => {
        this.getContacts();
      }, 500);
    }
  }
};
</script>

<style lang="sass">
.search-contacts
  @include placeholder(16px,700,#1A1C1D)
</style>

<style lang="sass" scoped>
@import '@/assets/variables.sass'

p,span,li
  margin: 0
  padding: 0
  color: #1A1C1D

.contacts-book
  width: 35vw
  height: 100vh
  background-color: #FAF9FF
  border-left: 3px solid #ECEEF5

  &__header
    padding: 20px
    width: 100%
    border-bottom: 1px solid #ECEEF5

  &__header-box-avatar
    width: 40px
    height: 40px
    border-radius: 8px
    overflow: hidden

  &__header-title
    margin-left: 40px
    font-size: 20px
    font-weight: bold

  &__list-contacts
    padding: 30px
    padding-bottom: 0

.search-contacts
  &__label
    margin-bottom: 8px
    font-size: 14px
    color: #8083A3
    font-weight: 400

.sort-items
  padding: 20px 30px 30px 30px

  &__item
    min-height: 30px

  &__title-selected
    font-size: 14px
    color: #8083A3

  &__title-selection
    font-size: 14px
    color: #8083A3
    &_active
      color: #6B59CC

  &__icon-sort
    &::after
      display: none
    &::before
      color: #8083A3
      opacity: 0.4
    &_active::before
      color: #6B59CC
      opacity: 1

.box-items
  width: 100%
  padding: 0 15px
  margin-bottom: 30px
  overflow: hidden
  overflow-y: scroll
  max-height: 100vh
  height: 100%
  scrollbar-width: none

  &::-webkit-scrollbar
    display: none

  &__item
    width: 100%

  &__not-data
    font-size: 14px
    font-style: italic
    color: #8083A3

.v-menu__content[role="sort-menu"]
  z-index: 10 !important
  box-shadow: none
  border-radius: 10px
  background-color: #fff
  box-shadow: 0px 6px 40px 0px rgba(0,0,0,0.04)
</style>
