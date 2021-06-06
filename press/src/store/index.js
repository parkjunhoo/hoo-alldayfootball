import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawerBool:false,
  },
  mutations: {
    set_drawerBool(state,bool){
      state.drawerBool = bool;
    },
  },
  actions: {
  },
  modules: {
  }
})
