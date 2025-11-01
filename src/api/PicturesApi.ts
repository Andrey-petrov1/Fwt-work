import { api } from '../configs/api.ts'
import type { Painting } from '../configs/interfaces.ts'
import { API_CONSTANTS } from '../configs/constants.ts';

export async function getPaintings(page = API_CONSTANTS.CURRENT_PAGE, searchQuery: string, limit = API_CONSTANTS.INITIAL_LIMIT, ) {
  const { data } = await api.get<Painting[]>('/paintings', {
    params: {
       _page: page,
      _limit: limit,
      q: searchQuery
    },
  });
  return data;
}

export async function getAllPaintings() {
  const { data } = await api.get<Painting[]>('/paintings');
  return data;
}

export async function getPaintingById(id: number) {
  const { data } = await api.get<Painting>('/paintings', {
    params: {
      id: id,
    },
  });
  return data;
}