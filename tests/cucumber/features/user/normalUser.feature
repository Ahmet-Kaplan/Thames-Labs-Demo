Feature: Allow Administrators to add users

  As a user of the app
  I want to be able to add user on my own company account
  So that we can share our data

  Background:
    Given I am a logged in user

  Scenario: A normal user can't see the 'Administration' button
    When I navigate to "/"
    Then I should not see the "#administration" button