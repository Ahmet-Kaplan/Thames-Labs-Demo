Feature: Stop users from seeing data from other tenants
  As a user
  I want to only see my data
  And not that of another tenant

  Background:
    Given another pro tenant exists

  Scenario: A user should not be able to see events created by a user under another tenant
    Given the second tenant has an Event
    And I have the "CanReadEventLog" permission
    And I visit EventLog
    Then I should not see an event in the list

  Scenario: A user should not be able to see companies created by a user under under another tenant
     Given the second tenant has a Company
     And I have the "CanReadCompanies" permission
     And I visit Companies
     Then I should not see a company in the list

  Scenario: A user should not be able to see contacts created by a user under another tenant
    Given the second tenant has a Contact
    And I have the "CanReadContacts" permission
    And I visit Contacts
    Then I should not see a contact in the list

  Scenario: A user should not be able to see opportunities created by a user under a another tenant
    Given the second tenant has an Opportunity
    And I have the "CanReadOpportunities" permission
    And I visit Opportunities
    Then I should not see an opportunity in the list

  Scenario: A user should not be able to see products created by a user under another tenant
    Given the second tenant has a Product
    And I have the "CanReadProducts" permission
    And I visit Products
    Then I should not see a product in the list

  Scenario: A user should not be able to see jobs created by a user under another tenant
    Given the second tenant has a Company
    And the second tenant has a Job
    And I have the "CanReadJobs" permission
    And I visit Jobs
    Then I should not see a job in the list

  Scenario: A user should not be able to see purchase orders created by a user under another tenant
    Given the second tenant has a PurchaseOrder
    And I have the "CanReadPurchaseOrders" permission
    And I visit PurchaseOrders
    Then I should not see a purchase order in the list

  Scenario: A user should not be able to see tasks created by a user under another tenant
    Given the second tenant has a CompanyTask
    And I have the "CanReadTasks" permission
    And I visit Tasks
    Then I should not see a task in the list