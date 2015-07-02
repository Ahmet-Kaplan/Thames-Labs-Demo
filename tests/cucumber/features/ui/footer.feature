Feature: Footer is displayed in the user interface

  As a user looking at the app
  I want to see a footer

  @dev
  Scenario: A user can see a footer
    Given I navigate to "/"
    Then I see a footer

  @dev
  Scenario: A user can see a footer
    Given I am a logged in user
    Then I see a footer
