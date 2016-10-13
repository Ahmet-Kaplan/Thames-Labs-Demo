# Testing green under new changes but needs reworking
Feature: Allow users to manage their job types and milestones
  As a user of the app
  I want to manage and control my job types and milestones
  So that I can control the progress of my jobs

  Background:
  Given I have the "Administrator" permission
  And a "Company" has been created

  #Milestones
  Scenario: a user cannot delete a job type or milestone that is in use
    Given a job type has been created
    And a "Job" has been created
    When I go to the config settings
    And I click "#removeType"
    And I click confirm on the modal
    Then I should see a "error" toastr with the message "This job type is currently in use, and cannot be deleted."
    Given toastr are cleared
    And I click ".job-milestone #delete"
    And I click confirm on the modal
    Then I should see a "error" toastr with the message "This job milestone is currently in use, and cannot be deleted."

  Scenario: a user can create, edit and delete a job type
    When I go to the config settings
    And I click "#addJobType"
    Then I should see a modal
    And I set text field with id "job-type-name" to "Cucumber"
    And I click "#submit-new-job-type"
    Then I should see a "success" toastr with the message "Job type created successfully."
    And I should not see a modal
    Given toastr are cleared
    When I click "#editType"
    And I set text field with id "job-type-name" to "Velocity"
    And I click "#update-job-type"
    Then I should see a "success" toastr with the message "Job type updated successfully."
    And I should not see a modal
    Given toastr are cleared
    When I click "#removeType"
    And I click confirm on the modal
    Then I should see a "success" toastr with the message "Job type deleted successfully."
    And I should not see a modal

  Scenario: a user can create, edit and delete a job milestone
    Given a limited job type has been created
    When I go to the config settings
    And I click "#addMilestone"
    Then I should see a modal
    And I set text field with id "job-milestone-name" to "Velocity"
    And I click "#submit-new-milestone"
    Then I should see a "success" toastr with the message "Job milestone created successfully."
    And I should not see a modal
    Given toastr are cleared
    When I click ".job-milestone-link"
    And I set text field with id "job-milestone-name" to "Cucumber"
    And I click "#update-milestone"
    Then I should see a "success" toastr with the message "Job milestone updated successfully."
    And I should not see a modal
    Given toastr are cleared
    When I click ".job-milestone #delete"
    And I click confirm on the modal
    Then I should see a "success" toastr with the message "Job milestone deleted successfully."
    And I should not see a modal
