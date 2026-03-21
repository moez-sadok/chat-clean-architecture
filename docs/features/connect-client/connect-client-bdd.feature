# BDD : Connect Client Use Case
## Prodsoft - Moez SADOK @Copyright 2024

Feature: Connect Client
  As a User
  I want to connect to the chat server
  So that I can send and receive real-time messages

Scenario: Successful connection
  Given a User opens the chat application
  When the system sends a ConnectClient request with the user's IChatClient
  Then the chat server registers the client via connectUser
  And true is returned indicating a successful connection

Scenario: Connection failure
  Given a User attempts to connect to the chat server
  When the system sends a ConnectClient request with an invalid or duplicate client
  Then the chat server rejects the connection via connectUser
  And false is returned indicating the connection failed
