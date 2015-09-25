Feature: Allow users to manage their sales opportunities

  As a user of the app
  I want to manage my sales opportunities
  So that I can keep track of my opportunities

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "CanReadCompanies" permission
    And I have the "CanReadOpportunities" permission

  #Reading
  Scenario: A user can see the opportunities list
    When I navigate to "/opportunities"
    Then I should see the heading "Opportunities"
    And I should see the title "Opportunities"

  Scenario: The opportunities list contains company / contact name
    Given an "Opportunity" has been created
    When I navigate to "/opportunities"
    Then "mchOpportunityList" should contain "Test Ltd"

  Scenario: A user without permission cannot see the opportunities list
    Given I do not have the "CanReadOpportunities" permission
    When I navigate to "/opportunities"
    Then I should see the heading "Dashboard"

  Scenario: A user with read permissions can see a opportunity
    Given an "Opportunity" has been created
    When I navigate to an opportunity page
    Then I should see the heading "test opportunity"

  Scenario: An administrator can add CanReadOpportunities permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanRead" on "Opportunities" to a restricted user
    Then the restricted user should have the "CanReadOpportunities" permission

  Scenario: An administrator can remove CanReadOpportunities permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Opportunities" from a restricted user
    Then the restricted user should not have the "CanReadOpportunities" permission

  Scenario: A superadmin user can't visit the opportunities list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/opportunities"
    Then I should see the heading "Tenants"


  #Adding
  Scenario: A user can add an opportunity
    Given I have the "CanCreateOpportunities" permission
    And a "Company" has been created
    When I navigate to "/opportunities"
    And I click "#create-opportunity"
    And I set text field "name" to "test opportunity 2"
    And I set text field "description" to "test description"
    And I set text field "date" to "05/05/2015 05:05"
    And I set text field "value" to "500"
    And I select "Test Ltd" from dropdown field "companyId"
    Then I submit the "insertOpportunity" form
    Then I should see the heading "test opportunity 2"

  Scenario: A user without permission cannot create a opportunity
    Given I do not have the "CanReadOpportunities" permission
    When I navigate to "/opportunities"
    Then I should not see "#create-opportunity"

  Scenario: An administrator can add CanCreateOpportunities permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanCreate" on "Opportunities" to a restricted user
    Then the restricted user should have the "CanCreateOpportunities" permission

  Scenario: An administrator can remove CanCreateOpportunities permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Opportunities" from a restricted user
    Then the restricted user should not have the "CanCreateOpportunities" permission


  #Editing
  Scenario: A user can edit an opportunity
    Given I have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    And I navigate to an opportunity page
    And I click "#edit-opportunity"
    And I set text field "name" to "updated opportunity 2"
    Then I submit the "editOpportunity" form
    Then I should see the heading "updated opportunity 2"

  Scenario: A user without permission cannot edit an opportunity
    Given I do not have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    Then I should not see "#edit-opportunity"

  Scenario: An administrator can add CanEditOpportunities permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanEdit" on "Opportunities" to a restricted user
    Then the restricted user should have the "CanEditOpportunities" permission

  Scenario: An administrator can remove CanEditOpportunities permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Opportunities" from a restricted user
    Then the restricted user should not have the "CanEditOpportunities" permission


  #Deleting
  Scenario: A user can delete an opportunity
    Given I have the "CanDeleteOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#remove-opportunity"
    And I click confirm on the modal
    Then the opportunity should not exist

  Scenario: A user without permission cannot delete a opportunity
    Given I do not have the "CanDeleteOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    Then I should not see "#remove-opportunity"

  Scenario: An administrator can add CanDeleteOpportunities permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanDelete" on "Opportunities" to a restricted user
    Then the restricted user should have the "CanDeleteOpportunities" permission

  Scenario: An administrator can remove CanDeleteOpportunities permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Opportunities" from a restricted user
    Then the restricted user should not have the "CanDeleteOpportunities" permission


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
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#next-stage"
    Then I should see "#previous-stage"
    When I click "#previous-stage"
    Then I should not see "#previous-stage"

  Scenario: A user can mark an opportunity as lost
    Given I have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#lost-opportunity"
    And I click confirm on the modal
    Then I should see that the opportunity has been lost

  Scenario: A user can mark an opportunity as won
    Given I have the "CanEditOpportunities" permission
    And I have the "CanReadProjects" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#next-stage"
    Then I should see "#previous-stage"
    And I click "#won-opportunity"
    And I click confirm on the modal
    Then I should see that an project has been created from the opportunity
    And "timeline" should contain "Converted from won opportunity"


  #Opportunity Line Items
  Scenario: A user can add a line item to an opportunity
    Given I have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#add-line-item"
    And I set text field "name" to "testItem1"
    And I set text field "description" to "test item description"
    And I set text field "value" to "1"
    And I submit the "insertOpportunityItem" form
    Then I should see a new line item in an opportunity

  Scenario: A user can edit a line item in an opportunity
    Given I have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    And the opportunity has a line item
    When I navigate to an opportunity page
    When I click ".edit-line-item"
    And I set text field with id "name-field" to "testItem2"
    And I submit the "editOpportunityItem" form
    Then I should see an updated line item in an opportunity

  Scenario: A user can remove a line item from an opportunity
    Given I have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    And the opportunity has a line item
    When I navigate to an opportunity page
    When I click ".delete-line-item"
    And I click confirm on the modal
    Then I should see "#no-line-items"

  #Tags
  Scenario: A user with the CanEditOpportunities permission can edit tags
    Given I have the "CanEditOpportunities" permission
    And a "Opportunity" has been created
    When I navigate to an opportunity page
    And I set text field with selector ".tag-input input" to "test tag"
    Then the field with selector ".tag-input input" should contain "test tag"

  Scenario: A user without the CanEditOpportunities permission cannot edit tags
    Given I do not have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I set text field with selector ".tag-input input" to "test tag"
    Then the field with selector ".tag-input input" should not contain "test tag"

  Scenario: A user with the Administrator permission can edit tags
    Given I have the "Administrator" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I set text field with selector ".tag-input input" to "test tag"
    Then the field with selector ".tag-input input" should contain "test tag"
