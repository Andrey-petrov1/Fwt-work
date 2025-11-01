export interface Painting {
  id: number;
  authorId: number;
  name: string;
  created: string;
  imageUrl: string;
  locationId: number;
  locationName?: string | undefined;
  authorName?: string | undefined;
}

export interface Author {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  location: string;
}

export interface CardProps {
  name: string | undefined;
  created: string | undefined;
  imageUrl: string | undefined;
  authorName: string | undefined;
  locationName: string | undefined;
}

export interface PaginationProps  {
  totalPages: number;              
  currentPage: number;           
  onPageChange: (page: number) => void; 
};