@dev
Feature: Allow users to login and logout

  As a user of the app
  I want to login and logout
  So that I can prove my identity and work with my data

  Background:
    Given I am a logged out user

  Scenario: A user can view the login screen
    Then I should see the title "RealtimeCRM - Login"

  Scenario: A user can login with good credentials
    Given I can see the login form
    When I enter good credentials into the login form
    Then I am logged in

  Scenario: A user can't login with bad credentials
    Given I can see the login form
    When I enter bad credentials into the login form
    Then I am not logged in

  Scenario: A user can logout with the logout button
    Given I am a logged in user
    When I navigate to "/"
    And I click "#general-dropdown"
    And I click "#sign-out"
    Then I can see the login form
