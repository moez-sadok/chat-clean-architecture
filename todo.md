
## TODO
- Split interactor facade to usecases (ISP & SRP)
- Add a use case from scratch using TDD (testing using jest)
- Add mongo db or mysql (as second db test)
- Add graphql  (as second api test)
- Add react for the ui (as second ui Framework test)
- Add uml diagrams 

## DONE
- Replace the main config in nestjs api by the DI
- Replace the front-end interactor (by controller / presenter facade)
- Comment unused interfaces methods

## TO CHECK (more internal abstraction)
- Check the communication model for http: 2 solutions ( app/controller facade (used in the back-end) book-p237 or relation controller / presenter (used in the front-end part) book-p72)
- The presenter api can use the server/socket (IchatServer/IConnectedUser) and return response directly
- Make an adapter for websoket server (for IchatServer) 
- Make an  adapter for websoket socket (client) (for IConnectedUser) 
- Make an  adapter for http
