import { Movie } from "./Movie";

export interface User 
{
    uid: string;
    email: string; 
    displayName: string;
    photoURL: string;
    watchlist?: (WatchEntity)[] | null;
  }
  export interface WatchEntity {
    id: number;
  }