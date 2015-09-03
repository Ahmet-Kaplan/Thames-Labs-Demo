Feature: Allow Administrators to add users

  As an admin user of the app
  I want to see the administration section
  So that I can configure RealTimeCRM

  Background:
    Given a user exists
    And I am a logged in user

  Scenario: An administrator can see the 'Administration' button
    Given I have the "Administrator" permission
    When I navigate to "/"
    And I click "#general-dropdown"
    Then I should see the "#Administration" button

  Scenario: An administrator can add a new user
    Given I have the "Administrator" permission
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#userAdminPanelExpander"
    And I click "#addNewUserAccount"
    And I set text field "name" to "User Name"
    And I set text field "email" to "user.name@domain.com"
    And I submit the "addNewUser" form
    Then I should see a success toastr

  Scenario: A normal user can't see the 'Administration' button
    And I do not have the "Administrator" permission
    When I navigate to "/"
    And I click "#general-dropdown"
    Then I should not see the "#Administration" button
