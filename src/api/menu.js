import request from '@/utils/request'
//下拉菜单班级
export function classList(params) {
  return request({
    url: '/api/Classes',
    method: 'get',
    params
  })
}
//下拉菜单课程
export function coueseList(params) {
    return request({
      url: '/api/Courses',
      method: 'get',
      params
    })
  }
//下拉菜单试卷

export function quizList(params) {
  return request({
    url: '/api/Quizzes',
    method: 'get',
    params
  })
}

export function studentList(params) {
  return request({
    url: '/api/Students',
    method: 'get',
    params
  })
}
//题目类型
