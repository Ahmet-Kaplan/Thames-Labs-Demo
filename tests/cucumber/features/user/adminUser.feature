@ignore
Feature: Allow Administrators to add users

  As a basic user of the app
  I can't see the administration section
  So that we can share our data

  Background:
    Given I am a logged in Administrator user

  Scenario: An administrator can see the 'Administration' button
    When I navigate to "/"
    Then I should see the "#administration" button

  Scenario: An administrator can add a new user
    When I click "#administration"
    And I click "#add-user"
    And I create the user
    Then I should see a success toastr