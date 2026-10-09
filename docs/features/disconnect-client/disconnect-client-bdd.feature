# BDD : Disconnect Client Use Case
## Prodsoft - Moez SADOK @Copyright 2024

@UC-02 @domain:connection @actor:chat-member
Feature: Disconnect Client
  As a Chat Member
  I want to disconnect from the chat server
  So that my session is closed and its resources are released

  Rule: R4 Disconnecting an online user takes them offline

    Scenario: Disconnecting while online
      Given Alice is connected to the chat server
      When Alice disconnects
      Then the disconnection is confirmed
      And Alice is offline

  Rule: R5 Disconnecting a user who is not online is reported as failed

    Scenario: Disconnecting while offline
      Given Alice is not connected to the chat server
      When Alice disconnects
      Then the disconnection is reported as failed
      And the online users are unchanged

    Scenario: Disconnecting twice
      Given Alice was connected and has already disconnected
      When Alice disconnects again
      Then the disconnection is reported as failed
