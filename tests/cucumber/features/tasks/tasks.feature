Feature: Allow users to manage their Tasks

  As a user of the app
  I want to manage my Tasks
  So that I can effectively manage the tasks that I have to complete

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "CanReadTasks" permission
    

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
    And I have the "CanEditTasks" permission
    When I navigate to "/tasks"
    And I should see the heading "Tasks"

  Scenario: An administrator can add CanReadTasks permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanRead" on "Tasks" to a restricted user
    Then the restricted user should have the "CanReadTasks" permission

  Scenario: An administrator can remove CanReadTasks permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Tasks" from a restricted user
    Then the restricted user should not have the "CanReadTasks" permission

  Scenario: A superadmin user can't visit the tasks list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/tasks"
    Then I should see the heading "Tenants"

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
    When I navigate to a company page
    And I click "#displayedTaskHeading"
    And I add the tag "test-tag" to the "tasks"
    Then the tag field for the "tasks" should contain "test-tag"

  Scenario: A user without the CanEditTasks permission cannot edit tags
    Given I have the "CanReadCompanies" permission
    Given I do not have the "CanEditTasks" permission
    Given a "Company" task has been created
    When I navigate to a company page
    And I click "#displayedTaskHeading"
    Then I should not see the edit tag button for the "tasks"

  Scenario: A user with the Administrator permission can edit tags
    Given I have the "Administrator" permission
    And a "Company" task has been created
    When I navigate to a company page
    And I click "#displayedTaskHeading"
    And I add the tag "test-tag" to the "tasks"
    Then the tag field for the "tasks" should contain "test-tag"
