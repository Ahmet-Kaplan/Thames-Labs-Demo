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
