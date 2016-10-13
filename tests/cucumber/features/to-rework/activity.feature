# Testing green under new changes but needs reworking
Feature: Allow users to access a central view of all activities
    As a user
    I want to view a list of all activities
    So that I can search and filter them as necessary

  #Company
  Scenario: A user with Company Read permission can see a company activity in the list
    Given a "Company" has been created
    And I have the "CanReadCompanies" permission
    And the company has an activity
    And I click "#menu-link-activities"
    Then I see a "companies" activity with the notes "Test company activity" in the list "#activity-list"

  Scenario: A user without Company Read permission cannot see a company activity in the list
    Given a "Company" has been created
    And the company has an activity
    And I click "#menu-link-activities"
    Then I do not see activities from "companies" in the list "#activity-list"

  #Contact
  Scenario: A user with Contact Read permission can see a contact activity in the list
    Given a "Contact" has been created
    And I have the "CanReadContacts" permission
    And the contact has an activity
    And I click "#menu-link-activities"
    Then I see a "contacts" activity with the notes "Test contact activity" in the list "#activity-list"

  Scenario: A user without Contact Read permission cannot see a company activity in the list
    Given a "Contact" has been created
    And the contact has an activity
    And I click "#menu-link-activities"
    Then I do not see activities from "contacts" in the list "#activity-list"

  #Opportunity
  Scenario: A user with Opportunity Read permission can see a opportunity activity in the list
    Given a "Opportunity" has been created
    And I have the "CanReadOpportunities" permission
    And the opportunity has an activity
    And I click "#menu-link-activities"
    Then I see a "opportunities" activity with the notes "Test opportunity activity" in the list "#activity-list"

  Scenario: A user without Opportunity Read permission cannot see a opportunity activity in the list
    Given a "Opportunity" has been created
    And the opportunity has an activity
    And I click "#menu-link-activities"
    Then I do not see activities from "opportunities" in the list "#activity-list"

  #Job
  Scenario: A user with Job Read permission can see a job activity in the list
    Given a "Company" has been created
    And a "Job" has been created
    And I have the "CanReadJobs" permission
    And the job has an activity
    And I click "#menu-link-activities"
    Then I see a "jobs" activity with the notes "Test job activity" in the list "#activity-list"

  Scenario: A user without Job Read permission cannot see a job activity in the list
    Given a "Company" has been created
    And a "Job" has been created
    And the job has an activity
    And I click "#menu-link-activities"
    Then I do not see activities from "jobs" in the list "#activity-list"

  #Purchase Order
  Scenario: A user with Purchase Order Read permission can see a purchase order activity in the list
    Given I have the "CanReadPurchaseOrders" permission
    And a "PurchaseOrder" has been created
    And the purchase order has an activity
    And I click "#menu-link-activities"
    Then I see a "purchaseOrders" activity with the notes "Test purchase order activity" in the list "#activity-list"

  Scenario: A user without Purchase Order Read permission cannot see a purchase order activity in the list
    Given a "PurchaseOrder" has been created
    And the purchase order has an activity
    And I click "#menu-link-activities"
    Then I do not see activities from "purchaseOrders" in the list "#activity-list"

  #Task
  Scenario: A user with Task Read permission can see a task activity in the list
    Given a "Company" task has been created
    And I have the "CanReadTasks" permission
    And the task has an activity
    And I click "#menu-link-activities"
    Then I see a "tasks" activity with the notes "Test task activity" in the list "#activity-list"

  Scenario: A user without Task Read permission cannot see a task activity in the list
    Given a "Company" task has been created
    And the task has an activity
    And I click "#menu-link-activities"
    Then I do not see activities from "tasks" in the list "#activity-list"
