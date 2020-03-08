export interface Cast {
    id: number;
    cast?: (CastEntity)[] | null;
  }
  export interface CastEntity {
    cast_id: number;
    character: string;
    credit_id: string;
    gender?: number | null;
    id: number;
    name: string;
    order: number;
    profile_path?: string | null;
  }
