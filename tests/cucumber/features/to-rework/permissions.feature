# Testing green under new changes but needs reworking
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
    Given I am a logged out user
    And a superadmin exists
    And I am a logged in superadmin user
    When I visit Tenants
    And I click "#btnEditTenantUser"
    Then I should see a modal
    And I click "#cbUserIsTenantAdministrator"
    And I click "#btnUpdateTenantUser"
    And the user "Test User" should have the "Administrator" permission

  Scenario: An administrator can see the correct menu items
    Given I have the "Administrator" permission
    When I click "#general-dropdown"
    Then I should see "#settings"

  Scenario: An administrator can access the Administration page
    Given I have the "Administrator" permission
    When I go to the config settings 
    Then I should see the heading "Configuration"
    When I go to the billing settings
    Then I should see the heading "Billing"
    When I go to the user settings
    Then I should see the heading "Users"

  Scenario: An restricted user cannot access the Administration page
    When I navigate to "/settings/configuration"
    Then I should see the heading "Dashboard"
    When I navigate to "/settings/billing"
    Then I should see the heading "Dashboard"
    When I navigate to "/settings/users"
    Then I should see the heading "Dashboard"

  Scenario: An administrator can add and delete new user
    Given I have the "Administrator" permission
    And I have "2" free users
    When I go to the user settings
    And I click "#add-user"
    And I set text field "name" to "Mario"
    And I set text field "email" to "mario@mariobros.com"
    And I click "#createUser"
    Then I should see a modal with the title "New user added"
    When I click confirm on the modal
    Then I should not see a modal
    And I click "#user-list .list-group-item:last-child #delete-user"
    Then I should see a modal
    When I click confirm on the modal
    Then I should see a modal with title "User removed"
    When I click confirm on the modal with title "User removed"
    Then I should not see a modal
    Then the restricted user should not exist in the database

  Scenario: An administrator cannot delete its own account
    Given I have the "Administrator" permission
    When I go to the user settings
    Then I cannot click "#user-list .list-group-item:last-child #delete-user"
    And the user "Test User" should have the "Administrator" permission

  Scenario: An Administrator can set another user to Administrator
    Given I have the "Administrator" permission
    And a restricted user exists
    When I go to the user settings
    And I click "#user-list .list-group-item:last-child a"
    Then I should see a modal
    And I click "#admin-checkbox"
    And I click "#update-user"
    Then I should not see a modal
    And the user "restricted user" should have the "Administrator" permission

  Scenario: An Administrator cannot unset its own 'Administrator' status
    Given I have the "Administrator" permission
    When I go to the user settings
    And I click "#user-list .list-group-item:last-child a"
    Then I should see a modal
    Then "#admin-checkbox" should be disabled
    And I click "#update-user"
    Then the user "Test User" should have the "Administrator" permission