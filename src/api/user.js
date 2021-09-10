import request from '@/utils/request'
export function login(data) {
  return request({
    url: 'http://podolski.cn:5002/connect/token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/dev-api/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/dev-api/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getStudentName(studentId) {
  return request({
    url: `/api/Students('${studentId}')`,
    method: 'get',
  })
}