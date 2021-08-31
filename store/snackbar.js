export const state = () => ({
  snackbars: []
});

export const mutations = {
  setSnackbarArr(state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar);
  },

  setCloseSnackbarItem(state, id) {
    state.snackbars.map(item => {
      if (item.id == id) {
        item.showing = false;
      }
    });
  }
};

export const getters = {
  getSnackbarArr(state) {
    return state.snackbars;
  }
};

export const actions = {
  setSnackbar({ commit }, snackbar) {
    let snackbarItem = snackbar;
    snackbarItem.id = snackbar.id;
    snackbarItem.showing = true;
    snackbarItem.color = snackbar.color || 'success';
    commit('setSnackbarArr', snackbarItem);
    setTimeout(() => {
      commit('setCloseSnackbarItem', snackbar.id);
    }, snackbar.timeout);
  }
};
