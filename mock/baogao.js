const Mock = require('mockjs')

const data = Mock.mock({
  'items|4': [{
    data: '@csentence(2, 6)',
    name: '@cword(2,4)',
    address: '@integer(1, 10)',
    address1: '@integer(1, 10)',
    address2: '@integer(1, 10)',
    address3: '@integer(1, 10)',
   
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/baogao/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
