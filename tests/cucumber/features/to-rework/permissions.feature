# Testing green under new changes but needs reworking
@dev
Feature: Allow administrators to give users permissions
  As an administrator
  I want to assign permissions to my users
  So that I can control what they can see and do

  As a user of the app
  I want to view content that is relevant to me
  So that I can work efficiently

  # N.B. this scenario was tweaked slightly and uses a mix of old and new steps
  # It should be reworked to be entirely new style
  Scenario: The super admin can set a user as an administrator for their tenant
    Given I am on the pro plan
    And I am a logged out user
    And a superadmin exists
    And I am a logged in superadmin user
    When I navigate to "/tenants"
    And I click "#btnEditTenantUser"
    And I click "#cbUserIsTenantAdministrator"
    And I click "#btnUpdateTenantUser"
    Then the user "Test User" should have the "Administrator" permission

  Scenario: An administrator can see the correct menu items
    Given a user exists
    Given I am a logged in user
    And I have the "Administrator" permission
    When I click "#general-dropdown"
    Then I should see "#Administration"

  Scenario: An administrator can access the Administration page
    Given a user exists
    And I am a logged in user
    And I have the "Administrator" permission
    When I click "#general-dropdown"
    Then I should see "#Administration"
    When I click "#Administration"
    Then I should see the heading "Administration"

  Scenario: An restricted user cannot access the Administration page
    Given a user exists
    And I am a logged in user
    And I do not have the "Administrator" permission
    When I click "#general-dropdown"
    Then I should not see "#Administration"
    When I navigate to "/admin"
    Then I should see the heading "Dashboard"

  Scenario: An administrator can see the 'Administration' button
    Given a user exists
    And I am a logged in user
    And I have the "Administrator" permission
    When I navigate to "/"
    And I click "#general-dropdown"
    Then I should see the "#Administration" button

  Scenario: An administrator can add a new user
    Given a user exists
    And I am a logged in user
    And I have the "Administrator" permission
    And I am on the pro plan
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#userAdminPanelExpander"
    And I click "#addNewUserAccount"
    And I set text field "name" to "Mario"
    And I set text field "email" to "mario@mariobros.com"
    And I submit the "addNewUser" form
    Then I should see a modal with the title "New user added"

  Scenario: An administrator can delete a user
    Given a user exists
    And I am a logged in user
    And I have the "Administrator" permission
    And a restricted user exists
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#userAdminPanelExpander"
    And I click "#user-list > .list-group-item:last-child #tenantRemoveUser"
    Then I should see a modal
    When I click confirm on the modal
    Then I should see a modal with title "User removed"
    When I click confirm on the modal with title "User removed"
    Then the restricted user should not exist in the database

  Scenario: An administrator cannot delete its own account
    Given a user exists
    And I am a logged in user
    And I have the "Administrator" permission
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#userAdminPanelExpander"
    Then I cannot click "#tenantRemoveUser"
    And the user "Test User" should have the "Administrator" permission

  Scenario: An Administrator can set another user to Administrator
    Given a user exists
    And I am a logged in user
    And I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#userAdminPanelExpander"
    And I click "#user-list > .list-group-item:last-child #btnEditTenantUserPermissions"
    And I click "#cbUserIsTenantAdministrator"
    And I click "#btnUpdateTenantUserPermissions"
    Then the user "restricted user" should have the "Administrator" permission

  Scenario: An Administrator cannot unset its own 'Administrator' status
    Given a user exists
    And I am a logged in user
    And I have the "Administrator" permission
    And I am on the pro plan
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#userAdminPanelExpander"
    And I click "#btnEditTenantUserPermissions"
    And I click "#cbUserIsTenantAdministrator"
    And I click "#btnUpdateTenantUserPermissions"
    Then the user "Test User" should have the "Administrator" permission

  Scenario: A normal user can't see the 'Administration' button
    Given a user exists
    And I am a logged in user
    And I do not have the "Administrator" permission
    When I navigate to "/"
    And I click "#general-dropdown"
    Then I should not see the "#Administration" button
