
const state = {
  title: '高拍仪',
  visible: false, // 高拍仪拍摄弹窗
  loading: false
}

const mutations = {
  SET_VISIBLE(state, value) {
    state.visible = value
  },
  SET_LOADING(state, value) {
    state.loading = value
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
