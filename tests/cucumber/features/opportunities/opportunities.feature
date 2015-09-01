Feature: Allow users to manage their sales opportunities

  As a user of the app
  I want to manage my sales opportunities
  So that I can keep track of my opportunities

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "CanReadCompanies" permission
    And I have the "CanReadOpportunities" permission
    And opportunity stages have been created
    And an opportunity has been created

  #Navigation
  Scenario: A user can see the opportunities list
    When I navigate to "/opportunities"
    Then I should see the heading "Opportunities"
    And I should see the title "Opportunities"

  Scenario: A user without permission cannot see the opportunities list
    Given I do not have the "CanReadOpportunities" permission
    When I navigate to "/opportunities"
    Then I should not see the heading "Opportunities"

  Scenario: A superadmin user can't visit the opportunities list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/opportunities"
    Then I should see the heading "Tenants"

  #Adding
  Scenario: A user can add an opportunity
    And I have the "CanCreateOpportunities" permission
    When I navigate to "/opportunities"
    And I click "#create-opportunity"
    And I enter opportunity details
    Then I should see the heading "test opportunity 2"

  Scenario: A user without permission cannot create a opportunties
    Given I do not have the "CanReadOpportunities" permission
    When I navigate to "/opportunities"
    Then I should not see "#create-opportunity"

  #Editing
  Scenario: A user can edit an opportunity
    Given I have the "CanEditOpportunities" permission
    And I navigate to an opportunity page
    And I click "#editOpportunity"
    And I enter updated opportunity details
    Then I should see the heading "updated opportunity"

  Scenario: A user without permission cannot edit an opportunity
    Given I do not have the "CanEditOpportunities" permission
    When I navigate to an opportunity page
    Then I should not see "#editOpportunity"

  #Deleting
  Scenario: A user can delete an opportunity
    Given I have the "CanDeleteOpportunities" permission
    When I navigate to an opportunity page
    And I delete an opportunity
    Then the opportunity should not exist

  Scenario: A user without permission cannot delete a opportunity
    Given I do not have the "CanDeleteOpportunities" permission
    When I navigate to an opportunity page
    Then I should not see "#removeOpportunity"

  #Menu item permissions
  Scenario: A restricted user cannot see the Opportunities menu item without the correct permission
    Given I do not have the "CanReadOpportunities" permission
    Then the "Opportunities" menu item is not shown

  Scenario: A user can see the Opportunities menu item with the correct permission
    Given I have the "CanReadOpportunities" permission
    Then the "Opportunities" menu item is shown

  #Opportunity Stages
  Scenario: A user can change opportunity stage
    Given I have the "CanEditOpportunities" permission
    When I navigate to an opportunity page
    And I click "#btnNextStage"
    Then I should be on the next opportunity stage
    When I click "#btnPrevStage"
    Then I should be on the first opportunity stage

  Scenario: A user can mark an opportunity as lost
    Given I have the "CanEditOpportunities" permission
    When I navigate to an opportunity page
    And I lose an opportunity
    Then I should see that the opportunity has been lost

  Scenario: A user can mark an opportunity as won
    Given I have the "CanEditOpportunities" permission
    Given I have the "CanReadProjects" permission
    When I navigate to an opportunity page
    And I click "#btnNextStage"
    Then I should be on the next opportunity stage
    And I win an opportunity
    Then I should see that an project has been created from the opportunity

  #Opportunity Line Items
  Scenario: A user can add a line item to an opportunity
    Given I have the "CanEditOpportunities" permission
    When I navigate to an opportunity page
    And I enter line item details for an opportunity

  Scenario: A user can edit a line item in an opportunity
    Given I have the "CanEditOpportunities" permission
    When I navigate to an opportunity page
    And I enter line item details for an opportunity
    Then I should not see a modal
    When I enter updated line item details for an opportunity
    Then I should see an updated line item in an opportunity

  Scenario: A user can remove a line item from an opportunity
    Given I have the "CanEditOpportunities" permission
    When I navigate to an opportunity page
    And I enter line item details for an opportunity
    Then I should not see a modal
    When I delete a line item from an opportunity
    Then I should not see a line item in an opportunity
