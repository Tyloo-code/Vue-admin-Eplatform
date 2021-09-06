import request from '@/utils/request'


export function getList(params) {
  return request({
    // url: '/Students?$expand=class($expand=courses($expand=quizzes))',
    url: '/api/Students?$expand=class($expand=courses($expand=quizzes))',
    method: 'get',
    params
  })

}
export function getodataList(odataroute) {
  return request({
    url: '/api/Students?$expand=class($expand=courses($expand=quizzes))'+ odataroute,
    method: 'get',
    
  })

}

