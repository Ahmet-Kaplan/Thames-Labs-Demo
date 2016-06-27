Feature: Allow users to see widgets

  As a user of the app
  I want to see widgets
  So that I can keep track of entities

  Background:
    Given I am viewing the dashboard
@dev
  Scenario: A user can see the standard widgets and add those which aren't default
    Then I see the default widgets
    When I add new widgets
    Then I see the new widgets on my dashboard

  Scenario: A pro user can add the purchase orders widgets if they have permission
    Given I have permission to read purchase orders
    Then I can not add the purchase orders widgets
    When I am on the pro plan
    Then I can add the purchase orders widgets

  Scenario: A user can add the opportunities widget if they have permission
    Then I can not add the opportunities widget
    When I have permission to read opportunities
    Then I can add the opportunities widget

  Scenario: A user can add the project widget if they have permission
    Then I can not add the project widget
    When I have permission to read projects
    Then I can add the project widget

  Scenario: A user can add the products widget if they have permission
    Then I can not add the products widget
    When I have permission to read products
    Then I can add the products widget