Feature: Allow users to manage their sales opportunities

  As a user of the app
  I want to manage my sales opportunities
  So that I can keep track of my opportunities

  Background:
    Given I am a logged in user
    And opportunity stages have been created
    And an opportunity has been created

  Scenario: A user can see the opportunities list
    When I navigate to "/opportunities"
    Then I should see the heading "Opportunities"
    And I should see the title "Opportunities"

  Scenario: A user can add an opportunity
    When I navigate to "/opportunities"
    And I click "#create-opportunity"
    And I enter opportunity details
    Then a new opportunity should exist

  Scenario: A user can edit an opportunity
    When I navigate to an opportunity page
    And I click "#editOpportunity"
    And I enter updated opportunity details
    Then I should see the updated opportunity

  Scenario: A user can delete an opportunity
    When I navigate to an opportunity page
    And I delete an opportunity
    Then the opportunity should not exist

  Scenario: A user can change opportunity stage
    When I navigate to an opportunity page
    And I click "#btnNextStage"
    Then I should be on the next opportunity stage
    When I click "#btnPrevStage"
    Then I should be on the first opportunity stage
