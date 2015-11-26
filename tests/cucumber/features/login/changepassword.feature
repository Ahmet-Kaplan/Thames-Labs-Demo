Feature: Allow users to change their password

  As a user of the app
  I want to be able to change my password
  So that I can keep my account safe

  Background:
    Given a user exists
    And I am not a new user
    And I am a logged in user

  Scenario: A user can change their password
    When I click "#general-dropdown"
    And I click "#btnChangePassword"
    Then I should see a modal
    Then I set text field with id "objOldPassword" to "goodpassword"
    Then I set text field with id "objNewPassword" to "newpassword"
    Then I set text field with id "objRepPassword" to "newpassword"
    Then I click "#btnPasswordChange"
    Then I should not see a modal
    Then I click "#general-dropdown"
    Then I click "#sign-out"
    Then I can see the login form
    Then I set text field with id "at-field-email" to "test@domain.com"
    Then I set text field with id "at-field-password" to "newpassword"
    Then I click "#at-btn"
    Then I am logged in
