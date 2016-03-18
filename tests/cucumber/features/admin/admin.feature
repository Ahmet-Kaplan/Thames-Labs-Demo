Feature: Allow users to manage general tenancy data
  As an administrator
  I want to manage the general tenancy data and settings
  So that I can improve the effectiveness and usability of the app

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "Administrator" permission
    And I click "#general-dropdown"
    And I click "#Administration"

  #Access
  Scenario: An administrator can access the Administration area
    Then I should see the heading "Administration"

  #Global Fields
  Scenario: An administrator can add a global field and then delete it
    When I click "#globCustomFieldsExpander"
    And I click "#addGlobalCustomField"
    And I set text field with id "custom-field-name" to "velocity"
    And I click "#typeText"
    And I set text field with id "custom-field-text-value" to "cucumber"
    And I selectize "select-entity" to "Company"
    And I click the button "#createCustomField"
    And I see a global field with the name "velocity" in the list "#custom-field-list"
    And I click "#delete-global-custom-field"
    And I click confirm on the modal
    Then the global field should no longer be visible

  Scenario: An administrator can add a global field and view it on the company details page 
    Given a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanEditCompanies" permission
    When I click "#globCustomFieldsExpander"
    And I click "#addGlobalCustomField"
    And I set text field with id "custom-field-name" to "velocity"
    And I click "#typeText"
    And I set text field with id "custom-field-text-value" to "cucumber"
    And I selectize "select-entity" to "Company"
    And I click the button "#createCustomField"
    And I see a global field with the name "velocity" in the list "#custom-field-list"
    And I navigate to a company page
    Then I see a field with the name "velocity" in the custom field list
