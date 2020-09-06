const state = {
  blurDisplay: false,
};

const getters = {
  blurDisplay: (state) => {
    return state.blurDisplay;
  },
};

const actions = {};

const mutations = {
  set_blurDisplay(state, setStatus) {
    console.log("set_blurDisplay", setStatus);
    state.blurDisplay = setStatus;
  },
};

const appStore = {
  appStore: {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  },
};

export default appStore;
