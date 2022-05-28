import request from '@/utils/request'

interface ResourceQuery {
  name: string,
  url: string,
  region: string,
  current: number,
  size: number
}

export const getResourceInfo = (data: ResourceQuery) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data: data
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
