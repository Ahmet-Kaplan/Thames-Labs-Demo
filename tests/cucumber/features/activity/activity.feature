Feature: Allow users to access a central view of all activities
  As a user
  I want to view a list of all activities
  So that I can search and filter them as necessary

  Background:
    Given a user exists
    And I am a logged in user

  #Company
  Scenario: A user with Company Read permission can see a company activity in the list
    Given a "Company" has been created
    And I have the "CanReadCompanies" permission
    And the company has an activity
    And I click "#menuLinkActivities"
    Then I see a "companies" activity with the notes "Test company activity" in the list "#activity-list"

  Scenario: A user without Company Read permission cannot see a company activity in the list
    Given a "Company" has been created
    And the company has an activity
    And I click "#menuLinkActivities"
    Then I do not see activities from "companies" in the list "#activity-list"

  #Contact
  Scenario: A user with Contact Read permission can see a contact activity in the list
    Given a "Contact" has been created
    And I have the "CanReadContacts" permission
    And the contact has an activity
    And I click "#menuLinkActivities"
    Then I see a "contacts" activity with the notes "Test contact activity" in the list "#activity-list"

  Scenario: A user without Contact Read permission cannot see a company activity in the list
    Given a "Contact" has been created
    And the contact has an activity
    And I click "#menuLinkActivities"
    Then I do not see activities from "contacts" in the list "#activity-list"

  #Opportunity
  Scenario: A user with Opportunity Read permission can see a opportunity activity in the list
    Given a "Opportunity" has been created
    And I have the "CanReadOpportunities" permission
    And the opportunity has an activity
    And I click "#menuLinkActivities"
    Then I see a "opportunities" activity with the notes "Test opportunity activity" in the list "#activity-list"

  Scenario: A user without Opportunity Read permission cannot see a opportunity activity in the list
    Given a "Opportunity" has been created
    And the opportunity has an activity
    And I click "#menuLinkActivities"
    Then I do not see activities from "opportunities" in the list "#activity-list"

  #Project
  Scenario: A user with Project Read permission can see a project activity in the list
    Given a "Company" has been created
    And a "Project" has been created
    And I have the "CanReadProjects" permission
    And the project has an activity
    And I click "#menuLinkActivities"
    Then I see a "projects" activity with the notes "Test project activity" in the list "#activity-list"

  Scenario: A user without Project Read permission cannot see a project activity in the list
    Given a "Company" has been created
    And a "Project" has been created
    And the project has an activity
    And I click "#menuLinkActivities"
    Then I do not see activities from "projects" in the list "#activity-list"

  #Purchase Order
  Scenario: A user with Purchase Order Read permission can see a purchase order activity in the list
    Given a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I navigate to "/purchaseorders"
    And I click "#add-purchase-order"
    And I set text field with selector "#description" to "test purchase order"
    And I selectize "supplierCompanyId" to "Test Ltd"
    And I click "#create-purchase-order"
    And I have the "CanReadPurchaseOrders" permission
    And the purchase order has an activity
    And I click "#menuLinkActivities"
    Then I see a "purchaseOrders" activity with the notes "Test purchase order activity" in the list "#activity-list"

  Scenario: A user without Purchase Order Read permission cannot see a purchase order activity in the list
    Given a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I navigate to "/purchaseorders"
    And I click "#add-purchase-order"
    And I set text field with selector "#description" to "test purchase order"
    And I selectize "supplierCompanyId" to "Test Ltd"
    And I click "#create-purchase-order"
    And the purchase order has an activity
    And I do not have the "CanReadCompanies" permission
    And I do not have the "CanReadPurchaseOrders" permission
    And I do not have the "CanCreatePurchaseOrders" permission
    And I click "#menuLinkActivities"
    Then I do not see activities from "purchase orders" in the list "#activity-list"

  #Task
  Scenario: A user with Task Read permission can see a task activity in the list
    Given a "Company" task has been created
    And I have the "CanReadTasks" permission
    And the task has an activity
    And I click "#menuLinkActivities"
    Then I see a "tasks" activity with the notes "Test task activity" in the list "#activity-list"

  Scenario: A user without Task Read permission cannot see a task activity in the list
    Given a "Company" task has been created
    And the task has an activity
    And I click "#menuLinkActivities"
    Then I do not see activities from "tasks" in the list "#activity-list"
