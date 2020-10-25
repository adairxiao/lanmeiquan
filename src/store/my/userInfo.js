const state = {
  userInfo: {
    user_id: '',
    name: '',
    sex: '',
    birthday: '',
    height: '',
    weight: '',
    city: '',
    Signature: '',
    certification_information: '',
    set_subscription: '',
    set_WeChat: '',
  },
}

const getters = {}

const mutations = {
  upDate(state, payload) {
    for (const [key, value] of Object.entries(payload)) {
      state.userInfo[`${key}`] = value
    }
  },

  updateItem(state, item) {
    // item {key,value}
    // 更新某个项
    state.userInfo[`${item.key}`] = item.value
  },
}

const actions = {
  upDateAsync(context) {
    // 请求数据，伪请求数据
    return new Promise(function(resolve) {
      setTimeout(function() {
        let data = {
          user_id: '101566',
          name: 'adair',
          sex: '男',
          birthday: '1994-03-28 白羊座',
          height: '169',
          weight: '48',
          city: '杭州',
          Signature: '我就是我，不一样的烟火哈哈哈',
          certification_information: '模特',
          set_subscription: '',
          set_WeChat: '',
        }
        resolve(data)
      }, 2000)
    }).then((res) => {
      context.commit('upDate', res)
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
