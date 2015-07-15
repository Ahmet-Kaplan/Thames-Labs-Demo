Feature: Allow users to login and logout

  As a user of the app
  I want to login and logout
  So that I can prove my identity and work with my data

  Background:
    Given I am logged out

  @dev
  Scenario: A user can view the login screen
    Then I should see the title "RealtimeCRM - Login"

  @dev
  Scenario: A user can login with good credentials
    Given I can see the login form
    When I login with good credentials
    Then I am logged in

  @dev
  Scenario: A user can't login with bad credentials
    Given I can see the login form
    When I login with bad credentials
    Then I am not logged in
