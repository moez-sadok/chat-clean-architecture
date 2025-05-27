
export interface IHttpController {
  handle(req: any): Promise<any>;
}
