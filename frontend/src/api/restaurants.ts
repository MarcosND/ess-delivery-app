import { api } from '../lib/axios'
import { Category } from './menu'

export interface Restaurant {
  id: string
  name: string
  address: string
  closingTime: Date
  type: string
  picture?: string
  categories: Category[]
}

interface GetRestaurantsParams {
  restaurantId: string
}

interface CreateRestaurantsParams {
  name: string
  address: string
  closingTime: Date
  type: string
  picture?: string
  id?: string
}

export async function getRestaurants() {
  const response = await api.get<Restaurant[]>('/restaurants')

  return response.data
}

export async function getRestaurant({ restaurantId }: GetRestaurantsParams) {
  const response = await api.get<Restaurant>(`/restaurants/${restaurantId}`)

  return response.data
}

export async function createRestaurant(data: CreateRestaurantsParams) {
  try {
    const response = await api.post('/restaurants', data)
    return response.data
  } catch (error) {
    return error
  }
}

export async function updateRestaurant(data: CreateRestaurantsParams) {
  try {
    const response = await api.patch(`/restaurants/${data.id}`, data)
    return response.data
  } catch (error) {
    return error
  }
}

export async function deleteRestaurant(restaurantId: string) {
  try {
    const response = await api.delete(`/restaurants/${restaurantId}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
