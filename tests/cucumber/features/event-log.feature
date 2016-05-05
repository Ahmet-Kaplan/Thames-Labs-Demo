Feature: Allow users to view event logs
  As a user
  I want to see events
  So that I can manage the previous use of my account

  Background:
    Given I have permission to read event logs 
    And I am on the pro plan

  Scenario: A pro user can see the event log
    When I visit EventLog
    Then I should see the heading "Event Log"

  Scenario: A user can see an event in the event log
    Given an Event has been created
    And I visit EventLog
    Then I should see an event in the list

  Scenario: A user should not be able to see events created by a user under another tenant
    Given a second pro tenant exists
    And the second tenant has an Event
    And I visit EventLog
    Then I should not see an event in the list
