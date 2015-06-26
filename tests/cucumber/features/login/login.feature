Feature: Allow users to login and logout

  As a user of the app
  I want to login and logout
  So that I can prove my identity and work with my data

  Background:
    Given I am a new user
    And I navigate to "/"

  @dev
  Scenario: A user can view the login screen
    Then I should see the title "RealtimeCRM - Login"

  @dev
  Scenario: A user can login with good credentials
    When I enter good authentication information
    Then I should be logged in

  @dev
  Scenario: A user cannot login with bad credentials
    When I enter bad authentication information
    Then I should not be logged in

  @dev
  Scenario: A normal user should not see superadmin stuff
    When I enter good authentication information
    Then I should not see superadmin stuff

  # think this is related to routing which will be fixed in another branch
  @ignore
  Scenario: A normal user should be redirected to the dashboard on login from '/'
    When I enter good authentication information
    Then I should see the dashboard
