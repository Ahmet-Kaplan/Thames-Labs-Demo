Feature: Allow users to view event logs
  As a user
  I want to see events
  So that I can manage the previous use of my account

  Background:
    Given a user exists
    And I am a logged in user

  Scenario: A user can see the event log
    Given I have the "CanReadEventLog" permission
    And I navigate to "/events"
    Then I should see the heading "Event Log"

  Scenario: A user can see an event in the event log
    Given I have the "CanReadEventLog" permission
    And an "Event" has been created
    And I navigate to "/events"
    Then I should see "#list-item"
@dev
  Scenario: A user should not be able to see events created by a user under another tenant
    Given I have the "CanReadEventLog" permission
    And an "Event" has been created
    And I navigate to "/events"
    Then I should see "#list-item"
    Given a second tenant exists
    And a second user exists
    And I log out
    And I log in as user 2
    And I have the "CanReadEventLog" permission
    And I navigate to "/events"
    Then I should not see "#list-item"
