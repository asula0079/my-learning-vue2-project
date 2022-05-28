import request from '@/utils/request'

interface Menu {
  name: string,
  href: string,
  parentId: number,
  description: string,
  shown: boolean,
  icon: string,
  orderNum: number
}

export const createMenu = (data: Menu) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data: data
  })
}

export const getMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenuInfo = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenuInfo = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
