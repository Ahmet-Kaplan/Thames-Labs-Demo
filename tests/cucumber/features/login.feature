@ignore
Feature: Allow users to login and logout

  As a user of the app
  I want to login and logout
  So that I can prove my identity and work with my data

  Background:
    Given I am logged out

  Scenario: A user can view the login screen
    Then I should see the sign in form

  Scenario: A user can login with good credentials
    Then I can log in with the password "goodpassword"

  Scenario: A user can't login with bad credentials
    Then I can't log in with the password "badpassword"

  Scenario: A user can logout with the logout button
    Then I can log in with the password "goodpassword"
    Given I am viewing the dashboard
    When I log out
    Then I should see the sign in form
