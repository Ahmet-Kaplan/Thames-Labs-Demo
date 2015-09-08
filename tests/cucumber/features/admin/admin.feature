@dev
Feature: Allow users to manage general tenancy data

  As an administrator
  I want to manage the general tenancy data and settings
  So that I can improve the effectiveness and usability of the app

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "Administrator" permission

  #Access
  Scenario: An administrator can access the Administration area
    When I navigate to "/admin"
    Then I should see the heading "Administration"

  #Global Fields
  Scenario: An administrator can add a global field
    When I click "#globCustomFieldsExpander"
    And I click "#addGlobalCustomField"
    And I set text field "custom-field-name" to "velocity"
    And I click "#typeText"
    And I set text field "custom-field-text-value" to "cucumber"
    And I set select field "select-entity" to "company"
    And I click '#submit-custom-field'
    Then I should an global field with the name "velocity" in the list "#custom-field-list"
