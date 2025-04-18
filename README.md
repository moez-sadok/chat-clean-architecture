# PChat Application

✨ **Example of a chat application using clean architecture** ✨

## Table of contents <a id="main_tc"></a>

1. [Introduction](#introduction)

2. [Scope](#scope)

   - [2.1 Use case diagram](use-case-diagram)
   - [2.2 Main chat flow](#main-chat-flow)

3. [Features](#features)

   - [3.1 Send message](#uc1-send-message)
     - [a. Sub-Usecase diagram](#uc1-sub-usecase-diagram)
     - [b. BDD](#uc1-bbd)
     - [c. Specification](#uc1-specification)
     - [d. Sequence diagram](#uc1-sequence-diagram)
     - [f. Wireframe](#uc1-server-cloud-cluster)

4. [Architecture ](#Architecture)

   - [4.1 Entites](#entites)
   - [4.2 DB Relationships](#db-relationships)
   - [4.3 Component diagram](#component-diagram)
      - [a. Memory - Component diagram](#memory-component-diagram)
      - [b. ClientServer - Component diagram](#client-server-component-diagram)
      - [c. Component Communication - Sequence diagram](#component-communication-sequence-diagram)
   - [4.4 Deployment digram](#deployment-digram)

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 1. Introduction <a id="introduction"></a>

P-Chat is an example of a real-time chat application that enables users to interact in chat rooms through messaging features. The platform allows users to create, join, and leave chat rooms while sending and receiving messages in real time.

# 2. Scope <a id="scope"></a>

The main domain of the system is the chat domain:
Manages chat rooms, message exchange, and real-time communication.

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

## 2.1 Use case diagram

![Use case diagram!](out/docs/design/app-use-cases/app-use-cases.png 'Global use case diagram')

**List of Actors**

- Admin: Manages user reports and can block users.
- User: Joins chat rooms, sends and receives messages, and can report other users.

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

## 2.2 Main chat flow

![Sequence diagram basic interaction!](out/docs/design/sequence-diagram-basic-interaction/sequence-diagram-basic-interaction.png 'Sequence diagram basic interaction')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

# 3. Features <a id="features"></a>

The main feature of the application is 'Send message', so we detail the documentation of it

## 3.1 Send message

### a. Sub-Usecase diagram

![Send message - Use case diagram!](out/docs/features/send-message/send-message-sub-usecases/send-message-sub-usecases.png 'Send message - Use case diagram')

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

   ![Entites!](out/docs/design/entities-digram/entities-digram.png 'Entites')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

   ## 4.2 DB Relationships

   ![DB Relationships!](out/docs/design/db-relations-entities-digram/db-relations-entities-digram.png 'DB Relationships')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

   ##  4.3 Component diagram

   - a. Memory - Component diagram

   ![Component diagram memory](out/docs/design/component-diagram-memory/component-diagram-memory.png 'Component diagram memory')

   - b. ClientServer - Component diagram

   ![Component diagram ClientServer](out/docs/design/component-diagram/component-diagram.png 'Component diagram ClientServer')

  - c. Component Communication - Sequence diagram

  ![Sequence diagram Component interaction!](out/docs/design/sequence-diagram-basic-interaction-system/sequence-diagram-basic-interaction-system.png 'Sequence diagram Component interaction')

<!-- Page-break For PDF generation -->
<div style="page-break-after: always;"></div>

   ##  4.4 Deployment digram

 ![Deployment diagram ](out/docs/design/deployment-diagram/deployment-diagram.png 'Deployment diagram ')

