# BDD : Get Rooms by User Use Case
## Prodsoft - Moez SADOK @Copyright 2024

Feature: Get Rooms by User
  As a connected User
  I want to retrieve all my chat rooms
  So that I can see my conversations and select one

Scenario: User has rooms (SPA)
  Given a User is authenticated and has joined chat rooms
  When the User sends a GetRoomsByUserRequest with their userId
  Then the system queries the repository for rooms by userId
  And the rooms are mapped to GetRoomsByUserResponseData with roomId and roomName
  And a Promise resolving to the list of rooms is returned to the User

Scenario: User has no rooms (SPA)
  Given a User is authenticated but has not joined any chat rooms
  When the User sends a GetRoomsByUserRequest with their userId
  Then the system queries the repository for rooms by userId
  And an empty list is returned to the User

Scenario: User has rooms (SSR)
  Given a User requests their rooms page via server-side rendering
  When the SSR controller receives a GetRoomsByUserRequest with the userId
  Then the SSR use case queries the repository for rooms by userId
  And the rooms are mapped to GetRoomsByUserResponseData
  And the presenter formats the rooms into RoomViewModels
  And the view renders the rooms as an HTML response
