import { api } from '../configs/api.ts'
import type { Location } from '../configs/interfaces.ts'

export async function getAllLocations() {
const { data } = await api.get<Location[]>('/locations');
  return data;
}