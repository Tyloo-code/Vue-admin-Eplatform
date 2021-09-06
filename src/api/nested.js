import request from '@/utils/request'

//menu1
export function getcourses(params) {
  return request({
    url: '/api/Courses?$expand=classes,quizzes',
    method: 'get',
    params
  })
}

export function getodatacourses(odataroute) {
  return request({
    url: '/api/Courses'+ odataroute,
    method: 'get'
  })
}

export function putcourses(data) {
  return request({
    url: '/api/Courses',
    method: 'put',
    data
  })
}

export function deletecourses(id) {
  return request({
    url: `/api/Courses(${id})`,
    method: 'delete'
  })
}
//menu2
export function putccmap(data) {
  return request({
    url: '/api/ClassCourseMaps',
    method: 'put',
    data
  })
}

export function getccmap(params) {
  return request({
    url: '/api/ClassCourseMaps?$expand=class,course',
    method: 'get',
    params
  })
}

export function getodataccmap(odataroute) {
  return request({
    url: '/api/ClassCourseMaps?$expand=class,course'+ odataroute,
    method: 'get'
  })
}
export function deleteccmap(id1,id2) {
  return request({
    url: `/api/Courses(${id1})?$expand=classes(${id2})`, 
    /* url: '/api/Courses?$expand=classes&$filter=id eq ' +
    id2, */
    method: 'delete'
  })
}

//menu3
export function putqcmap(data) {
  return request({
    url: '/api/CourseQuizMaps',
    method: 'put',
    data
  })
}

export function getqcmap(params) {
  return request({
    url: '/api/CourseQuizMaps?$expand=quiz,course',
    method: 'get',
    params
  })
}

export function getodataqcmap(odataroute) {
  return request({
    url: '/api/CourseQuizMaps?$expand=quiz,course'+ odataroute,
    method: 'get'
  })
}
export function deleteqcmap(id) {
  return request({
    url: `/api/CourseQuizMaps(${id})`,
    method: 'delete'
  })
}
