Feature: Stop users from seeing data from other tenants
  As a user
  I want to only see my data
  And not that of another tenant

  Background:
    Given I am on the pro plan
    And another pro tenant exists

  Scenario: A user should not be able to see events created by a user under another tenant
    Given the second tenant has an Event
    And I have permission to read event logs
    And I visit EventLog
    Then I should not see an event in the list