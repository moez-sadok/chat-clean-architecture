# PChat Application

**Proof of concept of a real-time chat application using Clean Architecture**

## Table of contents <a id="main_tc"></a>

1. [Introduction](#introduction)

2. [Scope](#scope)

   - [2.1 Use case diagram](#use-case-diagram)
   - [2.2 Main chat flow](#main-chat-flow)

3. [Features](#features)

   - [3.1 Send message](#uc1-send-message)
     - [a. Use case diagram](#uc1-sub-usecase-diagram)
     - [b. BDD](#uc1-bdd)
     - [c. Specification](#uc1-specification)
     - [d. Sequence diagram](#uc1-sequence-diagram)
     - [f. Wireframe](#uc1-wireframe)

4. [Architecture](#Architecture)

   - [4.1 Entities](#entites)
   - [4.2 DB Relationships](#db-relationships)
   - [4.3 Component diagram](#component-diagram)
     - [a. Component diagram](#app-component-diagram)
     - [b. Component interaction diagram](#interaction-component-diagram)
   - [4.4 Deployment diagram](#deployment-diagram)

5. [Project Structure](#project-structure)

6. [Use Cases Overview](#use-cases-overview)

7. [Design Patterns](#design-patterns)

8. [Data Persistence and Repository Gateway](#data-persistence)

9. [Demo](#demo)
   - [9.1 Ecosystem](#ecosystem)
   - [9.2 Clean architecture](#clean-architecture)
   - [9.3 Installation](#installation)
   - [9.4 Running Locally](#run-locally)
   - [9.5 Testing](#testing)
   - [9.6 Redis Adapter](#redis-as-adapter)
   - [9.7 Code Scaffolding](#code-scaffolding)

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 1. Introduction <a id="introduction"></a>

P-Chat is a proof of concept (POC) for a real-time chat application that allows users to communicate within chat rooms using messaging features.
This project serves as a practical implementation of Clean Architecture, not only to demonstrate its benefits but also to highlight the challenges it introduces in real-world applications.

In addition, this POC aims to showcase the application of key software engineering principles and practices, including:

- Object-Oriented Programming (OOP)

- SOLID principles

- Test-Driven Development (TDD)

- Domain-Driven Design (DDD)

- Behavior-Driven Development (BDD)

- UML diagrams for clear and maintainable documentation

> Note: This project is still actively being refactored and improved. Updates are made regularly to enhance documentation, code quality, structure, and architectural consistency.

See this article on our blog: [P-CHAT and Clean Architecture](https://prodsoft.fr/en/2025/07/08/pchat-clean-architecture/)

# 2. Scope <a id="scope"></a>

The main domain of the system is the chat domain:
Manages chat rooms, message exchange, and real-time communication.

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

## 2.1 Use case diagram <a id="use-case-diagram"></a>

![Use case diagram!](out/docs/design/app-use-cases/app-use-cases.png 'Global use case diagram')

**List of Actors**

- Admin: Manages user reports and can block reported users.
- User: Joins chat rooms, sends and receives messages, and can report other users.

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

## 2.2 Main chat flow <a id="main-chat-flow"></a>

This diagram represents a typical interaction scenario in the P-CHAT system involving three users within the same chat room. User1 and User2 are connected, while User3 is disconnected.

![Sequence diagram basic interaction!](out/docs/design/basic-system-users-interactions-sequence-diagram/basic-system-users-interactions-sequence-diagram.png 'Sequence diagram basic interaction')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 3. Features <a id="features"></a>

The core feature of the P-CHAT application is message sending within a chat room. This section provides a detailed overview of how the system handles this functionality from both a user and system perspective.

## 3.1 Send message <a id="uc1-send-message"></a>

### a. Use case diagram  <a id="uc1-sub-usecase-diagram"></a>

![Send message - Use case diagram!](out/docs/features/send-message/send-message-usecase-diagram/send-message-usecase-diagram.png 'Send message - Use case diagram')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

### b. BDD  <a id="uc1-bdd"></a>

```gherkin
Feature: Send Message
  As a User
  I want to send a message in a chat room
  So that all participants can receive it

Scenario: Online receiver (connected)
  Given a User wants to send a message
  When the User sends a SendMessageRequest
  Then the message content, room, and user are validated
  And the message is broadcasted to all participants
  And the message is saved in the chat repository
  And a SendMessageResponse is returned to the User

Scenario: Offline receiver (disconnected)
  Given a User wants to send a message
  When the User sends a SendMessageRequest
  Then the message content, room, and user are validated
  And the message is saved in the chat repository
  And a SendMessageResponse is returned to the User
  And the message is broadcasted to all connected participants of the room

  When one or more participant of the room are offline
  Then send push notifications to offline participant(s)
```

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

### c. Specification  <a id="uc1-specification"></a>

![Send message - Specification!](out/docs/features/send-message/send-message-specifications/send-message-specifications.png 'Send message - Specification')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

### d. Sequence diagram  <a id="uc1-sequence-diagram"></a>

![Send message - Sequence diagram!](out/docs/features/send-message/send-message-sequence/send-message-sequence.png 'Send message - Sequence diagram')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

### f. Wireframe <a id="uc1-wireframe"></a>

![Send message - Wireframe!](out/docs/features/send-message/send-message-wireframe/MessageForm_Wireframe.png 'Send message - Wireframe')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 4. Architecture  <a id="Architecture"></a>

## 4.1 Entities <a id="entites"></a>

![Entities!](out/docs/design/business-rules-entities-digram/business-rules-entities-digram.png 'Entities')

The domain layer contains:
- **IChatroom** (Mediator): Orchestrates message delivery between participants.
- **IParticipant** (Colleague): Represents a user in a chat room, sends and receives messages through the mediator.
- **IMessage**: Represents a message exchanged in a room.

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

## 4.2 DB Relationships  <a id="db-relationships"></a>

![DB Relationships!](out/docs/design/data-relations-tables-digram/data-relations-tables-digram.png 'DB Relationships')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

## 4.3 Component diagram <a id="component-diagram"></a>

- a. Component diagram <a id="app-component-diagram"></a>

![Component diagram](out/docs/design/app-components-diagram/app-components-diagram.png 'Component diagram')

- b. Component interaction - Sequence diagram <a id="interaction-component-diagram"></a>

![Component interaction diagram](out/docs/design/app-components-interaction-sequence-diagram-v1/app-components-interaction-sequence-diagram-v1.png 'Component interaction diagram')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

## 4.4 Deployment diagram <a id="deployment-diagram"></a>

![Deployment diagram](out/docs/design/deployment-diagram/deployment-diagram.png 'Deployment diagram')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 5. Project Structure <a id="project-structure"></a>

The project is organized as an NX monorepo with the following structure:

```
chat-clean-architecture/
├── core/                          # Framework-independent core (Clean Architecture)
│   ├── domain/                    # Enterprise Business Rules
│   │   ├── entities/              # Entity implementations (Chatroom, Participant, Message, Bot)
│   │   └── interfaces/            # Entity contracts (IChatroom, IParticipant, IMessage)
│   ├── application/               # Application Business Rules
│   │   ├── usecases/              # Use case interactors
│   │   ├── ports/                 # Port interfaces (IChatRepository, IChatServerPort)
│   │   └── mappers/               # DTO-to-entity mappers (RoomEntityMapper)
│   ├── controllers/               # Interface Adapters - Controllers
│   ├── dtos/                      # Data Transfer Objects
│   └── gateways/                  # Interface Adapters - Gateways
│       └── persistence/           # Database gateway (DataBaseMapper, IChatDatabase)
├── apps/                          # Runnable applications (NestJS API, Angular UI)
├── libs/                          # Framework-specific implementations
│   └── chat/frameworks/
│       ├── db/                    # Database adapters (in-memory, MongoDB)
│       ├── ui/                    # UI frameworks (Angular)
│       └── web/                   # Web adapters (Socket.IO, HTTP)
├── tests/                         # Test suites
│   ├── units/                     # Unit tests (domain entities)
│   ├── integrations/              # Integration tests (use cases with in-memory doubles)
│   └── bench/                     # Performance benchmarks (Autocannon)
└── docs/                          # PlantUML diagrams and specifications
```

This maps to Clean Architecture layers:

| Layer | Directory | Contents |
|-------|-----------|----------|
| Enterprise Business Rules | `core/domain/` | Entities, domain interfaces |
| Application Business Rules | `core/application/` | Use cases, ports, presenters |
| Interface Adapters | `core/controllers/`, `core/gateways/`, `core/dtos/` | Controllers, gateways, DTOs |
| Frameworks & Drivers | `apps/`, `libs/` | Angular, NestJS, Socket.IO, MongoDB, in-memory DB |

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 6. Use Cases Overview <a id="use-cases-overview"></a>

The application implements the following use cases, each following the `UseCase -> Presenter` pattern:

| Use Case | Class | Description |
|----------|-------|-------------|
| Send Message | `SendMessageUseCase` | Validates and broadcasts a message to room participants |
| Get Messages by Room | `GetMessagesByRoomUseCase` | Retrieves all messages for a given chat room |
| Get Rooms by User | `GetRoomsByUserUseCase` | Returns the list of rooms a user belongs to (API/SPA) |
| Get Rooms by User (SSR) | `GetRoomsByUserSSRUseCase` | Server-side rendered variant of room listing |
| Get User by ID | `GetUserByIdUseCase` | Fetches user details by their identifier |
| Connect Client | `ConnectClientUseCase` | Registers a user's WebSocket connection |
| Disconnect Client | `DisconnectClientUseCase` | Handles user disconnection and cleanup |

Each use case follows Clean Architecture's dependency rule: it depends only on ports (interfaces) and domain entities, never on frameworks or external services directly.

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 7. Design Patterns <a id="design-patterns"></a>

| Pattern | Where Applied | Purpose |
|---------|---------------|---------|
| **Mediator** | `IChatroom` / `Chatroom` | The chat room acts as a mediator that coordinates message delivery between participants, avoiding direct participant-to-participant coupling. |
| **Observer** | `IParticipant.receive()` | Participants are notified of new messages through the mediator, following an observer-like notification pattern. |
| **Port/Adapter** | `IChatRepository`, `IChatServerPort`, `IChatDatabase` | Core business logic defines port interfaces; framework-specific adapters implement them (in-memory DB, MongoDB, Socket.IO). |
| **Factory** | `factories.ts` in each use case | Factory functions create use cases, presenters, and controllers with proper dependency injection wiring. |
| **Presenter** | `*PresenterApi`, `*PresenterUi` | Separates output formatting from business logic. API presenters format data for HTTP responses; UI presenters update views. |
| **ISP (Interface Segregation)** | `ISendMessageRepository` | Narrow repository interface (3 methods) instead of the full `IChatRepository` (12+ methods), so the use case depends only on what it needs. |

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 8. Data Persistence and Repository Gateway <a id="data-persistence"></a>

The persistence layer follows a two-level abstraction:

1. **`IChatRepository`** (Application Port) - defines the data operations needed by use cases, using DTOs.
2. **`IChatDatabase`** (Gateway Interface) - defines raw database operations using table models.
3. **`DataBaseMapper`** (Gateway Implementation) - implements `IChatRepository` by delegating to an `IChatDatabase` and converting between table models and DTOs.

```
UseCase --> IChatRepository (port)
                |
          DataBaseMapper (gateway, implements IChatRepository)
                |
          IChatDatabase (interface)
                |
        ┌───────┴────────┐
  DataBaseMemoryImpl   MongoDatabase
  (in-memory)          (MongoDB)
```

This design means:
- Use cases never know which database is used.
- Adding a new database requires only a new `IChatDatabase` implementation.
- The `DataBaseMapper` handles DTO/table-model conversion in one place.

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 9. Demo <a id="demo"></a>

### 9.1 Ecosystem <a id="ecosystem"></a>

**Languages**: [TypeScript](https://www.typescriptlang.org/), HTML, CSS
**Tools**: [Nx Workspace](https://nx.dev/)
**Frameworks/libs**: [Angular](https://angular.io/), [NestJS](https://nestjs.com/), [Redis](https://redis.io/), [Socket.IO](https://socket.io/)
**Database**: In-memory, [MongoDB](https://www.mongodb.com/)
**Network**: In-memory, HTTP, WebSocket
**Testing**: [Jest](https://jestjs.io/), [Autocannon](https://github.com/mcollina/autocannon)

> Note: Different frameworks/libs are used to illustrate how easily they can be swapped thanks to the port/adapter architecture.

---

### 9.2 Clean architecture  <a id="clean-architecture"></a>

This example demonstrates how Clean Architecture separates concerns and makes the codebase more maintainable and testable.

<img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" alt="clean-architecture" width="400px" height="300px"/>

See: [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

- **Independent of Frameworks**

In this example, when using Angular or NestJS, we only utilize the necessary features such as Dependency Injection (DI), modules, etc. The frameworks/libs are used as tools.

- **Testable**

Starting with Test-Driven Development (TDD) is easy. Business rules can be tested without relying on the UI, database, web server, or any external elements.

- **Independent of UI**

We use native HTML/CSS and material-components views, SPA or SSR. The UI can be changed without affecting business logic.

- **Independent of Database**

We use in-memory and MongoDB. You can easily switch to MySQL, Cassandra, Oracle, etc. Business rules are decoupled from the DB.

- **Independent of External Agencies**

All business rules are decoupled from the outside world.

---

### 9.3 Installation  <a id="installation"></a>

```bash
npm i
```

### 9.4 Run locally  <a id="run-locally"></a>

With client/server (WebSocket/HTTP), open in different private tabs:

```bash
npm run start:ui
npm run start:api
# Open 2 browser windows and try two users
# http://localhost:4200/user/1
# http://localhost:4200/user/2
```

Using Bun:

1. Install Bun globally
2. Add to package.json: `"type": "module"`
3. Update imports in `webpack.config.js`
4. Run `npm run use:bun`

> For benchmark tests, also update the Autocannon import.

### 9.5 Testing  <a id="testing"></a>

- Unit and integration tests (Jest)

   ```bash
   npm run test
   ```

- Performance (Autocannon)

   ```bash
   node tests/bench/send-message-bench-test.js

   # or
   npm run bench-test-get-rooms
   npm run bench-test-get-messages
   npm run bench-connect-users

   # or
   autocannon -c 10 -a 1000 -m POST http://localhost:3333/api/send-message \
     --header 'Content-Type: application/json' \
     --body '{ "roomId": "0", "userId": "1", "message": "perf message" }'
   ```

### 9.6 Redis as adapter  <a id="redis-as-adapter"></a>

Many other tools harness the power of port/adapter architecture. For instance, Redis enables the creation and connection of a multi-chat server to support millions of connected users with just three lines of code.

See also: [Socket.IO Redis Adapter](https://socket.io/docs/v4/redis-adapter/) | [NestJS WebSocket Adapter](https://docs.nestjs.com/websockets/adapter)

To install Redis, please check the official Redis website.

- Uncomment the Redis adapter code inside `main.ts` of `chat-server-main-api`:

```typescript
const redisIoAdapter = new RedisIoAdapter(app);
await redisIoAdapter.connectToRedis();
app.useWebSocketAdapter(redisIoAdapter);
```

- Run Redis server:

```bash
redis-server
```

### 9.7 Code Scaffolding  <a id="code-scaffolding"></a>

Using Nx console VS Code extension or CLI:

Generate NestJS app:

```bash
npx nx generate @nx/nest:application chat/chat-server-main-api --frontendProject chat-chat-client-main-ng
```

Generate lib:

```bash
npx nx generate @nx/js:library libs/chat/drivers/socketIo/client
npx nx generate @nx/js:library libs/chat/drivers/socketIo/server
```
