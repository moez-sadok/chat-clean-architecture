# BDD : Get Messages by Room Use Case
## Prodsoft - Moez SADOK @Copyright 2024

Feature: Get Messages by Room
  As a connected User
  I want to retrieve all messages in a chat room
  So that I can read the conversation history

Scenario: Room with messages
  Given a User is authenticated and a chat room exists with messages
  When the User sends a GetMessagesByRoomRequest with the roomId
  Then the system verifies the room exists in the repository
  And the system retrieves all messages for the room
  And each message is mapped to a MessageOutputData with authorName, message, chatRoomId, and authorId
  And the room metadata (roomName, participantsNames) is included in the response
  And the presenter formats a GetMessagesOutputData response
  And the response is returned to the User

Scenario: Room with no messages
  Given a User is authenticated and a chat room exists with no messages
  When the User sends a GetMessagesByRoomRequest with the roomId
  Then the system verifies the room exists in the repository
  And the system retrieves an empty list of messages for the room
  And a GetMessagesOutputData with an empty messages list and room metadata is returned

Scenario: Room does not exist
  Given a User requests messages for a non-existing room
  When the User sends a GetMessagesByRoomRequest with an invalid roomId
  Then the system checks the repository and the room is not found
  And an error is thrown indicating the room does not exist
