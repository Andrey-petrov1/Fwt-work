import { api } from '../configs/api.ts'
import type { Author } from '../configs/interfaces.ts'

export async function getAllAuthors() {
const { data } = await api.get<Author[]>('/authors');
  return data;
}
