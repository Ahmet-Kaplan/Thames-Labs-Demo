Feature: Allow users to manage general tenancy data
  As an administrator
  I want to manage the general tenancy data and settings
  So that I can improve the effectiveness and usability of the app

  Background:
    Given I am an administrator

  #Global Fields
  Scenario: An administrator can add and remove a global custom field
    When I go to the config settings
    And I add a global custom field
    Then I should see the global custom field has been created
    Given a "Company" has been created
    And I have permission to read companies
    And I have permission to edit companies
    When I visit the company details screen for "Test Ltd"
    Then I should see the global custom field in the company details
    When I go to the config settings
    And I remove the global custom field
    Then I should see the global custom field list is empty