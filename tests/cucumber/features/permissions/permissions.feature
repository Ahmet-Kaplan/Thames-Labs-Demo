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
    Then the user will have the role

  @dev
  Scenario: An administrator can see the correct menu items
    Given I am a logged in user
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
