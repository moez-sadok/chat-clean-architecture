# BDD : Get Messages by Room Use Case
## Prodsoft - Moez SADOK @Copyright 2024

@UC-03 @domain:messaging @actor:room-participant
Feature: Get Messages by Room
  As a Room Participant
  I want to read the messages of a chat room
  So that I can follow the conversation history

  Background:
    Given the chat room "General" with participants Alice and Bob

  Rule: R6 The messages of a room are returned with their author

    Scenario: Reading a room that has messages
      Given the room "General" holds these messages:
        | author | message          |
        | Alice  | Hi Bob           |
        | Bob    | Hello Alice      |
      When Alice reads the messages of "General"
      Then she gets these 2 messages
      And each message gives its author name, its author id and the room id

  Rule: R7 The room details are returned, even when the room has no messages

    Scenario: Reading a room that has no messages
      Given the room "General" holds no messages
      When Alice reads the messages of "General"
      Then she gets an empty list of messages
      And the room is described with the name "General" and the participants Alice and Bob

  Rule: R8 Reading an unknown room is an error

    Scenario: Reading a room that does not exist
      Given no room exists with the id 999
      When Alice reads the messages of room 999
      Then an error says the room 999 does not exist
