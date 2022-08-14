export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface HttpRequest {
  url: string;
  method: HttpMethod;
  body?: any /* Conferir a tipagem */;
}
