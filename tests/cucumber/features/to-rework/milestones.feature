# Testing green under new changes but needs reworking
@ignore
Feature: Allow users to manage their project types and milestones
  As a user of the app
  I want to manage and control my project types and milestones
  So that I can control the progress of my projects

  Background:
  Given I have the "Administrator" permission
  And a "Company" has been created

  #Milestones
  Scenario: a user cannot delete a project type that is in use
    Given a project type has been created
    And I am on the pro plan
    And a "Project" has been created
    And toastr are cleared
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#projectAdminExpander"
    And I click "#removeType"
    And I click confirm on the modal
    Then I should see a "error" toastr with the message "This project type is currently in use, and cannot be deleted."

  Scenario: a user cannot delete a project milestone that is in use
    Given a project type has been created
    And I am on the pro plan
    And a "Project" has been created
    And toastr are cleared
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#projectAdminExpander"
    And I click "#removeMilestone"
    And I click confirm on the modal
    Then I should see a "error" toastr with the message "This project milestone is currently in use, and cannot be deleted."

  Scenario: a user can create, edit and delete a project type
    Given I am on the pro plan
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#projectAdminExpander"
    And I click "#addProjectType"
    And I set text field with selector "#project-type-name" to "Cucumber"
    And I click "#submit-new-project-type"
    Then I should see a "success" toastr with the message "Project type created successfully."
    And I should not see a modal
    Given toastr are cleared
    When I click "#editType"
    And I set text field with selector "#project-type-name" to "Velocity"
    And I click "#update-project-type"
    Then I should see a "success" toastr with the message "Project type updated successfully."
    And I should not see a modal
    Given toastr are cleared
    When I click "#removeType"
    And I click confirm on the modal
    Then I should see a "success" toastr with the message "Project type deleted successfully."
    And I should not see a modal

  Scenario: a user can create, edit and delete a project milestone
    Given a limited project type has been created
    And I am on the pro plan
    When I click "#general-dropdown"
    And I click "#Administration"
    And I click "#projectAdminExpander"
    And I click "#addMilestone"
    And I set text field with selector "#project-milestone-name" to "Velocity"
    And I click "#submit-new-milestone"
    Then I should see a "success" toastr with the message "Project milestone created successfully."
    And I should not see a modal
    Given toastr are cleared
    When I click "#editMilestone"
    And I set text field with selector "#project-milestone-name" to "Cucumber"
    And I click "#update-milestone"
    Then I should see a "success" toastr with the message "Project milestone updated successfully."
    And I should not see a modal
    Given toastr are cleared
    When I click "#removeMilestone"
    And I click confirm on the modal
    Then I should see a "success" toastr with the message "Project milestone deleted successfully."
    And I should not see a modal

	Scenario: a user can move a project between milestones
    Given a project type has been created
    And a "Project" has been created
    And I have the "CanReadProjects" permission
    And I have the "CanEditProjects" permission
    And toastr are cleared
    When I navigate to a project page
    And I click "#nextMilestone"
    Then I should see a "success" toastr with the message "Project milestone successfully updated."
		Given toastr are cleared
    And I click "#prevMilestone"
    Then I should see a "success" toastr with the message "Project milestone successfully updated."
