@ignore
Feature: Allow users to change their password

  As a user of the app
  I want to be able to change my password
  So that I can keep my account safe

  Scenario: A user can change their password
    When I change my password to "newpassword"
    And I log out
    Then I can log in with the password "newpassword"
