Feature: Allow the user to use the fab

  As a user of the app
  I want to see the fab
  So that I can quickly add entities

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "CanCreateCompanies" permission
    And I have the "CanCreateContacts" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanCreateProjects" permission

  Scenario: A user should be able to see the fab menu
    When I click "#fab-btn"
    Then I should see "#fab-menu"

  Scenario: A user should be able to quick add a contact (fab)
    When I click "#fab-btn"
    And I click "#fabAddContacts"
    Then I should see a modal with title "Add new contact"

  Scenario: A user should be able to quick add a company (fab)
    When I click "#fab-btn"
    And I click "#fabAddCompanies"
    Then I should see a modal with title "Add new company"

  Scenario: A user should be able to quick add a project (fab)
    When I click "#fab-btn"
    And I click "#fabAddProject"
    Then I should see a modal with title "Add new project"

  Scenario: A user should be able to quick add a purchase order (fab)
    When I click "#fab-btn"
    And I click "#fabAddPurchaseOrder"
    Then I should see a modal with title "Add new purchase order"

#Toggling
  Scenario: A user should be able to toggle the action button (fab)
    When I click "#general-dropdown"
    And I click "#toggleFab"
    Then "#fab-btn" should be hidden
    When I click "#general-dropdown"
    And I click "#toggleFab"
    Then I should see "#fab-btn"
