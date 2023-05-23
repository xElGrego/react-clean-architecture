export interface DtoResponse<T> {
  data: T;
  error: boolean;
  msgRetorno: string;
  code: number;
}
