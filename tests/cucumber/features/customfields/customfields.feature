Feature: Allow users to specify their own data fields/values against an entity

  As a user of the app
  I want to store non-specific data against an entity
  So that all the information I require is in a single place

  Background:
    Given I am a logged in user
    And a company has been created

  Scenario: A user can see the custom field display against a company
    When I navigate to a company page
    Then I should see a panel with title "Custom Fields"

  Scenario: A user can open the "Add Custom Fields" modal
    When I navigate to a company page
    And I click the "Add Custom Field" button
    Then I should see a modal with header "Add new custom field"

  @dev
  Scenario: A user can add a custom field
    When I navigate to a company page
    And I click the "Add Custom Field" button
    And I add a new custom field
    Then I should see the custom field "velocity" in the list
  
  @dev
  Scenario: A user can edit a custom field
    When I navigate to a company page
    And I can see the "velocity" custom field
    And I click the "Edit" button
    And I make a change
    Then I should see the updated custom field "velocity" in the list
    
  Scenario: A user can delete a custom field
    When I navigate to a company page
    And I can see the "velocity" custom field
    Then I click the "Delete" button
    Then I should see a modal
    Then I click ".bootbox-confirm button.btn-primary"
    Then I should no longer see the custom field "velocity" in the list
