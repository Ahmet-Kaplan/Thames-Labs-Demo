Feature: Allow administrators to give users permissions
  As an administrator
  I want to assign permissions to my users
  So that I can control what they can see and do

  As a user of the app
  I want to view content that is relevant to me
  So that I can work efficiently

  Background:
    Given a user exists

  Scenario: An administrator can see the correct menu items
    Given I am a logged in user
    And I have the "Administrator" permission
    When I click "#general-dropdown"
    Then I should see "#Administration"

  Scenario: An administrator can access the Administration page
    Given I am a logged in user
    And I have the "Administrator" permission
    When I click "#general-dropdown"
    Then I should see "#Administration"
    When I click "#Administration"
    Then I should see the heading "Administration"

  Scenario: An restricted user cannot access the Administration page
    Given I am a logged in user
    And I do not have the "Administrator" permission
    When I click "#general-dropdown"
    Then I should not see "#Administration"
    When I navigate to "/admin"
    Then I should not see the heading "Administration"

  Scenario: The super admin can set a user as an administrator for their tenant
    Given a superadmin exists
    And I am a logged in superadmin user
    When I navigate to "/tenants"
    And I click ".accordion-toggle"
    And I click "#btnEditTenantUser"
    And I click "#cbUserIsTenantAdministrator"
    And I click "#btnUpdateTenantUser"
    Then the user should have the "Administrator" permission
