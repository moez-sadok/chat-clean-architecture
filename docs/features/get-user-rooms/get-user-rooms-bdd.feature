# BDD : Get Rooms by User Use Case
## Prodsoft - Moez SADOK @Copyright 2024

@UC-05 @domain:rooms @actor:chat-member
Feature: Get Rooms by User
  As a Chat Member
  I want to see the chat rooms I belong to
  So that I can pick a conversation

  Background:
    Given these chat rooms and participants:
      | room    | participants       |
      | General | Alice, Bob, Carol  |
      | Project | Alice, Bob         |
      | Random  | Bob, Carol         |

  Rule: R11 A user sees only the rooms they participate in

    Scenario: Listing my rooms
      When Alice lists her rooms
      Then she gets the rooms "General" and "Project"
      And each room gives its id and its name
      And the room "Random" is not listed

  Rule: R12 A user who belongs to no room gets an empty list

    Scenario: Listing rooms with no membership
      Given Dave participates in no room
      When Dave lists his rooms
      Then he gets an empty list of rooms

  Rule: R13 The rooms page rendered on the server lists the same rooms as the SPA

    Scenario: Opening the rooms page rendered on the server
      When Alice opens her rooms page rendered on the server
      Then the page lists the rooms "General" and "Project"
