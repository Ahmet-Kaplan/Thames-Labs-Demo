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

  Scenario: A user should not be able to see companies created by a user under under another tenant
     Given the second tenant has a Company
     And I have permission to read companies
     And I visit Companies
     Then I should not see a company in the list

  Scenario: A user should not be able to see contacts created by a user under another tenant
    Given the second tenant has a Contact
    And I have permission to read contacts
    And I visit Contacts
    Then I should not see a contact in the list

  Scenario: A user should not be able to see opportunities created by a user under a another tenant
    Given the second tenant has an Opportunity
    And I have permission to read opportunities
    And I visit Opportunities
    Then I should not see an opportunity in the list

  Scenario: A user should not be able to see products created by a user under another tenant
    Given the second tenant has a Product
    And I have permission to read products
    And I visit Products
    Then I should not see a product in the list

  Scenario: A user should not be able to see projects created by a user under another tenant
    Given the second tenant has a Company
    And the second tenant has a Project
    And I have permission to read projects
    And I visit Projects
    Then I should not see a project in the list

  Scenario: A user should not be able to see purchase orders created by a user under another tenant
    Given the second tenant has a Purchase order
    And I have permission to read purchase orders
    And I visit PurchaseOrders
    Then I should not see a purchase order in the list

  Scenario: A user should not be able to see tasks created by a user under another tenant
    Given the second tenant has a Task
    And I have permission to read tasks
    And I visit Tasks
    Then I should not see a task in the list