Feature: Allow users to manage their Projects

  As a user of the app
  I want to manage my Projects
  So that I know what my project is working on and with whom

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "CanReadProjects" permission


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
    And a restricted user exists
    When I add permission "CanRead" on "Projects" to a restricted user
    Then the restricted user should have the "CanReadProjects" permission

  Scenario: An administrator can remove CanReadProjects permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Projects" from a restricted user
    Then the restricted user should not have the "CanReadProjects" permission

  Scenario: A superadmin user can't visit the projects list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/projects"
    Then I should see the heading "Tenants"


  #Creating
  Scenario: A user can create a project
    Given I have the "CanCreateProjects" permission
    When I navigate to "/projects"
    And I click "#add-project"
    And I set text field "description" to "test project 2"
    And I selectize "select#userId + .selectize-control" to "test user"
    And I set text field "value" to "999"
    And I submit the "newProject" form
    Then I should see the heading "test project 2"

  Scenario: A user without permission cannot create a projects
    Given I do not have the "CanCreateProjects" permission
    When I navigate to "/projects"
    Then I should not see "#add-project"

  Scenario: An administrator can add CanCreateProjects permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanCreate" on "Projects" to a restricted user
    Then the restricted user should have the "CanCreateProjects" permission

  Scenario: An administrator can remove CanCreateProjects permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Projects" from a restricted user
    Then the restricted user should not have the "CanCreateProjects" permission


  #Editing
  Scenario: A user can edit a project
    Given I have the "CanEditProjects" permission
    And a "Project" has been created
    When I navigate to a project page
    And I click "#edit-project"
    And I set text field "description" to "updated project name"
    And I submit the "updateProject" form
    Then "project-details" should say "updated project name"

  Scenario: A user without permission cannot edit a project
    Given I do not have the "CanEditProjects" permission
    And a "Project" has been created
    When I navigate to a project page
    Then I should not see "#edit-project"

  Scenario: An administrator can add CanEditProjects permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanEdit" on "Projects" to a restricted user
    Then the restricted user should have the "CanEditProjects" permission

  Scenario: An administrator can remove CanEditProjects permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Projects" from a restricted user
    Then the restricted user should not have the "CanEditProjects" permission


  #Deleting
  Scenario: A user can delete a project
    Given I have the "CanDeleteProjects" permission
    And a "Project" has been created
    When I navigate to a project page
    And I click "#remove-project"
    And I click confirm on the modal
    Then I should see the heading "Projects"

  Scenario: A user without permission cannot delete a project
    Given I do not have the "CanDeleteProjects" permission
    And a "Project" has been created
    When I navigate to a project page
    Then I should not see "#remove-project"

  Scenario: An administrator can add CanDeleteProjects permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanDelete" on "Projects" to a restricted user
    Then the restricted user should have the "CanDeleteProjects" permission

  Scenario: An administrator can remove CanDeleteProjects permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Projects" from a restricted user
    Then the restricted user should not have the "CanDeleteProjects" permission


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
    And a "Project" has been created
    When I navigate to a project page
    And I set text field with selector ".tag-input input" to "test tag"
    Then the field with selector ".tag-input input" should contain "test tag"

  Scenario: A user without the CanEditProjects permission cannot edit tags
    Given I do not have the "CanEditProjects" permission
    And a "Project" has been created
    When I navigate to a project page
    And I set text field with selector ".tag-input input" to "test tag"
    Then the field with selector ".tag-input input" should not contain "test tag"

  Scenario: A user with the Administrator permission can edit tags
    Given I have the "Administrator" permission
    And a "Project" has been created
    When I navigate to a project page
    And I set text field with selector ".tag-input input" to "test tag"
    Then the field with selector ".tag-input input" should contain "test tag"
