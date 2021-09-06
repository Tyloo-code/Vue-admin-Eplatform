import request from '@/utils/request'

export function getQuestion(params) {
  return request({
    url: '/api/Questions',
    method: 'get',
    params
  })
}
export function getQuizzes(params) {
  return request({
    url: '/api/Quizzes?$expand=questions',
    method: 'get',
    params
  })
}
export function putaAnswers(params) {
  return request({
    url: '/api/StudentAnswer',
    method: 'put',
    params
  })
}

export function putStudentAnswers(data) {
  return request({
    url: '/api/StudentAnswerGroups',
    method: 'put',
    data
  })
}
export function getStudentAnswers(params) {
  return request({
    url: '/api/StudentAnswerGroups?$expand=studentAnswers&student',
    method: 'get',
    params
  })
}
