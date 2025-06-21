# BDD : Send Message Use Case
## Prodsoft - Moez SADOK @Copyright 2024

Feature: Send Message
  As a connected User
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
