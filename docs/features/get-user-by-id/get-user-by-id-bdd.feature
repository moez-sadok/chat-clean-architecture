# BDD : Get User by ID Use Case
## Prodsoft - Moez SADOK @Copyright 2024

@UC-04 @domain:users @actor:chat-member
Feature: Get User by ID
  As a Chat Member
  I want to look up a user by their id
  So that I can see who they are

  Rule: R9 A known user is returned with their id and name

    Scenario Outline: Looking up a known user
      Given the user <name> exists with the id <id>
      When I look up the user <id>
      Then I get the user with the id <id> and the name <name>

      Examples:
        | id | name  |
        | 1  | Alice |
        | 2  | Bob   |

  Rule: R10 Looking up an unknown user returns no user, not an error

    Scenario: Looking up an unknown user
      Given no user exists with the id 999
      When I look up the user 999
      Then I get no user
      And no error is raised
