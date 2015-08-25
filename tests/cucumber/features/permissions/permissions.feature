Feature: Allow users to perform actions based on a set of pre-defined permissions
  As an administrator
  I want to assign permissions to my users
  So that I can control what they can see and do

  As a user of the app
  I want to view content that is relevant to me
  So that I can work efficiently

  @dev
  Scenario: The super-admin can set a user as an administrator for their tenant
    Given I am a logged in superadmin user
    When I open the tenancy user settings form
    And I set the user as an administrator
    Then the user will have the "Administrator" role

  @dev
  Scenario: An administrator can see the correct menu items
    Given I am a logged in user
    And I have the "Administrator" role
    When I open the user menu
    Then I see the Administration menu option

  @dev
  Scenario: An administrator can access the Administration page
    Given I am a logged in user
    And I have the "Administrator" role
    When I click the Administration menu option
    Then I navigate to "/admin"

  @dev
  Scenario: An normal user cannot access the Administration page
    Given I am a normal user
    And I do not have the "Administrator" role
    When I open the user menu
    Then I cannot see the Administration menu option

  @dev
  Scenario: An administrator can add user permissions
    Given I am a logged in user
    And I have the "Administrator" role
    When I open the user settings modal
    And I add the "CanCreateCompanies" permission to a user
    And I save the form
    Then the user will have the role "CanCreateCompanies"

  @dev
  Scenario: An administrator can revoke user permissions
    Given I am a logged in user
    And I have the "Administrator" role
    When I open the user settings modal
    And I remove the "CanCreateCompanies" permission from a user
    And I save the form
    Then the user will not have the role "CanCreateCompanies"

  @dev
  Scenario: A normal user cannot see the Companies menu item without the correct permission
    Given I am a normal user
    And I do not have the "CanReadCompanies" role
    Then the "Companies" menu item is not shown

  @dev
  Scenario: A normal user can see the Companies menu item with the correct permission
    Given I am a logged in user
    And I have the "CanReadCompanies" role
    Then the "Companies" menu item is shown

  @dev
  Scenario: An administrator can see the Companies menu
    Given I am a logged in user
    And I have the "Administrator" role
    Then the "Companies" menu item is shown

  @dev
  Scenario: A normal user cannot see the Add Company button without the correct permission
    Given I am a normal user
    And I do not have the "CanCreateCompanies" role
    And I navigate to "/companies"
    Then I cannot see the "createCompany" button

  @dev
  Scenario: A normal user can see the Add Company button with the correct permission
    Given I am a logged in user
    And I have the "CanCreateCompanies" role
    And I navigate to "/companies"
    Then I can see the "createCompany" button

  @dev
  Scenario: An administrator can see the Add Company button
    Given I am a logged in user
    And I have the "Administrator" role
    And I navigate to "/companies"
    Then I can see the "createCompany" button

  @dev
  Scenario: A normal user cannot see the Edit Company button without the correct permission
    Given I am a normal user
    And I do not have the "CanEditCompanies" role
    When I navigate to a company detail page
    Then I cannot see the "edit-company" button

  @dev
  Scenario: A normal user can see the Edit Company button with the correct permission
    Given I am a logged in user
    And I have the "CanEditCompanies" role
    When I navigate to a company detail page
    Then I can see the "edit-company" button

  @dev
  Scenario: An administrator can see the Edit Company button
    Given I am a logged in user
    And I have the "Administrator" role
    When I navigate to a company detail page
    Then I can see the "edit-company" button

  @dev
  Scenario: A normal user cannot see the Delete Company button without the correct permission
    Given I am a normal user
    And I do not have the "CanDeleteCompanies" role
    When I navigate to a company detail page
    Then I cannot see the "remove-company" button

  @dev
  Scenario: A normal user can see the Delete Company button with the correct permission
    Given I am a logged in user
    And I have the "CanDeleteCompanies" role
    When I navigate to a company detail page
    Then I can see the "remove-company" button

  @dev
  Scenario: An administrator can see the Delete Company button
    Given I am a logged in user
    And I have the "Administrator" role
    When I navigate to a company detail page
    Then I can see the "remove-company" button
