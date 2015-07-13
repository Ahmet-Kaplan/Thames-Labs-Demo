Feature: Company tags

  As a user of the app
  I want to be able to tag companies
  So that I can find companies I'm interested in easily

  Background:
    Given I am a logged in user
    And a company has been created
    And the company has a tag

  @ignore
  Scenario: A user can see tags which have been added to a company
    When I navigate to "/companies"
    Then I should see a tag on the company

  @ignore
  Scenario: A user can add a tag to a company
    When I navigate to "/companies"
    And I click on the top company
    And I add a tag to the company
    Then the company should be tagged
