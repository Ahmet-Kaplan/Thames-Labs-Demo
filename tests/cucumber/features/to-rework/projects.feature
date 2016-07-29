# Testing green under new changes but needs reworking
Feature: Allow users to manage their Projects
  As a user of the app
  I want to manage my Projects
  So that I know what my project is working on and with whom

  Background:
    Given I have the "CanReadProjects" permission
    And I have the "CanReadCompanies" permission
    And I have the "CanCreateCompanies" permission
    And a "Company" has been created

  #Reading
  Scenario: A user can see the projects list
    When I navigate to "/projects"
    Then I should see the heading "Projects"

  Scenario: A user without permission cannot see the projects list
    Given I do not have the "CanReadProjects" permission
    When I navigate to "/projects"
    Then I should see the heading "Dashboard"

  Scenario: A user with read permissions can see a project
    Given a "Project" has been created
    When I navigate to a project page
    Then I should see the heading "test project"

  Scenario: An administrator can add CanReadProjects permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanRead" on "Projects" to a restricted user
    Then the user "restricted user" should have the "CanReadProjects" permission

  Scenario: An administrator can remove CanReadProjects permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Projects" from a restricted user
    Then the user "restricted user" should not have the "CanReadProjects" permission

  Scenario: A superadmin user can't visit the projects list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/projects"
    Then I should see the heading "Tenants"

  Scenario: A user can see the projects overview
    When I navigate to "/projects"
    And I click "#ref_projectOverviewWidget"
    Then I should see "#projectOverviewPop"

  #Creating
  Scenario: A user can create a project
    Given I have the "CanCreateProjects" permission
    And I have the "CanReadCompanies" permission
    And a "Company" has been created
    When I navigate to "/projects"
    And I click "#add-project"
    And I set text field "name" to "test project 2"
    And I set textarea "description" to "This is another test project."
    And I selectize "userId" to "test user"
    And I selectize "companyId" to "Test Ltd"
    And I set text field "value" to "999"
    And I submit the "newProject" form
    Then I should see the heading "test project 2"

  Scenario: A user without permission cannot create a projects
    Given I do not have the "CanCreateProjects" permission
    When I navigate to "/projects"
    Then I should not see "#add-project"

  Scenario: An administrator can add CanCreateProjects permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanCreate" on "Projects" to a restricted user
    Then the user "restricted user" should have the "CanCreateProjects" permission

  Scenario: An administrator can remove CanCreateProjects permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Projects" from a restricted user
    Then the user "restricted user" should not have the "CanCreateProjects" permission

  #Editing
  Scenario: A user can edit a project
    Given I have the "CanEditProjects" permission
    And I have the "CanReadCompanies" permission
    And a "Project" has been created
    When I navigate to a project page
    And I click "#edit-project"
    And I set text field "name" to "updated project name"
    And I submit the "updateProject" form
    Then "#project-details" should say "updated project name"

  Scenario: A user without permission cannot edit a project
    Given I do not have the "CanEditProjects" permission
    And I have the "CanReadCompanies" permission
    And a "Project" has been created
    When I navigate to a project page
    Then I should not see "#edit-project"

  Scenario: An administrator can add CanEditProjects permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanEdit" on "Projects" to a restricted user
    Then the user "restricted user" should have the "CanEditProjects" permission

  Scenario: An administrator can remove CanEditProjects permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Projects" from a restricted user
    Then the user "restricted user" should not have the "CanEditProjects" permission

  #Deleting
  Scenario: A user can delete a project
    Given I have the "CanDeleteProjects" permission
    And I have the "CanReadCompanies" permission
    And a "Project" has been created
    When I navigate to a project page
    And I click "#remove-project"
    And I click confirm on the modal
    Then I should see the heading "Projects"

  Scenario: A user without permission cannot delete a project
    Given I do not have the "CanDeleteProjects" permission
    And I have the "CanReadCompanies" permission
    And a "Project" has been created
    When I navigate to a project page
    Then I should not see "#remove-project"

  Scenario: An administrator can add CanDeleteProjects permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanDelete" on "Projects" to a restricted user
    Then the user "restricted user" should have the "CanDeleteProjects" permission

  Scenario: An administrator can remove CanDeleteProjects permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Projects" from a restricted user
    Then the user "restricted user" should not have the "CanDeleteProjects" permission

  #Menu item permissions
  Scenario: A restricted user cannot see the Projects menu item without the correct permission
    Given I do not have the "CanReadProjects" permission
    Then the "Projects" menu item is not shown

  Scenario: A user can see the Projects menu item with the correct permission
    Given I have the "CanReadProjects" permission
    Then the "Projects" menu item is shown

  #Tags
  Scenario: A user with the CanEditProjects permission can edit tags
    Given I have the "CanEditProjects" permission
    And I have the "CanReadCompanies" permission
    And a "Project" has been created
    When I navigate to a project page
    And I click ".editTags"
    And I add the tag "test-tag"
    Then the tag field for the "projects" should contain "test-tag"

  Scenario: A user without the CanEditProjects permission cannot edit tags
    Given I do not have the "CanEditProjects" permission
    And I have the "CanReadCompanies" permission
    And a "Project" has been created
    When I navigate to a project page
    Then I should not see the edit tag button

  #Extended information fields

  Scenario: A user can open the "Add custom field" modal
    Given I have the "CanEditProjects" permission
    And a "Project" has been created
    When I navigate to a project page
    And I click "#add-custom-field"
    Then I should see a modal


  Scenario: A user can add an custom field
    Given I have the "CanEditProjects" permission
    And a "Project" has been created
    When I navigate to a project page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    Then I should see ".custom-field-display-item"


  Scenario: A user can delete a custom field
    Given I have the "CanEditProjects" permission
    And a "Project" has been created
    When I navigate to a project page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    Then I should see a "success" toastr with the message "Custom field added."
    Given toastr are cleared
    When I click "#delete-custom-field"
    And I click confirm on the modal
    Then I should not see a modal
    And I should see a "success" toastr with the message "Custom field removed."
    And I should not see ".custom-field-display-item"


  Scenario: A user can edit an custom field
    Given I have the "CanEditProjects" permission
    And a "Project" has been created
    When I navigate to a project page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    And I click "#edit-custom-fields"
    And I set text field with id "extInfosvelocity2TextValue" to "velocity"
    And I click "#submit-ext-info"
    Then I see a field with the name "velocity" in the custom field list

  #Tasks
  Scenario: A user can add a task to a project
    Given I have the "CanReadTasks" permission
    And I have the "CanCreateTasks" permission
    And a "Project" has been created
    When I navigate to a project page
    And I click "#btnAddTaskToEntity"
    Then I should see a modal
    When I set text field "title" to "task title"
    And I selectize "assigneeId" to "test user"
    And I submit the "newTask" form
    Then I should see "#taskContainer .list-group-item"

  Scenario: A user without the CanReadTasks permission cannot see tasks in a project
    Given I do not have the "CanReadTasks" permission
    And a "Project" task has been created
    When I navigate to a project page
    Then I should not see "#entityTaskList"

  Scenario: A user without the CanCreateTasks permission cannot add a task to a project
    Given I have the "CanReadTasks" permission
    And I do not have the "CanCreateTasks" permission
    And a "Project" has been created
    When I navigate to a project page
    Then I should not see "#btnAddTaskToEntity"

  #Activities
  Scenario: A user can add, edit and delete an activity
    Given a "Project" has been created
    When I navigate to a project page
    And I click "#general-dropdown"
    And I click "#add-activity"
    Then I should see a modal
    When I set text field "activityTimestamp" to "05/05/2015 05:05"
    And I set rich text field "notes" to "test activity"
    And I select "Note" from dropdown field "type"
    And I click "#confirm"
    Then I should see a toastr with the message containing "Project activity created."
    And I should not see a modal
    And I should see the activity in the timeline
    Given toastr are cleared
    When I click "#edit-activity"
    And I select "Email" from dropdown field "type"
    And I click "#update"
    Then I should see a toastr with the message containing "Activity updated."
    And I should not see a modal
    Given toastr are cleared
    When I click "#remove-activity"
    And I click confirm on the modal
    Then I should see "#no-activity"

  #Documents
  Scenario: A user without the CanEditProjects permission cannot add documents to a project
    Given I do not have the "CanEditProjects" permission
    And a "Project" task has been created
    When I navigate to a project page
    Then I should see "#documents-container"
    Then I should not see "#documents-container button"

  Scenario: A user without the CanEditProjects permission cannot add documents to a project
    Given I have the "CanEditProjects" permission
    And a "Project" task has been created
    When I navigate to a project page
    Then I should see "#documents-container"
    Then I should see "#documents-container button"

  #Filtering and Searching
  Scenario: A user can filter projects by company
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a "Project" has been created
    And an additional "Project" has been created
    When I navigate to "/projects"
    And I set the filter to "Company:" then "Test Ltd"
    Then I should see ".removeProp"
    And "#resultsCount" should say "1 record"

  Scenario: Clicking a tag badge applies the filter
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a "Project" has been created
    And an additional "Project" has been created
    When I navigate to "/projects"
    And I click ".badge"
    Then I should see ".removeProp"
    And "#resultsCount" should say "1 record"
