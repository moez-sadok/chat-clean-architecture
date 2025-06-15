
export interface IHttpController {
  handle(req: any): Promise<any>;
}


//generic
// export interface IHttpController<T,R> {
//   handle(req: T): Promise<R>;
// }
