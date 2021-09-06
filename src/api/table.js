import {get} from '@/utils/request'
import request from '@/utils/request'

export function getList(params) {
  return get('/api/Quizzes?$expand=questions',params)
}

export function getcourseList(params) {
  return get('/api/Quizzes?$expand=courses',params)
}

export function deletequiz(id) {
  return request({
    url: `/api/Quizzes(${id})`,
    method: 'delete'
  })
}
export function getodataList(odataroute) {
  return request({
    url: "/api/Quizzes?$filter=name eq '"+ odataroute + "'",
    method: 'get'
  })
}
export function getoList(odataroute) {
  return request({
    url: "/api/Courses?$expand=quizzes&$filter=name eq '"+ odataroute + "'",
    method: 'get'
  })
}