Feature: Allow users to navigate the app

  As a user looking at the app
  I want to see a navigation bar and sidebar
  So that I can find what I am looking for

  @dev
  Scenario: A user can see the app name in the header
    Given I navigate to "/"
    Then I see the app name in the header

  @dev
  Scenario: A user can see the dashboard on the sidebar
    Given I am a logged in user
    Then I see the dashboard on the sidebar
