# Testing green under new changes but needs reworking
Feature: Superadmin can access special parts of the site

  As a superadmin user of the app
  I want to be able to access special features via url
  So that I can bookmark important features in my browser

  #Superadmin
  Scenario: A superadmin can visit the tenants screen
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    Then I should see the heading "Tenants"
    And I should see the title "Tenants"

  Scenario: A superadmin can visit the notifications screen
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I visit notifications
    Then I should see the heading "Notifications"
    And I should see the title "Notifications"

  Scenario: A superadmin can visit the sign up statistics screen
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I visit statistics
    Then I should see the heading "Statistics"
    And I should see the title "Statistics"

  #Normal user
  Scenario: A normal user can't visit the tenants screen
    When I navigate to "/tenants"
    Then I should see the heading "Dashboard"
    And I should see the title "Dashboard"

  Scenario: A normal user can't visit the notifications screen
    When I navigate to "/notifications"
    Then I should see the heading "Dashboard"
    And I should see the title "Dashboard"

	Scenario: A normal user can't visit the sign up statistics screen
		When I navigate to "/statistics"
		Then I should see the heading "Dashboard"
		And I should see the title "Dashboard"

  #Tenant/user creation
  Scenario: A super-admin can create a new tenant
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    And I click "#btnAddNewTenant"
    And I set text field with id "tenantName" to "Velocity"
    And I click "#btnCreateTenant"
    Then I should see ".tenantListItemEntry"
