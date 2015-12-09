Feature: Allow users to change their password

  As a user of the app
  I want to be able to change my password
  So that I can keep my account safe

  Background:
    Given a user exists
    And 
    And I am a logged in user

  Scenario: A user can change their password
    When I click "#general-dropdown"
    And I click "#btnChangePassword"
    Then I should see a modal
    When I set text field with id "objOldPassword" to "goodpassword"
    And I set text field with id "objNewPassword" to "newpassword"
    And I set text field with id "objRepPassword" to "newpassword"
    And I click "#btnPasswordChange"
    Then I should see a "success" toastr with the message "Password changed successfully"
    And I should not see a modal
    When I click "#general-dropdown"
    And I click "#sign-out"
    Then I can see the login form
    When I set text field with id "at-field-email" to "test@domain.com"
    And I set text field with id "at-field-password" to "newpassword"
    And I click "#at-btn"
    Then I am logged in
