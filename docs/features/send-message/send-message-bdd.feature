# BDD : Send Message Use Case
Feature: Send Message
  As a User
  I want to send a message in a chat room
  So that all participants can receive it

Scenario: Successful Message Sending
  Given a User wants to send a message
  When the User sends a SendMessageRequest
  Then the message content, room, and user are validated
  And the message is broadcasted to all participants
  And notifications are sent to participants
  And the message is saved in the chat repository
  And a SendMessageResponse is returned to the User
  