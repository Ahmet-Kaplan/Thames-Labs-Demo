Feature: Superuser can access special parts of the site

  As a superadmin user of the app
  I want to be able to access special features via url
  So that I can bookmark important features in my browser

  Background:
    Given I am a logged in superadmin user

  Scenario: A superadmin can visit the tenants screen
    When I navigate to "/tenants"
    Then I should see the heading "Tenants"
    And I should see the title "Tenants"

  Scenario: A superadmin can visit the notifications screen
    When I navigate to "/notifications"
    Then I should see the heading "Notifications"
    And I should see the title "Notifications"

  Scenario: A superadmin user can't visit the dashboard
    When I navigate to "/"
    Then I should see the heading "Tenants"
    And I should see the title "Tenants"

  Scenario: A superadmin user can't visit the companies list
    When I navigate to "/companies"
    Then I should see the heading "Tenants"
    And I should see the title "Tenants"

  Scenario: A superadmin can't visit the contacts list
    When I navigate to "/contacts"
    Then I should see the heading "Tenants"
    And I should see the title "Tenants"

  Scenario: A superadmin can't visit the tasks list
    When I navigate to "/tasks"
    Then I should see the heading "Tenants"
    And I should see the title "Tenants"

  Scenario: A superadmin can't visit the projects list
    When I navigate to "/projects"
    Then I should see the heading "Tenants"
    And I should see the title "Tenants"

  Scenario: A superadmin can't visit the purchase orders list
    When I navigate to "/purchaseorders"
    Then I should see the heading "Tenants"
    And I should see the title "Tenants"

  Scenario: A superadmin can't visit the data management screen
    When I navigate to "/datamanagement"
    Then I should see the heading "Tenants"
    And I should see the title "Tenants"

  Scenario: A superadmin can visit the statistics screen
    When I navigate to "/statistics"
    Then I should see the heading "Statistics"
    And I should see the title "Statistics"
