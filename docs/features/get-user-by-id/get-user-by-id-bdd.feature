# BDD : Get User by ID Use Case
## Prodsoft - Moez SADOK @Copyright 2024

Feature: Get User by ID
  As a connected User
  I want to retrieve a user's information by their ID
  So that I can see their profile details

Scenario: User found
  Given a User is authenticated and a valid userId exists in the system
  When the User sends a GetUserByIdRequest with the userId
  Then the system queries the repository for the user by userId
  And the presenter formats the user into a UserOutputData with id and name
  And the formatted user is returned to the User

Scenario: User not found
  Given a User is authenticated and the requested userId does not exist
  When the User sends a GetUserByIdRequest with a non-existing userId
  Then the system queries the repository for the user by userId
  And null is returned to the User
