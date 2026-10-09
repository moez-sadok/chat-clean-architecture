# BDD : Send Message Use Case
## Prodsoft - Moez SADOK @Copyright 2024

@UC-06 @domain:messaging @actor:room-participant
Feature: Send Message
  As a Room Participant
  I want to send a message in a chat room
  So that every participant of the room gets it

  Background:
    Given the chat room "General" with participants Alice, Bob and Carol
    And Alice and Bob are connected

  Rule: R14 A sent message is saved in the room history

    Scenario: Sending a message
      When Alice sends "Hello team" in "General"
      Then "Hello team" by Alice is saved in the history of "General"
      And Alice gets the sent message back with her name, her id and the room id

  Rule: R15 Online participants receive the message in real time, except its author

    Scenario: Participants are online
      Given Carol is connected
      When Alice sends "Hello team" in "General"
      Then Bob receives "Hello team" from Alice in "General"
      And Carol receives "Hello team" from Alice in "General"
      And Alice does not receive her own message as a new message

  Rule: R16 Offline participants are told about the message by push notification

    @wip
    Scenario: A participant is offline
      Given Carol is not connected
      When Alice sends "Hello team" in "General"
      Then Bob receives "Hello team" from Alice in "General"
      And Carol gets a push notification with "Hello team"
      And "Hello team" is in the history of "General" when Carol comes back

  Rule: R17 A message to an unknown room is refused

    Scenario: Sending to a room that does not exist
      Given no room exists with the id 999
      When Alice sends "Hello" in room 999
      Then an error says the room 999 was not found
      And no message is saved
