import Vue from 'vue'

const state = {
  user_id: '',
  name: '',
  sex: '',
  birthday: '',
  height: '',
  weight: '',
  city: '',
  signature: '',
  certification_information: '',
  set_subscription: '',
  set_WeChat: '',
}

const getters = {
  // 返回全部信息
  userInfo(state) {
    return {
      user_id: state.user_id,
      name: state.name,
      sex: state.sex,
      birthday: state.birthday,
      height: state.height,
      weight: state.weight,
      city: state.city,
      signature: state.signature,
      certification_information: state.certification_information,
      set_subscription: state.set_subscription,
      set_WeChat: state.set_WeChat
    }
  },
  userInfoItem(state) {
    return {
      '昵称':state.name, 
      '性别': state.sex,
      '生日':state.birthday,
      '身高':state.height,
      '体重': state.weight,
      '城市': state.city,
      '个性签名': state.signature,
      '认证信息': state.certification_information,
      '设置会员订阅': state.set_subscription,
      '设置微信号打赏': state.set_WeChat
    }
  },

}

const mutations = {
  //更新所有项
  upDate(state, payload) {
    for (const [key, value] of Object.entries(payload)) {
      state[`${key}`] = value
    }
  },
  // 更新某个项
  updateItem(state, item) {
    // item {key,value}
    state[`${item.key}`] = item.value
  },
}

const actions = {
  upDateAsync(context) {
    // Vue.$toast.loading({
    //   message: '加载中...',
    //   forbidClick: true,
    // });
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
      }, 5000)
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
