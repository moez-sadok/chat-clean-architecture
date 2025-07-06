# PChat Application

✨ **Poc of a chat application using clean architecture** ✨

## Table of contents <a id="main_tc"></a>

1. [Introduction](#introduction)

2. [Scope](#scope)

   - [2.1 Use case diagram](use-case-diagram)
   - [2.2 Main chat flow](#main-chat-flow)

3. [Features](#features)

   - [3.1 Send message](#uc1-send-message)
     - [a. Usecase diagram](#uc1-sub-usecase-diagram)
     - [b. BDD](#uc1-bbd)
     - [c. Specification](#uc1-specification)
     - [d. Sequence diagram](#uc1-sequence-diagram)
     - [f. Wireframe](#uc1-server-cloud-cluster)

4. [Architecture ](#Architecture)

   - [4.1 Entites](#entites)
   - [4.2 DB Relationships](#db-relationships)
   - [4.3 Component diagram](#component-diagram)
      - [a. Component diagram](#app-component-diagram)
      - [b. Component interaction diagram](#interaction-component-diagram)
      <!-- - [c. Component digram - detail Http and SPA](#component-http-spa-diagram) -->
   - [4.4 Deployment digram](#deployment-digram)

5. [Demo](#demo)
   - [5.1 Ecosystem](#ecosystem)
   - [5.2 Clean architecture](#clean-architecture)
   - [5.3 Installation](#installation)
   - [5.4 Running Locally](#run-locally)
   - [5.5 Testing](#testing)
   - [5.6 Redis Adapter](#redis-as-adapter)
   - [5.7 Code Scaffolding](#code-scaffolding)

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

⚠️ Note: This project is still actively being refactored and improved. Updates are made regularly to enhance code quality, structure, and architectural consistency.

# 2. Scope <a id="scope"></a>

The main domain of the system is the chat domain:
Manages chat rooms, message exchange, and real-time communication.

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

## 2.1 Use case diagram

![Use case diagram!](out/docs/design/app-use-cases/app-use-cases.png 'Global use case diagram')

**List of Actors**

- Admin: Manages user reports and can block reported users.
- User: Joins chat rooms, sends and receives messages, and can report other users.

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

## 2.2 Main chat flow

This diagram represents a typical interaction scenario in the P-CHAT system involving three users within the same chat room. User1 and User2 are connected, while User3 is disconnected.

![Sequence diagram basic interaction!](out/docs/design/basic-system-users-interactions-sequence-diagram/basic-system-users-interactions-sequence-diagram.png 'Sequence diagram basic interaction')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 3. Features <a id="features"></a>

The core feature of the P-CHAT application is message sending within a chat room. This section provides a detailed overview of how the system handles this functionality from both a user and system perspective.

## 3.1 Send message

### a. Usecase diagram

![Send message - Use case diagram!](out/docs/features/send-message/send-message-usecase-diagram/send-message-usecase-diagram.png 'Send message - Use case diagram')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

### b. Bdd

```bash
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

### c. Specification

![Send message - Specification!](out/docs/features/send-message/send-message-specifications/send-message-specifications.png 'Send message - Specification')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

### d. Sequence diagram

![Send message - Sequence diagram!](out/docs/features/send-message/send-message-sequence/send-message-sequence.png 'Send message - Sequence diagram')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

### f. Wireframe

![Send message - Wireframe!](out/docs/features/send-message/send-message-wireframe/MessageForm_Wireframe.png 'Send message - Wireframe')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# Architecture 

   ## 4.1 Entites

   ![Entites!](out/docs/design/business-rules-entities-digram/business-rules-entities-digram.png 'Entites')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

   ## 4.2 DB Relationships

   ![DB Relationships!](out/docs/design/data-relations-tables-digram/data-relations-tables-digram.png 'DB Relationships')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

   ##  4.3 Component diagram

   - a. Component diagram

   ![Component diagram](out/docs/design/app-components-diagram/app-components-diagram.png 'Component diagram')

   - b. Component interaction - Sequence diagram

 ![Component interaction diagram](out/docs/design/app-components-interaction-sequence-diagram-v1/app-components-interaction-sequence-diagram-v1.png 'Component interaction diagram')


<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

   ##  4.4 Deployment digram

 ![Deployment diagram ](out/docs/design/deployment-diagram/deployment-diagram.png 'Deployment diagram ')

## 5. Demo <a id="demo"></a>

### 5.1 Ecosystem <a id="ecosystem"></a>

**Languages**: [TypeScript](), [HTML](), [CSS]()  
**Tools**: [Nx workspace]()  
**Frameworks/libs**: [Angular](), [NestJS](), [Redis](), [React]()  
**Database**: [In-memory](), [MongoDB]()  
**Network**: [In-memory](), [HTTP](), [WebSocket](),

> Note: Different frameworks/libs are used to illustrate how easily they can be replaced.

---

### 5.2 Clean architecture  <a id="clean-architecture"></a>

This example demonstrates how Clean Architecture separates concerns and makes the codebase more maintainable and testable.


<img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" alt="clean-architecture" width="400px" height="300px"/>

See: [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)


- Independent of Frameworks 

In this example, when using Angular or NestJs, we only utilize the necessary features such as Dependency Injection (DI), modules, etc. The frameworks/libs are used as tools.

- Testable

Starting with Test-Driven Development (TDD) is easy. Business rules can be tested without relying on the UI, database, web server, or any external elements.

- Independent of UI 

We use native HTML/CSS and material-components views, SAP or SSR. The UI can be changed without affecting business logic. 

- Independent of Database 

We use in-memory and MongoDB. You can easily switch to MySQL, Cassandra, Oracle, etc. Business rules are decoupled from the DB.

- Independent of External Agencies 

All business rules are decoupled from the outside world.  

---


### 5.3 Installation  <a id="installation"></a>

```
npm i
```

### 5.4 Run locally

With client/server (websockt/http), open in different private tabs

```bash
npm run start:ui
npm run start:api
# Open 2 browser windows and try two users
# http://localhost:4200/user/1
# http://localhost:4200/user/2
```

Using bun:

 . Install bun globaly

 . add to package.json : "type": "module" 

 . update import on webpack.config.js 

 . npm run use:bun

> For bensh tests also update import autocanon


### 5.5 Testing  <a id="testing"></a>

- Unit and integration tests (jest)

   ```bash
   npm run test
   ```

- Performance (autocanon)

   ```bash
   node tests/bench/send-message-bench-test.js

  #or
  npm run bench-test-get-rooms
  npm run bench-test-get-messages
  npm run bench-connect-users

   # or
   autocannon -c 10 -a 1000 -m POST http://localhost:3333/api/send-message --header 'Content-Type: application/json' --body '{ "roomId": "0", "userId": "1", "message": "perf message" }'
   ```

### 5.6 Redis as adapter

Many other tools harness the power of port/adapter architecture. For instance, Redis enables the creation and connection of a multi-chat server to support millions of connected users with just three lines of code.

See also: https://socket.io/docs/v4/redis-adapter/

https://docs.nestjs.com/websockets/adapter

To install Redis, please check the official Redis website and see also [NestJS WebSocket Adapter documentation](https://docs.nestjs.com/websockets/adapter).

- Uncomment redis adapter code inside the main.ts of chat-server-main-api

```bash
  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);
```

- Run redis server inside the cmd

```
redis-server
```

### 5.7 Code Scaffolding

Using Nx console vs code extension or cli:

Generate nest app:

```bash
npx nx generate @nx/nest:application chat/chat-server-main-api --frontendProject chat-chat-client-main-ng
```

Generate lib:

```bash
npx nx generate @nx/workspace:library chat/entreprise-business-rules/notifiyer
npx nx generate @nx/workspace:library chat/application-business-rules/network
npx nx generate @nx/workspace:library chat/adapters/network

npx nx generate @nx/js:library libs/chat/drivers/socketIo/client
npx nx generate @nx/js:library libs/chat/drivers/socketIo/server
```
