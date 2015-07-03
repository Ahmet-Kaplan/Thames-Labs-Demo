Feature: Correct font across the user interface

  As a user looking at the app
  I want to see a pretty font

  @dev
  Scenario: A user can see the correct font
    Given I navigate to "/"
    Then I see a pretty font
