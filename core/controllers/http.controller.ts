// A controller adapter: takes the request of one use case, resolves with its response.
export interface IHttpController<TRequest = unknown, TResponse = unknown> {
  handle(request: TRequest): Promise<TResponse>;
}
