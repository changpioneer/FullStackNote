export class Result<T> {
  success: boolean;
  data?: T;
  message?: string;
}
