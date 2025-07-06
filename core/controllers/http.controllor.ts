
export interface IHttpController {
  handle(req: any): Promise<any>;
}


//generic
// export interface IHttpController<U,P,T,R> {
//   usecase: U; //InputBoundary , Optional (e.g. for SSR)
//   presenter: P; //OutputBoundary, Optional (e.g. for SSR)
//   handle(req: T): Promise<R>;
// }
