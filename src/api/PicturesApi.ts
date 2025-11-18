import { api } from '../configs/api.ts'
import type { Painting } from '../configs/interfaces.ts'

type GetPaintingsOptions = {
  page?: number
  limit?: number
  search?: string
}

export async function getAllPaintings(options: GetPaintingsOptions = {}) {
  const { page = 1, limit = 9, search = '' } = options;


  const res = await api.get<Painting[]>('/paintings', {
    params: {
      _page: page,
      _limit: limit,
      ...(search ? { q: search } : {}),
    },
  });


  const totalCountHeader = res.headers?.['x-total-count'] ?? res.headers?.['X-Total-Count'];
  const total = totalCountHeader ? Number(totalCountHeader) : res.data.length;

  return {
    paintings: res.data,
    total,
  };
}

export async function getPaintingById(id: number) {
  const { data } = await api.get<Painting>('/paintings', {
    params: {
      id: id,
    },
  });
  return data;
}
