import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-front.framework.team',
});


export interface Painting {
  id: number;
  name: string;       
  created: string;    
  imageUrl: string;   
}


export async function getPaintings() {
  const { data } = await api.get<Painting[]>('/paintings', {
    params: {
      _page: 1,
      _limit: 6,
    },
  });
  return data;
}
