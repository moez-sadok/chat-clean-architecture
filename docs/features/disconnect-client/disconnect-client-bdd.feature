# BDD : Disconnect Client Use Case
## Prodsoft - Moez SADOK @Copyright 2024

Feature: Disconnect Client
  As a User
  I want to disconnect from the chat server
  So that my session is properly closed and resources are released

Scenario: Successful disconnection
  Given a User is connected to the chat server
  When the system sends a DisconnectClient request with the user's userId
  Then the chat server removes the client via disconnectUser
  And true is returned indicating a successful disconnection

Scenario: User not connected
  Given a User is not currently connected to the chat server
  When the system sends a DisconnectClient request with the user's userId
  Then the chat server cannot find the client via disconnectUser
  And false is returned indicating the user was not connected
