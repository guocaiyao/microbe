import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    isShowLoading: false,
    isList: false
}

const mutations={
    show(state){
        state.isShowLoading = true;
    },
    hide(state){
        state.isShowLoading = false;
    },
    isListFun(state,value){
        state.isList = value;
    }
}

export default new Vuex.Store({
    state,
    mutations
})