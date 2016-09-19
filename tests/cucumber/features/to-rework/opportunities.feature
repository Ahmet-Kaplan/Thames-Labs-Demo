# Testing green under new changes but needs reworking
Feature: Allow users to manage their sales opportunities

  As a user of the app
  I want to manage my sales opportunities
  So that I can keep track of my opportunities

  Background:
    Given I have the "CanReadCompanies" permission
    And I have the "CanReadOpportunities" permission

  #Reading
  Scenario: A user can see the opportunities list
    When I navigate to "/opportunities"
    Then I should see the heading "Opportunities"
    And I should see the title "Opportunities"

  Scenario: The opportunities list contains company / contact name
    Given an "Opportunity" has been created
    When I navigate to "/opportunities"
    Then I should not see "#moar"
    And ".list-group-item-text" should contain "Test Ltd"

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
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanRead" on "Opportunities" to a restricted user
    Then the user "restricted user" should have the "CanReadOpportunities" permission

  Scenario: An administrator can remove CanReadOpportunities permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Opportunities" from a restricted user
    Then the user "restricted user" should not have the "CanReadOpportunities" permission

  Scenario: A superadmin user can't visit the opportunities list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/opportunities"
    Then I should see the heading "Tenants"

  Scenario: A user can see the opportunity overview
    When I navigate to "/opportunities"
    And I click "#oppsOverviewWidget"
    Then I should see "#oppOverviewPop"

  #Adding
  Scenario: A user can add an opportunity
    Given I have the "CanCreateOpportunities" permission
    And a "Company" has been created
    When I navigate to "/opportunities"
    And I click "#create-opportunity"
    And I set text field "name" to "test opportunity 2"
    And I set textarea "description" to "test description"
    And I set text field "date" to "05/05/2015 05:05"
    And I set text field "value" to "500"
    And I selectize "companyId" to "Test Ltd"
    Then I submit the "insertOpportunity" form
    Then I should see the heading "test opportunity 2"

  Scenario: A user without permission cannot create a opportunity
    Given I do not have the "CanReadOpportunities" permission
    When I navigate to "/opportunities"
    Then I should not see "#create-opportunity"

  Scenario: An administrator can add CanCreateOpportunities permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanCreate" on "Opportunities" to a restricted user
    Then the user "restricted user" should have the "CanCreateOpportunities" permission

  Scenario: An administrator can remove CanCreateOpportunities permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Opportunities" from a restricted user
    Then the user "restricted user" should not have the "CanCreateOpportunities" permission

  #Editing
  Scenario: A user can edit an opportunity
    Given I have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    Then I should see the heading "test opportunity"
    When I click "#edit-opportunity"
    Then I should see a modal
    When I set text field "name" to "updated opportunity 2"
    And I submit the "updateOpportunity" form
    Then I should see the heading "updated opportunity 2"

  Scenario: A user without permission cannot edit an opportunity
    Given I do not have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    Then I should not see "#edit-opportunity"

  Scenario: An administrator can add CanEditOpportunities permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanEdit" on "Opportunities" to a restricted user
    Then the user "restricted user" should have the "CanEditOpportunities" permission

  Scenario: An administrator can remove CanEditOpportunities permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Opportunities" from a restricted user
    Then the user "restricted user" should not have the "CanEditOpportunities" permission

  #Deleting
  Scenario: A user can delete an opportunity
    Given I have the "CanDeleteOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#remove-opportunity"
    And I click confirm on the modal
    Then I should see the heading "Opportunities"

  Scenario: A user without permission cannot delete a opportunity
    Given I do not have the "CanDeleteOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    Then I should not see "#remove-opportunity"

  Scenario: An administrator can add CanDeleteOpportunities permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanDelete" on "Opportunities" to a restricted user
    Then the user "restricted user" should have the "CanDeleteOpportunities" permission

  Scenario: An administrator can remove CanDeleteOpportunities permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Opportunities" from a restricted user
    Then the user "restricted user" should not have the "CanDeleteOpportunities" permission

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
    And "#timeline" should contain "Test User moved this opportunity from stage"
    When I click "#previous-stage"
    Then "#previous-stage" should be disabled
    And "#timeline" should contain "Test User moved this opportunity from stage"

  Scenario: A user can mark an opportunity as lost and reopen it
    Given I have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#lost-opportunity"
    And I click confirm on the modal
    Then I should see that the opportunity has been lost
    And "#timeline" should contain "Test User marked this opportunity as lost"
    And I should see "#reopen-opportunity"
    When I click "#reopen-opportunity"
    And I click confirm on the modal
    Then I should see "#next-stage"
    And "#timeline" should contain "Test User reopened this opportunity"

  Scenario: A user without edit permissions cannot reopen an opportunity
    Given I have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#lost-opportunity"
    And I click confirm on the modal
    Then I should see that the opportunity has been lost
    Given I do not have the "CanEditOpportunities" permission
    Then I should not see "#reopen-opportunity"

  Scenario: A user can mark an opportunity as won but not reopen it
    Given I have the "CanEditOpportunities" permission
    And a project type has been created
    And I have the "CanReadProjects" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#next-stage"
    Then I should see "#previous-stage"
    And I click "#won-opportunity"
    And I click confirm on the modal
    Then I should see that an project has been created from the opportunity
    And "#timeline" should contain "Converted from won opportunity"
    When I navigate backwards in the browser history
    And "#timeline" should contain "Test User marked this opportunity as won"
    And I should not see "#reopen-opportunity"

  #Opportunity Line Items
  Scenario: A user can add a line item to an opportunity
    Given I have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#add-line-item"
    Then I should see a modal
    And I set text field "name" to "testItem1"
    And I set textarea "description" to "test item description"
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
    And I submit the "updateOpportunityItem" form
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
    And I click ".editTags"
    And I add the tag "test-tag"
    Then the tag field for the "opportunities" should contain "test-tag"

  Scenario: A user without the CanEditOpportunities permission cannot edit tags
    Given I do not have the "CanEditOpportunities" permission
    And an "Opportunity" has been created
    When I navigate to an opportunity page
    Then I should not see the edit tag button

  #Tasks
  Scenario: A user can add a task to a opportunity
    Given I have the "CanReadTasks" permission
    And I have the "CanCreateTasks" permission
    And a "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#btnAddTaskToEntity"
    Then I should see a modal
    When I set text field "title" to "task title"
    And I selectize "assigneeId" to "Test User"
    And I submit the "insertTask" form
    Then I should see "#taskContainer .list-group-item"

  Scenario: A user without the CanReadTasks permission cannot see tasks in a opportunity
    Given I do not have the "CanReadTasks" permission
    And a "Opportunity" task has been created
    When I navigate to an opportunity page
    Then I should not see "#entityTaskList"

  Scenario: A user without the CanCreateTasks permission cannot add a task to a opportunity
    Given I have the "CanReadTasks" permission
    And I do not have the "CanCreateTasks" permission
    And a "Opportunity" has been created
    When I navigate to an opportunity page
    Then I should not see "#btnAddTaskToEntity"

