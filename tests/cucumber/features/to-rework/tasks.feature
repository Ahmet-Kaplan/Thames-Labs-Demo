# Testing green under new changes but needs reworking

Feature: Allow users to manage their Tasks

  As a user of the app
  I want to manage my Tasks
  So that I can effectively manage the tasks that I have to complete

  Background:
    Given I have the "CanReadTasks" permission

  #Reading
  Scenario: A user can see the tasks list
    When I navigate to "/tasks"
    Then I should see the heading "Tasks"

  Scenario: A user without permission cannot see the tasks list
    Given I do not have the "CanReadTasks" permission
    When I navigate to "/tasks"
    Then I should see the heading "Dashboard"

  Scenario: A user with read permissions can see a task
    Given a "Company" task has been created
    And I have the "CanReadCompanies" permission
    When I navigate to a task page
    And I should see the heading "test task"

  Scenario: An administrator can add CanReadTasks permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanRead" on "Tasks" to a restricted user
    Then the user "restricted user" should have the "CanReadTasks" permission

  Scenario: An administrator can remove CanReadTasks permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Tasks" from a restricted user
    Then the user "restricted user" should not have the "CanReadTasks" permission

  Scenario: A superadmin user can't visit the tasks list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/tasks"
    Then I should see the heading "Tenants"

  Scenario: A user can complete a task and see it in the "Completed" section
    Given a "Company" task has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadTasks" permission
    And I have the "CanEditTasks" permission
    When I navigate to "/tasks"
    Then I should see ".task-list-item"
    When I click ".task-tick"
    And I set the filter to "Completed:" then "Yes"
    Then I should see ".task-list-item"

  #Creating
  Scenario: A user can create a task
    Given I have the "CanCreateTasks" permission
    And I have the "CanReadCompanies" permission
    And a "Company" task has been created
    When I navigate to "/tasks"
    And I click "#addTaskDropdown"
    And I click "#company"
    And I set text field "title" to "test task 2"
    And I set textarea "description" to "This is another test task."
    And I selectize "assigneeId" to "test user"
    And I selectize "entityId" to "Test Ltd"
    And I submit the "newTask" form
    Then I should see the heading "test task 2"

  Scenario: A user without permission cannot create a tasks
    Given I do not have the "CanCreateTasks" permission
    When I navigate to "/tasks"
    Then I should not see "#addTaskDropdown"

  Scenario: An administrator can add CanCreateTasks permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanCreate" on "Tasks" to a restricted user
    Then the user "restricted user" should have the "CanCreateTasks" permission

  Scenario: An administrator can remove CanCreateTasks permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Tasks" from a restricted user
    Then the user "restricted user" should not have the "CanCreateTasks" permission

  #Editing
  Scenario: A user can edit a task
    Given I have the "CanEditTasks" permission
    And I have the "CanReadCompanies" permission
    And a "Company" task has been created
    When I navigate to a task page
    And I click "#edit-task"
    Then I should see a modal
    When I set text field "title" to "updated task title"
    And I submit the "editTask" form
    Then I should see the heading "updated task title"

  Scenario: A user without permission cannot edit a task
    Given I do not have the "CanEditTasks" permission
    And I have the "CanReadCompanies" permission
    And a "Company" task has been created
    When I navigate to a task page
    Then I should not see "#edit-task"

  Scenario: An administrator can add CanEditTasks permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanEdit" on "Tasks" to a restricted user
    Then the user "restricted user" should have the "CanEditTasks" permission

  Scenario: An administrator can remove CanEditTasks permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Tasks" from a restricted user
    Then the user "restricted user" should not have the "CanEditTasks" permission

  #Deleting
  Scenario: A user can delete a task
    Given I have the "CanDeleteTasks" permission
    And I have the "CanReadCompanies" permission
    And a "Company" task has been created
    When I navigate to a task page
    And I click "#remove-task"
    And I click confirm on the modal
    Then I should see the heading "Tasks"

  Scenario: A user without permission cannot delete a task
    Given I do not have the "CanDeleteTasks" permission
    And I have the "CanReadCompanies" permission
    And a "Company" task has been created
    When I navigate to a task page
    Then I should not see "#remove-task"

  Scenario: An administrator can add CanDeleteTasks permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanDelete" on "Tasks" to a restricted user
    Then the user "restricted user" should have the "CanDeleteTasks" permission

  Scenario: An administrator can remove CanDeleteTasks permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Tasks" from a restricted user
    Then the user "restricted user" should not have the "CanDeleteTasks" permission

  #Menu item permissions
  Scenario: A restricted user cannot see the Tasks menu item without the correct permission
    Given I do not have the "CanReadTasks" permission
    Then the "Tasks" menu item is not shown

  Scenario: A user can see the Tasks menu item with the correct permission
    Given I have the "CanReadTasks" permission
    Then the "Tasks" menu item is shown

  #Tags
  Scenario: A user with the CanEditTasks permission can edit tags
    Given I have the "CanEditTasks" permission
    And I have the "CanReadCompanies" permission
    And a "Company" task has been created
    When I navigate to a task page
    And I click ".editTags"
    And I add the tag "test-tag"
    Then the tag field for the "tasks" should contain "test-tag"

  Scenario: A user without the CanEditTasks permission cannot edit tags
    Given I have the "CanReadCompanies" permission
    Given I do not have the "CanEditTasks" permission
    Given a "Company" task has been created
    When I navigate to a task page
    Then I should not see the edit tag button

  #Filtering and Searching

  Scenario: A user can filter tasks by entity type
    Given I have the "CanReadCompanies" permission
    And I have the "CanReadContacts" permission
    And a "Company" task has been created
    And a "Contact" task has been created
    When I navigate to "/tasks"
    And I set the filter to "Company:" then "Test Ltd"
    Then I should see ".removeProp"
    And I should not see "span.fa-user"
    And "#resultsCount" should say "1 record"

  Scenario: A user can filter tasks by due date
    Given I have the "CanReadCompanies" permission
    And I have the "CanReadContacts" permission
    And a "Company" task has been created
    And a "Contact" task has been created
    When I navigate to "/tasks"
    And I set the filter to "Due Date:" then "today"
    Then I should see ".removeProp"
    And I should not see "span.fa-user"
    And "#resultsCount" should say "1 record"

  Scenario: Clicking a tag badge applies the filter
    Given I have the "CanReadCompanies" permission
    And I have the "CanReadContacts" permission
    And a "Company" task has been created
    And a "Contact" task has been created
    When I navigate to "/tasks"
    And I click ".badge"
    Then I should see ".removeProp"
    And I should not see "span.fa-user"
    And "#resultsCount" should say "1 record"

  Scenario: A user can remove a filter from the list
    Given I have the "CanReadCompanies" permission
    And I have the "CanReadContacts" permission
    And a "Company" task has been created
    And a "Contact" task has been created
    When I navigate to "/tasks"
    And I set the filter to "Company:" then "Test Ltd"
    Then I should see ".removeProp"
    When I click "#resetSearch"
    And the page is loaded
    Then I should see "span.fa-user"
    And "#resultsCount" should say "2 records"
