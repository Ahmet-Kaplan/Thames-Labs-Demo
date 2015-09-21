@ignore
Feature: Allow administrators to give users permissions
  As an administrator
  I want to assign permissions to my users
  So that I can control what they can see and do

  As a user of the app
  I want to view content that is relevant to me
  So that I can work efficiently

  Scenario: The super admin can set a user as an administrator for their tenant
    Given a superadmin exists
    And a tenant exists
    And a restricted user exists
    And I am a logged in superadmin user
    When I navigate to "/tenants"
    And I click ".accordion-toggle"
    And I click "#btnEditTenantUser"
    And I click "#cbUserIsTenantAdministrator"
    And I click "#btnUpdateTenantUser"
    Then the restricted user should have the "Administrator" permission

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
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#tenantUsers"
    And I click "#addNewUserAccount"
    And I set text field "name" to "User Name"
    And I set text field "email" to "user.name@domain.com"
    And I submit the "addNewUser" form
    Then I should see a success toastr

  Scenario: A normal user can't see the 'Administration' button
    Given a user exists
    And I am a logged in user
    And I do not have the "Administrator" permission
    When I navigate to "/"
    And I click "#general-dropdown"
    Then I should not see the "#Administration" button
