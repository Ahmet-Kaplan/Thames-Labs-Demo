Feature: Company tags

  As a user of the app
  I want to be able to tag companies
  So that I can find companies I'm interested in easily

  Background:
    Given I am a logged in user
    And a company has been created

  @dev
  Scenario: A user can see tags which have been added to a company
    When I navigate to "/companies"
    Then I should see a tag on the company
