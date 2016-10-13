# Testing green under new changes but needs reworking
Feature: Allow users to manage their Jobs
  As a user of the app
  I want to manage my Jobs
  So that I know what my job is working on and with whom

  Background:
    Given I have the "CanReadJobs" permission
    And I have the "CanReadCompanies" permission
    And I have the "CanCreateCompanies" permission
    And a "Company" has been created

  #Reading
  Scenario: A user can see the jobs list
    When I visit Jobs
    Then I should see the heading "Jobs"

  Scenario: A user without permission cannot see the jobs list
    Given I do not have the "CanReadJobs" permission
    When I navigate to "/jobs"
    Then I should see the heading "Dashboard"

  Scenario: A user with read permissions can see a job
    Given a "Job" has been created
    When I go to a jobs detail page
    Then I should see the heading "test job"

  Scenario: An administrator can add and remove CanReadJobs permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanRead" on "Jobs" to a restricted user
    Then the user "restricted user" should have the "CanReadJobs" permission
    When I remove permissions on "Jobs" from a restricted user
    Then the user "restricted user" should not have the "CanReadJobs" permission

  Scenario: A superadmin user can't visit the jobs list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/jobs"
    Then I should see the heading "Tenants"

  Scenario: A user can see the jobs overview
    When I visit jobs
    And I click "#ref_jobOverviewWidget"
    Then I should see "#jobOverviewPop"

  #Creating
  Scenario: A user can create, edit and delete a job
    Given I have the "CanCreateJobs" permission
    Given I have the "CanEditJobs" permission
    Given I have the "CanDeleteJobs" permission
    And I have the "CanReadCompanies" permission
    And a "Company" has been created
    When I visit jobs
    And I click "#add-job"
    And I set text field "name" to "test job 2"
    And I set textarea "description" to "This is another test job."
    And I set text field "value" to "999"
    And I selectize "companyId" to "Test Ltd"
    And I selectize "userId" to "Test User"
    And I submit the "insertJob" form
    Then I should see the heading "test job 2"
    And I click "#edit-job"
    And I set text field "name" to "updated job name"
    And I submit the "updateJob" form
    Then "#job-details" should contain "updated job name"
    And I click "#remove-job"
    And I click confirm on the modal
    Then I should see the heading "Jobs"

  Scenario: A user without permission cannot create a job
    Given I do not have the "CanCreateJobs" permission
    When I visit Jobs
    Then I should not see "#add-job"

  Scenario: An administrator can add and remove CanCreateJobs permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanCreate" on "Jobs" to a restricted user
    Then the user "restricted user" should have the "CanCreateJobs" permission
    When I remove permissions on "Jobs" from a restricted user
    Then the user "restricted user" should not have the "CanCreateJobs" permission

  #Editing
  Scenario: A user without permission cannot edit a job
    Given I do not have the "CanEditJobs" permission
    And I have the "CanReadCompanies" permission
    And a "Job" has been created
    When I go to a jobs detail page
    Then I should not see "#edit-job"

  Scenario: An administrator can add and remove CanEditJobs permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanEdit" on "Jobs" to a restricted user
    Then the user "restricted user" should have the "CanEditJobs" permission
    When I remove permissions on "Jobs" from a restricted user
    Then the user "restricted user" should not have the "CanEditJobs" permission

  #Deleting
  Scenario: A user without permission cannot delete a job
    Given I do not have the "CanDeleteJobs" permission
    And I have the "CanReadCompanies" permission
    And a "Job" has been created
    When I go to a jobs detail page
    Then I should not see "#remove-job"

  Scenario: An administrator can add and remove CanDeleteJobs permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanDelete" on "Jobs" to a restricted user
    Then the user "restricted user" should have the "CanDeleteJobs" permission
    When I remove permissions on "Jobs" from a restricted user
    Then the user "restricted user" should not have the "CanDeleteJobs" permission

  #Menu item permissions
  Scenario: A user with permission can see the Jobs menu item, a user without cannot
    Given I have the "CanReadJobs" permission
    Then the "Jobs" menu item is shown
    Given I do not have the "CanReadJobs" permission
    Then the "Jobs" menu item is not shown

  #Tags
  Scenario: A user with the CanEditJobs permission can edit tags
    Given I have the "CanEditJobs" permission
    And I have the "CanReadCompanies" permission
    And a "Job" has been created
    When I go to a jobs detail page
    And I click ".editTags"
    And I add the tag "test-tag"
    Then the tag field for the "jobs" should contain "test-tag"
    Given I do not have the "CanEditJobs" permission
    Then I should not see the edit tag button

  #Custom fields
  Scenario: A user can see the custom fields panel
    Given I have the "CanEditJobs" permission
    And a "Job" has been created
    When I go to a jobs detail page
    Then I should see "#custom-fields-panel"

  #Tasks
  Scenario: A user can add a task to a job
    Given I have the "CanReadTasks" permission
    And I have the "CanCreateTasks" permission
    And a "Job" has been created
    When I go to a jobs detail page
    And I click "#btnAddTaskToEntity"
    Then I should see a modal
    When I set text field "title" to "task title"
    And I selectize "assigneeId" to "Test User"
    And I submit the "insertTask" form
    Then I should not see a modal
    Then I should see "#taskContainer .list-group-item"

  Scenario: A user without the CanReadTasks permission cannot see tasks in a job
    Given I do not have the "CanReadTasks" permission
    And a "Job" task has been created
    When I go to a jobs detail page
    Then I should not see "#entityTaskList"

  Scenario: A user without the CanCreateTasks permission cannot add a task to a job
    Given I have the "CanReadTasks" permission
    And I do not have the "CanCreateTasks" permission
    And a "Job" has been created
    When I go to a jobs detail page
    Then I should not see "#btnAddTaskToEntity"

  #Activities
  Scenario: A user can add, edit and delete an activity
    Given a "Job" has been created
    And I have the "CanEditJobs" permission
    When I go to a jobs detail page
    And I click "#add-activity"
    Then I should see a modal
    And I set rich text field "notes" to "test activity"
    And I select "Note" from dropdown field "type"
    And I click "#confirm"
    Then I should see a toastr with the message containing "Job activity created."
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
  Scenario: A user without the CanEditJobs permission cannot add documents to a job
    Given I do not have the "CanEditJobs" permission
    And a "Job" task has been created
    When I go to a jobs detail page
    Then I should see "#documents-container"

  Scenario: A user with the CanEditJobs permission can add documents to a job, a user without permission cannot
    Given I have the "CanEditJobs" permission
    And a "Job" task has been created
    When I go to a jobs detail page
    Then I should see "#documents-container"
    Then I should see "#documents-container button"
    Given I do not have the "CanEditJobs" permission
    Then I should not see "#documents-container button"

  #Filtering and Searching

  Scenario: A user can filter jobs by company
    Given I have the "Administrator" permission
    And a "Job" has been created
    And an additional "Job" has been created
    When I visit jobs
    And I set the filter to "Company:" then "Test Ltd"
    Then I should see ".filter-tag"
    And "#results-count" should contain "1 job"

  Scenario: Clicking a tag badge applies the filter
    Given I have the "Administrator" permission
    And a "Job" has been created
    And an additional "Job" has been created
    When I visit jobs
    And I click ".badge"
    Then I should see ".filter-tag"
    And "#results-count" should contain "1 job"
