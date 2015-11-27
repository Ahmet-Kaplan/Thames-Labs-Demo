@dev
Feature: Allow users to access a central view of all activities
  As a user
  I want to view a list of all activities
  So that I can search and filter them as necessary

  Background:
    Given a user exists
    And I am a logged in user

  #Access
  Scenario: A user with Company Read permission can see a company activity in the list
    Given a "Company" has been created
    And I have the "CanReadCompanies" permission
    And the company has an activity
    And I click "#menuLinkActivities"
    Then I see a "companies" activity with the notes "Test company activity" in the list "#activity-list"

  Scenario: A user without Company Read permission cannot see a company activity in the list
    Given a "Company" has been created
    And the company has an activity
    And I click "#menuLinkActivities"
    Then I do not see activities from "companies" in the list "#activity-list"
