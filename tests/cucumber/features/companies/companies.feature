Feature: Allow users to manage their Companies
  As a user of the app
  I want to manage my Companies
  So that I can effectively manage the companies that my business communicates with

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "CanReadCompanies" permission

  #Reading
  Scenario: A user can see the companies list
    When I navigate to "/companies"
    Then I should see the heading "Companies"

  Scenario: A user without permission cannot see the companies list
    Given I do not have the "CanReadCompanies" permission
    When I navigate to "/companies"
    Then I should see the heading "Dashboard"

  Scenario: A user with read permissions can see a company
    Given a "Company" has been created
    When I navigate to a company page
    Then I should see the heading "Test Ltd"

  Scenario: A user should not be able to see companies created by a user under another tenant
    Given I have the "CanCreateCompanies" permission
    And a "Company" has been created
    And I navigate to "/companies"
    Then I should see "#mchCompany"
    Given a second tenant exists
    And a second user exists
    And I log out
    And I log in as user 2
    And I have the "CanReadCompanies" permission
    And I navigate to "/companies"
    Then I should not see "#mchCompany"


  Scenario: An administrator can add CanReadCompanies permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanRead" on "Companies" to a restricted user
    Then the user "restricted user" should have the "CanReadCompanies" permission


  Scenario: An administrator can remove CanReadCompanies permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Companies" from a restricted user
    Then the user "restricted user" should not have the "CanReadCompanies" permission


  Scenario: An administrator can remove CanReadCompanies permission for itself
    Given I have the "Administrator" permission
    And I am on the pro plan
    When I remove permissions on "Companies" for myself
    Then the user "test user" should not have the "CanReadCompanies" permission


  Scenario: An administrator can add back the CanReadCompanies permission for itself
    Given I have the "Administrator" permission
    And I am on the pro plan
    When I remove permissions on "Companies" for myself
    And I add permission "CanRead" on "Companies" to myself
    Then the user "test user" should have the "CanReadCompanies" permission

  Scenario: A superadmin user can't visit the companies list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/companies"
    Then I should see the heading "Tenants"

  #Adding
  Scenario: A user can create a company
    Given I have the "CanCreateCompanies" permission
    When I navigate to "/companies"
    And I click "#add-company"
    And I set text field "name" to "test company 2"
    And I submit the "insertNewCompany" form
    Then I should see the heading "test company 2"

  Scenario: A user without permission cannot create a companies
    Given I do not have the "CanCreateCompanies" permission
    When I navigate to "/companies"
    Then I should not see "#add-company"


  Scenario: An administrator can add CanCreateCompanies permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanCreate" on "Companies" to a restricted user
    Then the user "restricted user" should have the "CanCreateCompanies" permission


  Scenario: An administrator can remove CanCreateCompanies permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Companies" from a restricted user
    Then the user "restricted user" should not have the "CanCreateCompanies" permission


  #Editing
  Scenario: A user can edit a company
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#edit-company"
    And I set text field "name" to "updated company name"
    And I submit the "editCompany" form
    Then "#company-details" should say "updated company name"

  Scenario: A user without permission cannot edit a company
    Given I do not have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    Then I should not see "#edit-company"


  Scenario: An administrator can add CanEditCompanies permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanEdit" on "Companies" to a restricted user
    Then the user "restricted user" should have the "CanEditCompanies" permission


  Scenario: An administrator can remove CanEditCompanies permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Companies" from a restricted user
    Then the user "restricted user" should not have the "CanEditCompanies" permission


  #Deleting
  Scenario: A user can delete a company
    Given I have the "CanDeleteCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#remove-company"
    And I click confirm on the modal
    Then I should see the heading "Companies"

  Scenario: A user without permission cannot delete a company
    Given I do not have the "CanDeleteCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    Then I should not see "#remove-company"


  Scenario: An administrator can add CanDeleteCompanies permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanDelete" on "Companies" to a restricted user
    Then the user "restricted user" should have the "CanDeleteCompanies" permission


  Scenario: An administrator can remove CanDeleteCompanies permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Companies" from a restricted user
    Then the user "restricted user" should not have the "CanDeleteCompanies" permission

  #Menu item permissions
  Scenario: A restricted user cannot see the Companies menu item without the correct permission
    Given I do not have the "CanReadCompanies" permission
    Then the "Companies" menu item is not shown

  Scenario: A user can see the Companies menu item with the correct permission
    Given I have the "CanReadCompanies" permission
    Then the "Companies" menu item is shown


  #Extended information fields
  Scenario: A user can open the "Add custom field" modal
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#add-custom-field"
    Then I should see a modal

  Scenario: A user can add an custom field
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    Then I should see ".custom-field-display-item"

  Scenario: A user can delete an custom field
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#add-custom-field"
    Then I should see a modal
    When I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    And I click "#delete-custom-field"
    And I click confirm on the modal
    Then "#custom-fields-panel" should contain "No custom fields"

  Scenario: A user can edit an custom field
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    And I click "#edit-custom-fields"
    And I set text field with id "extInfosvelocity2TextValue" to "velocity"
    And I click "#submit-ext-info"
    Then I see a field with the name "velocity" in the custom field list


  #Maps
  Scenario: A user can do a location search and see the map when creating a company
    Given I have the "CanCreateCompanies" permission
    When I navigate to "/companies"
    And I click "#add-company"
    And I search for Cowley Road
    Then the field "postcode" should contain "CB4"
    And I should see a map

  Scenario: A user can see the map on a company's page
    Given I have the "CanCreateCompanies" permission
    Given a "Company" has been created
    When I navigate to a company page
    Then I should see a map

  Scenario: A user can do a location search and see the map when editing a company's details
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#edit-company"
    And I should see a modal
    And I click "#show-map"
    When I search for Cowley Road
    Then the field "postcode" should contain "CB4"
    And I should see a map


  #Tags
  Scenario: A user with the CanEditCompanies permission can edit tags
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click ".editTags"
    And I add the tag "test-tag"
    Then the tag field for the "companies" should contain "test-tag"

  Scenario: A user without the CanEditCompanies permission cannot edit tags
    Given I do not have the "CanEditCompanies" permission
    Given a "Company" has been created
    When I navigate to a company page
    Then I should not see the edit tag button

  #Tasks
  Scenario: A user can add a task to a company
    Given I have the "CanReadTasks" permission
    And I have the "CanCreateTasks" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#btnAddTaskToEntity"
    Then I should see a modal
    When I set text field "title" to "task title"
    And I selectize "assigneeId" to "test user"
    And I submit the "newTask" form
    Then I should see the heading "task title"

  Scenario: A user without the CanReadTasks permission cannot see tasks in a company
    Given I do not have the "CanReadTasks" permission
    And a "Company" task has been created
    When I navigate to a company page
    Then I should not see "#entityTaskList"

  Scenario: A user without the CanCreateTasks permission cannot add a task to a company
    Given I have the "CanReadTasks" permission
    And I do not have the "CanCreateTasks" permission
    And a "Company" has been created
    When I navigate to a company page
    Then I should see "#entityTaskList"
    And I should not see "#btnAddTaskToEntity"

  #Activities
  Scenario: A user can add an activity
    Given a "Company" has been created
    When I navigate to a company page
    And I click "#general-dropdown"
    And I click "#add-activity"
    And I set text field "activityTimestamp" to "05/05/2015 05:05"
    And I set rich text field "notes" to "test activity"
    And I select "Note" from dropdown field "type"
    And I click "#confirm"
    Then I should see the activity in the timeline

  Scenario: A user can edit an activity
    Given a "Company" has been created
    When I navigate to a company page
    And I click "#general-dropdown"
    And I click "#add-activity"
    And I set text field "activityTimestamp" to "05/05/2015 05:05"
    And I set rich text field "notes" to "test activity"
    And I select "Note" from dropdown field "type"
    And I click "#confirm"
    And I wait
    And I click "#edit-activity"
    And I select "Email" from dropdown field "type"
    And I click "#update"
    Then I should see a toastr with the message containing "Activity updated."

  Scenario: A user can delete an activity
    Given a "Company" has been created
    When I navigate to a company page
    And I click "#general-dropdown"
    And I click "#add-activity"
    And I set text field "activityTimestamp" to "05/05/2015 05:05"
    And I set rich text field "notes" to "test activity"
    And I select "Note" from dropdown field "type"
    And I click "#confirm"
    And I wait
    And I click "#remove-activity"
    And I click confirm on the modal
    Then I should see "#no-activity"

  #Filtering and Searching

  Scenario: A user can filter companies by city
    Given I have the "Administrator" permission
    And a "Company" has been created
    And an additional "Company" has been created
    When I navigate to "/companies"
    And I set the filter to "City:" then "Cambridge"
    Then I should see ".removeProp"
    And I should see ".fa-map-marker"
    And "#resultsCount" should say "1 record"
    When I click ".removeProp"
    And I set the filter to "City:" then "city"
    Then I should see ".removeProp"
    And "#resultsCount" should say "0 records"
 
  Scenario: Clicking a tag badge applies the filter
    Given I have the "Administrator" permission
    And a "Company" has been created
    And an additional "Company" has been created
    When I navigate to "/companies"
    And I click ".badge"
    Then I should see ".removeProp"
    And I should see ".fa-map-marker"
    And "#resultsCount" should say "1 record"

  Scenario: Navigating to the company list with a search term
    When I navigate to "/companies?q=search"
    Then I should see the heading "Companies"
    And the field with selector ".easysearch-input" should contain "search"

  Scenario: Navigating to the company list with a filter
    When I navigate to "/companies?f%5Btags%5D=tag"
    Then I should see the heading "Companies"
    And I should see ".removeProp"
  
  Scenario: Searching in the company list should update the URL
    When I navigate to "/companies"
    Then I should see the heading "Companies"
    When I set text field with selector ".easysearch-input" to "search"
    Then I should see the url is "/companies?q=search"