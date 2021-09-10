import { login, getStudentName } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router , { resetRouter } from '@/router'
import qs from 'qs'
import jwt_decode from 'jwt-decode'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: localStorage.getItem('name'),
    avatar: '',
    roles: [],
    num:''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES:(state, roles) => {
    state.roles = roles
  },
  SET_NUM:(state, num) => {
    state.num = num
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const payload = {
        client_id:'webClient',
        grant_type:'password',
        client_secret:'MainsiteSecret',
        scope:'HomeworkSystemAPI',
        username,
        password
      }
      login(qs.stringify(payload)).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const userData = jwt_decode(getToken());
      const response = {
        data:{
          roles: [userData.role],
          introduction: 'Administrator',
          avatar: 'https://cloud.xiaoxingbobo.top/nongzhibang/20210429/1107491622257669573',
          // name: userData.name,
          num: userData.sub
        }
      }
      const { data } = response;

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, num } = data
    
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
    
        commit('SET_ROLES', roles)
        // commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_NUM', num)
        localStorage.setItem('num',num)
        resolve(data)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

