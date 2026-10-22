import { IHttpController } from '../../../../core/controllers';

// The SPA flow without the network: where the browser would fetch the API, the request goes
// straight to the server-side controller adapter, and its response is handed to the
// client-side controller adapter, which presents it, exactly as after a fetch.
export class SpaHttpClientMemory<TRequest, TResponse> implements IHttpController<TRequest, TResponse> {

  constructor(
    private api: IHttpController<TRequest, TResponse>,
    private client: IHttpController<TResponse, void>
  ) {}

  async handle(request: TRequest): Promise<TResponse> {
    const response = await this.api.handle(request);
    await this.client.handle(response);
    return response;
  }

}
