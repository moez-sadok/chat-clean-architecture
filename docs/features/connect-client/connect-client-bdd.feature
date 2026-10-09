# BDD : Connect Client Use Case
## Prodsoft - Moez SADOK @Copyright 2024

@UC-01 @domain:connection @actor:chat-member
Feature: Connect Client
  As a Chat Member
  I want to connect to the chat server
  So that I can send and receive messages in real time

  Background:
    Given Alice is a chat member

  Rule: R1 A client that carries a user id is registered as online

    Scenario: Connecting with a user id
      Given Alice is not connected to the chat server
      When Alice connects with her user id
      Then the connection is accepted
      And Alice is online

  Rule: R2 A client without a user id is refused

    Scenario: Connecting without a user id
      Given a client that carries no user id
      When the client connects to the chat server
      Then the connection is refused
      And no user is added to the online users

  Rule: R3 Connecting again keeps the session already open

    @wip
    Scenario: Connecting a second time
      Given Alice is already connected from a first client
      When Alice connects again from a second client
      Then the connection is accepted
      And Alice keeps receiving her messages on the first client
