Feature: Company routes

  Background:
    Given I am a logged in user

  @dev
  Scenario: A user can see a list of all companies
    When I navigate to "/companies"
    Then I should see the Companies list
