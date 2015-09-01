@ignore
Feature: Allow users to perform actions based on a set of pre-defined permissions
  As an administrator
  I want to assign permissions to my users
  So that I can control what they can see and do

  As a user of the app
  I want to view content that is relevant to me
  So that I can work efficiently

  Scenario: The super-admin can set a user as an administrator for their tenant
    Given I am a logged in superadmin user
    When I open the tenancy user settings form
    And I set the user as an administrator
    Then the standard user will have the "Administrator" role

  Scenario: An administrator can see the correct menu items
    Given I am a user
    And I have the "Administrator" role
    When I open the user menu
    Then I see the Administration menu option

  Scenario: An administrator can access the Administration page
    Given I am a user
    And I have the "Administrator" role
    When I click the Administration menu option
    Then I navigate to "/admin"

  Scenario: An restricted user cannot access the Administration page
    Given I am a restricted user
    And I do not have the "Administrator" role
    When I open the user menu
    Then I cannot see the Administration menu option

  Scenario: A restricted user cannot see the Companies menu item without the correct permission
    Given I am a restricted user
    And I do not have the "CanReadCompanies" role
    Then the "Companies" menu item is not shown

  Scenario: A user can see the Companies menu item with the correct permission
    Given I am a user
    And I have the "CanReadCompanies" role
    Then the "Companies" menu item is shown

  Scenario: An administrator can see the Companies menu
    Given I am a user
    And I have the "Administrator" role
    Then the "Companies" menu item is shown

  Scenario: An administrator can add user permissions
    Given I am a user
    And I have the "Administrator" role
    When I open the user settings modal
    And I add the "CanReadCompanies" permission to a user
    And I save the form
    Then the user will have the "CanReadCompanies" role

  Scenario: A restricted user cannot see the Add Company button without the correct permission
    Given I am a restricted user
    And I do not have the "CanCreateCompanies" role
    And I navigate to the companies list
    Then I cannot see the "#createCompany" button

  Scenario: A user can see the Add Company button with the correct permission
    Given I am a user
    And I have the "CanCreateCompanies" role
    And I navigate to the companies list
    Then I can see the "#createCompany" button

  Scenario: An administrator can see the Add Company button
    Given I am a user
    And I have the "Administrator" role
    And I navigate to the companies list
    Then I can see the "#createCompany" button

  Scenario: An administrator can add user permissions
    Given I am a user
    And I have the "Administrator" role
    When I open the user settings modal
    And I add the "CanCreateCompanies" permission to a user
    And I save the form
    Then the user will have the "CanCreateCompanies" role

  Scenario: A restricted user cannot see the Edit Company button without the correct permission
    Given I am a restricted user
    And I do not have the "CanEditCompanies" role
    And a company has been created
    When I navigate to a company detail page
    Then I cannot see the "#edit-company" button

  Scenario: A user can see the Edit Company button with the correct permission
    Given I am a user
    And I have the "CanEditCompanies" role
    And a company has been created
    When I navigate to a company detail page
    Then I can see the "#edit-company" button

  Scenario: An administrator can see the Edit Company button
    Given I am a user
    And I have the "Administrator" role
    And a company has been created
    When I navigate to a company detail page
    Then I can see the "#edit-company" button

  Scenario: An administrator can add user permissions
    Given I am a user
    And I have the "Administrator" role
    When I open the user settings modal
    And I add the "CanEditCompanies" permission to a user
    And I save the form
    Then the user will have the "CanEditCompanies" role

  Scenario: A restricted user cannot see the Delete Company button without the correct permission
    Given I am a restricted user
    And I do not have the "CanDeleteCompanies" role
    And a company has been created
    When I navigate to a company detail page
    Then I cannot see the "#remove-company" button

  Scenario: A normal user can see the Delete Company button with the correct permission
    Given I am a user
    And I have the "CanDeleteCompanies" role
    And a company has been created
    When I navigate to a company detail page
    Then I can see the "#remove-company" button

  Scenario: An administrator can see the Delete Company button
    Given I am a user
    And I have the "Administrator" role
    And a company has been created
    When I navigate to a company detail page
    Then I can see the "#remove-company" button

  Scenario: An administrator can add user permissions
    Given I am a user
    And I have the "Administrator" role
    When I open the user settings modal
    And I add the "CanDeleteCompanies" permission to a user
    And I save the form
    Then the user will have the "CanDeleteCompanies" role

  Scenario: An administrator can revoke user permissions
    Given I am a user
    And I have the "Administrator" role
    When I open the user settings modal
    And I remove the "CanDeleteCompanies" permission from a user
    And I save the form
    Then the user will not have the "CanDeleteCompanies" role

  Scenario: An administrator can revoke user permissions
    Given I am a user
    And I have the "Administrator" role
    When I open the user settings modal
    And I remove the "CanEditCompanies" permission from a user
    And I save the form
    Then the user will not have the "CanEditCompanies" role

  Scenario: An administrator can revoke user permissions
    Given I am a user
    And I have the "Administrator" role
    When I open the user settings modal
    And I remove the "CanCreateCompanies" permission from a user
    And I save the form
    Then the user will not have the "CanCreateCompanies" role

  Scenario: An administrator can revoke user permissions
    Given I am a user
    And I have the "Administrator" role
    When I open the user settings modal
    And I remove the "CanReadCompanies" permission from a user
    And I save the form
    Then the user will not have the "CanReadCompanies" role
