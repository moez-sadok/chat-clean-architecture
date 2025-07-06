
## TODO
- Enhance documentation
- Add mongo db or mysql (as second db test)
- Add graphql  (as second api test)
- Add react for the ui (as second ui Framework test)
- Add uml diagrams 
- Make an  adapter for websoket socket (client) (for IClientUser) CleintEmmiter and apply new design as chat service (apply the new target uml diagram)

## DONE
- Split interactor facade to usecases (ISP & SRP)
- Add a use case from scratch using TDD (testing using jest)
- Make redis adapter optional (use native ws to run in stackblitz)
- Replace the main config in nestjs api by the DI
- Replace the front-end interactor (by controller / presenter facade)
- Comment unused interfaces methods

## Disscutions
- Check the communication model for http: 2 solutions ( app/controller facade (used in the back-end) book-p237 or relation controller / presenter (used in the front-end part) book-p72) (both are used) https://softwareengineering.stackexchange.com/questions/357052/clean-architecture-use-case-containing-the-presenter-or-returning-data

- GetMessagePresenter resuablity (UseCaseX -invoque-> UseCaseYPrenter) : https://stackoverflow.com/questions/28892833/clean-architecture-robert-martin-how-to-connect-use-cases/28929194#28929194

- Muli screen case (not used in this projet) : https://softwareengineering.stackexchange.com/questions/403579/clean-architecture-use-case-spanning-multiple-ui-elements


- Clearness receivemessageusecase ? (connectuser -include-> receiveNewMessage)