Feature: Allow users to manage their sales opportunities

  As a user of the app
  I want to manage my sales opportunities
  So that I can keep track of my opportunities

  Background:
    Given I am a logged in user
    And opportunity stages have been created
    And a company has been created
    And an opportunity has been created
@dev
  Scenario: A user can see the opportunities list
    When I navigate to "/opportunities"
    Then I should see the heading "Opportunities"
    And I should see the title "Opportunities"
@dev
  Scenario: A user can add an opportunity
    When I navigate to "/opportunities"
    And I click "#create-opportunity"
    And I enter opportunity details
    Then a new opportunity should exist
@dev
  Scenario: A user can edit an opportunity
    When I navigate to an opportunity page
    And I click "#editOpportunity"
    And I enter updated opportunity details
    Then I should see the updated opportunity
@dev
  Scenario: A user can delete an opportunity
    When I navigate to an opportunity page
    And I delete an opportunity
    Then the opportunity should not exist
@dev
  Scenario: A user can change opportunity stage
    When I navigate to an opportunity page
    And I click "#btnNextStage"
    Then I should be on the next opportunity stage
    When I click "#btnPrevStage"
    Then I should be on the first opportunity stage
@dev
  Scenario: A user can mark an opportunity as lost
    When I navigate to an opportunity page
    And I lose an opportunity
    Then I should see that the opportunity has been lost
@dev
  Scenario: A user can mark an opportunity as won
    When I navigate to an opportunity page
    And I click "#btnNextStage"
    Then I should be on the next opportunity stage
    And I win an opportunity
    Then I should see that the opportunity has been won
@dev
  Scenario: A user can add a line item to an opportunity
    When I navigate to an opportunity page
    And I click "#btnAddLine"
    And I enter line item details for an opportunity
    Then I should see a new line item in an opportunity
    @dev
  Scenario: A user can edit a line item in an opportunity
    When I navigate to an opportunity page
    And I create a new line item for an opportunity
    And I enter updated line item details for an opportunity
    Then I should see an updated line item in an opportunity
@dev
  Scenario: A user can remove a line item from an opportunity
    When I navigate to an opportunity page
    And I create a new line item for an opportunity
    And I delete a line item from an opportunity
    Then I should not see a line item in an opportunity
