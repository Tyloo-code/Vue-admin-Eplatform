import request from '@/utils/request'
export function getStudentAnswers(studentId, quizId, params) {
    return request({
      url: `/api/StudentAnswerGroups?$expand=student&$expand=quiz&$expand=studentAnswers($expand=question)&$filter=student/id eq '${studentId}' and quiz/id eq ${quizId}`,
      method: 'get',
      params
    })
  }

export function getStudentName(studentId) {
  return request({
    url: `/api/Students('${studentId}')`,
    method: 'get',
  })
}


