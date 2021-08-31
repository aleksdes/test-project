export const state = () => ({
  selectedContact: {}
});

export const getters = {
  GET_SELECTED_CONTACT(state) {
    return state.selectedContact;
  }
};

export const mutations = {
  SET_SELECTED_CONTACT(state, contact) {
    state.selectedContact = contact;
  },

  SET_SELECTED_CONTACT_ACTION(state, action) {
    state.selectedContact.action = action;
  }
};

export const actions = {
  setSelectedContact({ commit }, data) {
    commit('SET_SELECTED_CONTACT', data);
  },

  setSelectedContactAction({ commit }, value) {
    commit('SET_SELECTED_CONTACT_ACTION', value);
  }
};
