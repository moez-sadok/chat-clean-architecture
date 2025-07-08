## TODO

- Enhance documentation. (DDD style)
- Enhance naming and structure (UseCaseInteractor --|> UseCase), no interactor folder on usecases
- Apply the complete flow (`UseCase -> Presenter`) as discussed below for all use cases.
- Add MongoDB or MySQL as a second database for testing.
- Add GraphQL as a second API for testing.
- Add a React version of the UI (as an alternative front-end framework).
- Add UML diagrams.
- Add End-to-End Encryption (E2EE).
- Implement a WebSocket client adapter (`IClientUser`, `ClientEmitter`, `ChatService`) and apply the new design based on the updated chat service (see the target UML diagram.)
- Review NX use (packages restriction by layers)

## DONE

- Clean old layers version (based on a lib by component)
- Split Interactor Facade into individual Use Cases (applying ISP & SRP).
- Add a new use case from scratch using TDD (with Jest tests).
- Make the Redis adapter optional (fallback to native WebSocket for StackBlitz compatibility).
- Replace NestJS API main config with dependency injection (DI).
- Replace front-end interactor with a Controller/Presenter Facade.
- Comment out unused interface methods.

## Discussions

- **HTTP communication model**  
  Two solutions are possible:  
  - `App -> Controller Facade` (used in the back-end) [Book, p. 237]  
  - `Controller -> Presenter` (used in the front-end) [Book, p. 72]  
  Both patterns are used in the project.  
  🔗 https://softwareengineering.stackexchange.com/questions/357052/clean-architecture-use-case-containing-the-presenter-or-returning-data

- **Presenter reusability**  
  Can a presenter be reused across use cases?  
  Example: `UseCaseX -> invokes -> UseCaseYPresenter`  
  🔗 https://stackoverflow.com/questions/28892833/clean-architecture-robert-martin-how-to-connect-use-cases/28929194#28929194

- **Multi-screen case** *(not currently used in this project)*  
  🔗 https://softwareengineering.stackexchange.com/questions/403579/clean-architecture-use-case-spanning-multiple-ui-elements

- **Clarification on `ReceiveMessageUseCase`**  
  Should `ConnectUserUseCase` include `ReceiveNewMessageUseCase`?
