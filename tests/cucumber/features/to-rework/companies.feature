# Testing green under new changes but needs reworking
Feature: Allow users to manage their Companies
  As a user of the app
  I want to manage my Companies
  So that I can effectively manage the companies that my business communicates with

  Background:
    Given I have the "CanReadCompanies" permission

  #Reading
  Scenario: A user can see the companies list, a user without permission cannot
    When I visit Companies
    Then I should see the heading "Companies"
    Given I do not have the "CanReadCompanies" permission
    When I navigate to "/Companies"
    Then I should see the heading "Dashboard"

  Scenario: A user with read permissions can see a company, a user without permission cannot
    Given a "Company" has been created
    When I go to a companies detail page
    Then I should see the heading "Test Ltd"
    Given I do not have the "CanReadCompanies" permission
    When I navigate to "/Companies"
    Then I should see the heading "Dashboard"

  Scenario: An administrator can add and remove CanReadCompanies permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanRead" on "Companies" to a restricted user
    Then the user "restricted user" should have the "CanReadCompanies" permission
    When I remove permissions on "Companies" from a restricted user
    Then the user "restricted user" should not have the "CanReadCompanies" permission

  Scenario: An administrator can remove CanReadCompanies permission from another user and itself
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Companies" from a restricted user
    Then the user "restricted user" should not have the "CanReadCompanies" permission
    When I remove permissions on "Companies" for myself
    Then the user "test user" should not have the "CanReadCompanies" permission

  Scenario: An administrator can add back the CanReadCompanies permission for itself
    Given I have the "Administrator" permission
    Given I do not have the "CanReadCompanies" permission 
    And I add permission "CanRead" on "Companies" to myself
    Then the user "Test User" should have the "CanReadCompanies" permission

  Scenario: A superadmin user can't visit the companies list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/companies"
    Then I should see the heading "Tenants"

  #Creat, edit and delete
  Scenario: A user can create, edit and delete a company
    Given I have the "CanCreateCompanies" permission
    And I have the "CanEditCompanies" permission
    And I have the "CanDeleteCompanies" permission
    When I visit Companies
    And I click "#add-company"
    And I set text field with id "companyName" to "Test Company"
    And I click "#manual-fill"
    And I submit the "insertNewCompany" form
    Then I should see the heading "Test Company"
    And I click "#edit-company"
    And I set text field "name" to "updated company name"
    And I submit the "updateCompany" form
    Then "#company-details" should contain "updated company name"
    And I click "#remove-company"
    And I click confirm on the modal
    Then I should see the heading "Companies"

  #Create permissions
  Scenario: A user without permission cannot create a company
    Given I do not have the "CanCreateCompanies" permission
    When I visit Companies
    Then I should not see "#add-company"

  Scenario: An administrator can add and remove CanCreateCompanies permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanCreate" on "Companies" to a restricted user
    Then the user "restricted user" should have the "CanCreateCompanies" permission
    When I remove permissions on "Companies" from a restricted user
    Then the user "restricted user" should not have the "CanCreateCompanies" permission

  #Edit permissions
  Scenario: A user without permission cannot edit a company
    Given I do not have the "CanEditCompanies" permission
    And a "Company" has been created
    When I go to a companies detail page
    Then I should not see "#edit-company"

  Scenario: An administrator can add and remove CanEditCompanies permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanEdit" on "Companies" to a restricted user
    Then the user "restricted user" should have the "CanEditCompanies" permission
    When I remove permissions on "Companies" from a restricted user
    Then the user "restricted user" should not have the "CanEditCompanies" permission

  #Delete permissions
  Scenario: A user without permission cannot delete a company
    Given I do not have the "CanDeleteCompanies" permission
    And a "Company" has been created
    When I go to a companies detail page
    Then I should not see "#remove-company"

  Scenario: An administrator can add and remove CanDeleteCompanies permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanDelete" on "Companies" to a restricted user
    Then the user "restricted user" should have the "CanDeleteCompanies" permission
    When I remove permissions on "Companies" from a restricted user
    Then the user "restricted user" should not have the "CanDeleteCompanies" permission

  #Menu item permissions
  Scenario: A restricted user cannot see the Companies menu item without the correct permission
    Given I do not have the "CanReadCompanies" permission
    Then the "Companies" menu item is not shown

  Scenario: A user with permission can see the Companies menu item, a user without permission cannot 
    Given I have the "CanReadCompanies" permission
    Then the "Companies" menu item is shown
    Given I do not have the "CanReadCompanies" permission
    Then the "Companies" menu item is not shown

  #Local custom fields
  Scenario: A user can add, edit and delete a custom field
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I go to a companies detail page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#createCustomField"
    Then I should not see a modal
    And I should see ".custom-field-display-item"
    And I click "#edit-custom-fields"
    And I set text field with id "customFieldvelocity2TextValue" to "velocity"
    And I click "#submit-ext-info"
    Then I see a field with the name "velocity" in the custom field list
    And I click "#delete-custom-field"
    And I click confirm on the modal
    Then I should not see a modal
    Then "#custom-fields-panel" should contain "No custom fields"

  #Maps
  Scenario: A user can do a location search and see the map when creating a company, on the details page and when editing the company
    Given I have the "CanCreateCompanies" permission
    Given I have the "CanEditCompanies" permission
    When I visit Companies
    And I click "#add-company"
    And I set text field with id "companyName" to "Test Company"
    And I click "#manual-fill"
    And I search for Cowley Road
    Then the field "postcode" should contain "CB4"
    And I should see a map
    And I submit the "insertNewCompany" form
    Then I should not see a modal
    And I should see a map
    And I click "#edit-company"
    Then I should see a modal
    And I click "#newLocationSearch"
    When I search for Cowley Road
    Then the field "postcode" should contain "CB4"
    And I should see a map

  #Tags
  Scenario: A user with the CanEditCompanies permission can edit tags, a user without permission cannot
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I go to a companies detail page
    And I click ".editTags"
    And I add the tag "test-tag"
    Then the tag field for the "companies" should contain "test-tag"
    Given I do not have the "CanEditCompanies" permission
    Then I should not see the edit tag button

  #Tasks
  Scenario: A user can add a task to a company
    Given I have the "CanReadTasks" permission
    And I have the "CanCreateTasks" permission
    And a "Company" has been created
    When I go to a companies detail page
    And I click "#btnAddTaskToEntity"
    Then I should see a modal
    When I set text field "title" to "task title"
    And I selectize "assigneeId" to "Test User"
    And I submit the "insertTask" form
    Then I should see "#taskContainer .list-group-item"

  Scenario: A user without the CanReadTasks permission cannot see tasks in a company
    Given I do not have the "CanReadTasks" permission
    And a "Company" task has been created
    When I go to a companies detail page
    Then I should not see "#entityTaskList"

  Scenario: A user without the CanCreateTasks permission cannot add a task to a company
    Given I have the "CanReadTasks" permission
    And I do not have the "CanCreateTasks" permission
    And a "Company" has been created
    When I go to a companies detail page
    Then I should see "#entityTaskList"
    And I should not see "#btnAddTaskToEntity"

  #Activities
  Scenario: A user can add, edit and delete a company activity
    Given a "Company" has been created
    When I go to a companies detail page
    And I click "#general-dropdown"
    And I click "#add-activity"
    And I set text field "activityTimestamp" to "05/05/2015 05:05"
    And I set rich text field "notes" to "test activity"
    And I select "Note" from dropdown field "type"
    And I click "#confirm"
    Then I should not see a modal
    And I should see the activity in the timeline   
    And I click "#edit-activity"
    And I select "Email" from dropdown field "type"
    And I click "#update"
    Then I should see a toastr with the message containing "Activity updated."
    And I click "#remove-activity"
    And I click confirm on the modal
    Then I should see "#no-activity"

  #Filtering and Searching
  Scenario: A user can filter companies by city
    Given I have the "Administrator" permission
    And a "Company" has been created
    And an additional "Company" has been created
    When I visit Companies
    And I set the filter to "City:" then "Cambridge"
    Then I should see ".filter-tag"
    And I should see ".fa-map-marker"
    And "#results-count" should contain "1 company"
    When I click ".remove-filter-tag"
    And I set the filter to "City:" then "city"
    Then I should see ".filter-tag"
    And "#results-count" should contain "0 companies"

  Scenario: Clicking a tag badge applies the filter
    Given I have the "Administrator" permission
    And a "Company" has been created
    And an additional "Company" has been created
    When I visit Companies
    And I click ".badge"
    Then I should see ".filter-tag"
    And I should see ".fa-map-marker"
    And "#results-count" should contain "1 company"

  Scenario: Navigating to the company list with a search term
    When I navigate to "/companies?q=search"
    Then I should see the heading "Companies"
    And the field with selector ".easysearch-input" should contain "search"

  Scenario: Navigating to the company list with a filter
    When I navigate to "/companies?f%5Btags%5D=tag"
    Then I should see the heading "Companies"
    And I should see ".filter-tag"

  Scenario: Searching in the company list should update the URL
    When I visit Companies
    Then I should see the heading "Companies"
    When I set text field with selector ".easysearch-input" to "search"
    Then I should see the url is "/companies?q=search"