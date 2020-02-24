import request from '@/utils/request'


export function login(data) { // 登录
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getRoles(token) { // 获取用户基础信息
  return request({
    url: '/getRoles',
    method: 'post',

  })
}

export function addMastername(data) { // 增加erp数据库表
  return request({
    url: '/mastername/insertSelective',
    method: 'post',
    data
  })
}

export function msternameFindByQuery(data) { // erp数据库表查询
  return request({
    url: '/mastername/findByQuery?page=' + data.page + '&limit=' + data.limit + '&memberName=' + data.memberName + '&masterTableName=' + data.masterTableName,
    method: 'get',
  })
}

export function msternameUpdateById(data) { // erp数据库主表修改
  return request({
    url: '/mastername/updateById',
    method: 'post',
    data
  })
}

export function msternameDeleteById(data) { // erp数据库主表删除

  return request({
    url: '/mastername/deleteById?mid=' + data,
    method: 'post',
  })
}

export function detailnameListAll(data) { // erp数据库明细表查询

  return request({
    url: '/detailname/listAll?mid=' + data,
    method: 'get',
  })
}

export function detailnameUpdateById(data) { // erp数据库明细表修改
  return request({
    url: '/detailname/updateById',
    method: 'post',
    data
  })
}
export function detailnameDeleteById(data) { // erp数据库明细表删除
  return request({
    url: '/detailname/deleteById?id='+ data,
    method: 'post',

  })
}
export function detailnameInsertSelective(data) { // erp数据库明细表增加
  return request({
    url: '/detailname/insertSelective',
    method: 'post',
    data
  })
}


