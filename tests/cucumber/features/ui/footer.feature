Feature: Footer is displayed in the user interface

  As a user looking at the app
  I want to see a footer

  Scenario: A user can see a footer
    Given I navigate to "/"
    Then I see a footer

  Scenario: A user can see a footer
    Given I am a logged in user
    And I am on a desktop
    Then I see a footer
