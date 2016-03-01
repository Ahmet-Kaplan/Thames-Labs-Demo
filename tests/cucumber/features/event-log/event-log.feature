Feature: Allow users to view event logs
  As a user
  I want to see events
  So that I can manage the previous use of my account

  Background:
    Given a user exists
    And I am a logged in user

  Scenario: A pro user can see the event log
    Given I have the "CanReadEventLog" permission
    And I am on the pro plan
    And I click "#menuLinkEventLog"
    Then I should see the heading "Event Log"

  Scenario: A free user cannot see the event log
    Given I have the "CanReadEventLog" permission
    And I am on the free plan
    And I click "#menuLinkEventLog"
    Then I should not see the heading "Event Log"

  Scenario: A user can see an event in the event log
    Given I have the "CanReadEventLog" permission
    And I am on the pro plan
    And an "Event" has been created
    And I click "#menuLinkEventLog"
    Then I should see "#list-item"

  Scenario: A user should not be able to see events created by a user under another tenant
    Given I have the "CanReadEventLog" permission
    And I am on the pro plan
    And a second tenant exists
    And the second tenant is on the pro plan
    And a second user exists
    And an "Event" has been created
    And I click "#menuLinkEventLog"
    Then I should see "#list-item"
    Given I log out
    And I log in as a second tenant user
    And I have the "CanReadEventLog" permission
    And I click "#menuLinkEventLog"
    Then I should not see "#list-item"
