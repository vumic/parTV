export interface Movie {
    adult: boolean;
    budget: number;
    genres?: (GenresEntity)[] | null;
    id: number;
    imdb_id?: string | null;
    original_title: string;
    overview?: string | null;
    popularity: number;
    poster_path?: string | null;
    release_date: string;
    revenue: number;
    runtime?: number | null;
    tagline?: string | null;
    title: string;
    vote_average: number;
    vote_count: number;
  }
  export interface GenresEntity {
    id: number;
    name: string;
  }

  export interface Movie {
    page: number;
    results?: (ResultsEntity)[] | null;
    total_results: number;
    total_pages: number;
  }
  export interface ResultsEntity {
    poster_path?: string | null;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids?: (number | null)[] | null;
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path?: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
  }
  