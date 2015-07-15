Feature: Users can access different parts of the app via urls

  As a user of the app
  I want to be able to access features via url
  So that I can bookmark important features in my browser

  Background:
    Given I am a logged in user

  Scenario: A user can visit the dashboard
    When I navigate to "/"
    Then I should see the heading "Dashboard"
    And I should see the title "Dashboard"

  Scenario: A user can visit the companies list
    When I navigate to "/companies"
    Then I should see the heading "Companies"
    And I should see the title "Companies"

  Scenario: A user can visit the contacts list
    When I navigate to "/contacts"
    Then I should see the heading "Contacts"
    And I should see the title "Contacts"

  Scenario: A user can visit the tasks list
    When I navigate to "/tasks"
    Then I should see the heading "Tasks"
    And I should see the title "Tasks"

  Scenario: A user can visit the projects list
    When I navigate to "/projects"
    Then I should see the heading "Projects"
    And I should see the title "Projects"

  Scenario: A user can visit the purchase orders list
    When I navigate to "/purchaseorders"
    Then I should see the heading "Purchase Orders"
    And I should see the title "Purchase Orders"

  Scenario: A user can visit the data management screen
    When I navigate to "/datamanagement"
    Then I should see the heading "Data Management"
    And I should see the title "Data Management"

  Scenario: A normal user can't visit the tenants screen
    When I navigate to "/tenants"
    Then I should see the heading "Dashboard"
    And I should see the title "Dashboard"

  Scenario: A normal user can't visit the notifications screen
    When I navigate to "/notifications"
    Then I should see the heading "Dashboard"
    And I should see the title "Dashboard"
