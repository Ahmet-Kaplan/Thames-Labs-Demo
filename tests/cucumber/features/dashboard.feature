Feature: Allow users to see widgets

  As a user of the app
  I want to see widgets
  So that I can keep track of entities

  Background:
    Given I am viewing the dashboard

  Scenario: A user can see the standard widgets and add those which aren't default
    Then I see the default widgets
    When I add new widgets
    Then I see the new widgets on my dashboard

  Scenario: A user can add the opportunities widget if they have permission
    Then I can not add the opportunities widget
    When I have the "CanReadOpportunities" permission
    Then I can add the opportunities widget

  Scenario: A user can add the job widget if they have permission
    Then I can not add the job widget
    When I have the "CanReadJobs" permission
    Then I can add the job widget

  Scenario: A user can add the products widget if they have permission
    Then I can not add the products widget
    When I have the "CanReadProducts" permission
    Then I can add the products widget