#Activities
  Scenario: A user can add an activity
    Given a "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#general-dropdown"
    And I click "#add-activity"
    And I set text field "activityTimestamp" to "05/05/2015 05:05"
    And I set rich text field "notes" to "test activity"
    And I select "Note" from dropdown field "type"
    And I click "#confirm"
    Then I should see the activity in the timeline

  Scenario: A user can edit an activity
    Given a "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#general-dropdown"
    And I click "#add-activity"
    And I set text field "activityTimestamp" to "05/05/2015 05:05"
    And I set rich text field "notes" to "test activity"
    And I select "Note" from dropdown field "type"
    And I click "#confirm"
    Then I should not see a modal
    And I click "#edit-activity"
    And I select "Email" from dropdown field "type"
    And I click "#update"
    Then I should see a toastr with the message containing "Activity updated."

  Scenario: A user can delete an activity
    Given an "Opportunity" has been created
    When I navigate to an opportunity page
    And I click "#general-dropdown"
    And I click "#add-activity"
    And I set text field "activityTimestamp" to "05/05/2015 05:05"
    And I set rich text field "notes" to "test activity"
    And I select "Note" from dropdown field "type"
    And I click "#confirm"
    Then I should not see a modal
    And I click "#remove-activity"
    And I click confirm on the modal
    Then I should see "#no-activity"

  #Filtering and Searching
  Scenario: A user can filter opportunities by company
    Given I have the "Administrator" permission
    And an "Opportunity" has been created
    And an additional "Opportunity" has been created
    When I navigate to "/opportunities"
    And I set the filter to "Company:" then "Test Ltd"
    Then I should see ".filter-tag"
    And "#results-count" should contain "1 opportunity"

  Scenario: A user can filter opportunities by value
    Given I have the "Administrator" permission
    And an "Opportunity" has been created
    And an additional "Opportunity" has been created
    When I navigate to "/opportunities"
    And I set the filter to "Value <" then "50"
    Then I should see ".filter-tag"
    And "#results-count" should contain "1 opportunity"

  Scenario: Clicking a tag badge applies the filter
    Given I have the "Administrator" permission
    And an "Opportunity" has been created
    And an additional "Opportunity" has been created
    When I navigate to "/opportunities"
    And I click ".badge"
    Then I should see ".filter-tag"
    And "#results-count" should contain "1 opportunity"
