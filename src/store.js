import Vuex from "vuex";
import Vue from "vue";
//...need import some store
import articleStore from "./components/article/store";
//load vuex
Vue.use(Vuex);

//create store
export default new Vuex.Store({
  modules: {
    ...articleStore,
    strict: true,
    //...need some module here
  },
});
