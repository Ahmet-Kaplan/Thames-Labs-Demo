Feature: Allow users to manage their Contacts
  As a user of the app
  I want to manage my Contacts
  So that I can effectively manage the contacts that my business communicates with

  Background:
    Given a user exists
    And I am not a new user
    And I am a logged in user
    And I have the "CanReadContacts" permission

  #Reading
  Scenario: A user can see the contacts list
    When I navigate to "/contacts"
    Then I should see the heading "Contacts"

  Scenario: A user without permission cannot see the contacts list
    Given I do not have the "CanReadContacts" permission
    When I navigate to "/contacts"
    Then I should see the heading "Dashboard"

  Scenario: A user with read permissions can see a contact
    Given a "Contact" has been created
    When I navigate to a contact page
    Then I should see the heading "Testy Surname"

  Scenario: An administrator can add CanReadContacts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanRead" on "Contacts" to a restricted user
    Then the restricted user should have the "CanReadContacts" permission

  Scenario: An administrator can remove CanReadContacts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Contacts" from a restricted user
    Then the restricted user should not have the "CanReadContacts" permission

  Scenario: A superadmin user can't visit the contacts list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/contacts"
    Then I should see the heading "Tenants"

  #Adding
  Scenario: A user can create a contact
    Given I have the "CanCreateContacts" permission
    When I navigate to "/contacts"
    And I click "#add-contact"
    And I set text field "forename" to "test"
    And I set text field "surname" to "surname"
    And I submit the "insertContact" form
    Then I should see the heading "test surname"

  Scenario: A user can create a contact belonging to a company
    Given I have the "CanCreateContacts" permission
    And I have the "CanReadCompanies" permission
    And a "Company" has been created
    When I navigate to "/contacts"
    And I click "#add-contact"
    And I set text field "forename" to "test"
    And I set text field "surname" to "surname"
    And I selectize "companyId" to "Test Ltd"
    And I submit the "insertContact" form
    Then I should see the heading "test surname"

  Scenario: A user without permission cannot create a contacts
    Given I do not have the "CanCreateContacts" permission
    When I navigate to "/contacts"
    Then I should not see "#add-contact"

  Scenario: An administrator can add CanCreateContacts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanCreate" on "Contacts" to a restricted user
    Then the restricted user should have the "CanCreateContacts" permission

  Scenario: An administrator can remove CanCreateContacts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Contacts" from a restricted user
    Then the restricted user should not have the "CanCreateContacts" permission

  #Editing
  Scenario: A user can edit a contact
    Given I have the "CanEditContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    And I click "#edit-contact"
    And I set text field "forename" to "Forename"
    And I submit the "editContact" form
    Then "#contact-details" should say "Forename Surname"

  Scenario: A user without permission cannot edit a contact
    Given I do not have the "CanEditContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    Then I should not see "#edit-contact"

  Scenario: An administrator can add CanEditContacts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanEdit" on "Contacts" to a restricted user
    Then the restricted user should have the "CanEditContacts" permission

  Scenario: An administrator can remove CanEditContacts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Contacts" from a restricted user
    Then the restricted user should not have the "CanEditContacts" permission

  #Deleting
  Scenario: A user can delete a contact
    Given I have the "CanDeleteContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    And I click "#remove-contact"
    And I click confirm on the modal
    Then I should see the heading "Contacts"

  Scenario: A user without permission cannot delete a contact
    Given I do not have the "CanDeleteContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    Then I should not see "#remove-contact"

  Scenario: An administrator can add CanDeleteContacts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanDelete" on "Contacts" to a restricted user
    Then the restricted user should have the "CanDeleteContacts" permission

  Scenario: An administrator can remove CanDeleteContacts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Contacts" from a restricted user
    Then the restricted user should not have the "CanDeleteContacts" permission

  #Menu item permissions
  Scenario: A restricted user cannot see the Contacts menu item without the correct permission
    Given I do not have the "CanReadContacts" permission
    Then the "Contacts" menu item is not shown

  Scenario: A user can see the Contacts menu item with the correct permission
    Given I have the "CanReadContacts" permission
    Then the "Contacts" menu item is shown

  #Custom fields
  Scenario: A user can open the "Add Custom Fields" modal
    Given I have the "CanEditContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    And I click "#add-custom-field"
    Then I should see a modal

  Scenario: A user can add a custom field
    Given I have the "CanEditContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    Then I should see ".custom-field-display-item"

  Scenario: A user can delete a custom field
    Given I have the "CanEditContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    Then I click "#delete-custom-field"
    Then I click confirm on the modal
    Then I should not see ".custom-field-display-item"

  Scenario: A user can edit a custom field
    Given I have the "CanEditContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    And I click "#edit-custom-fields"
    And I set text field with id "extInfosvelocity2TextValue" to "velocity"
    And I click "#submit-ext-info"
    Then I see a field with the name "velocity" in the extended information list

  #Maps
  Scenario: A user can see the map on a contact's page
    Given a "Contact" has been created
    When I navigate to a contact page
    Then I should see the heading "Address"
    And I should see a map

  Scenario: A user can do a location search and see the map when creating a contact
    Given I have the "CanCreateContacts" permission
    When I navigate to "/contacts"
    And I click "#add-contact"
    And I set text field "forename" to "Test"
    And I search for Cowley Road
    Then the field "postcode" should contain "CB4"
    And I should see a map

  Scenario: A user can see the address fields for a contact not belonging to a company
    Given I have the "CanEditContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    And I click "#edit-contact"
    Then I should see "#formatted_address"

  Scenario: A user cannot see the address fields for a contact belonging to a company
    Given I have the "CanCreateContacts" permission
    And I have the "CanEditContacts" permission
    And I have the "CanReadCompanies" permission
    And a "Company" has been created
    When I navigate to "/contacts"
    And I click "#add-contact"
    And I set text field "forename" to "test"
    And I set text field "surname" to "surname"
    And I selectize "companyId" to "Test Ltd"
    And I submit the "insertContact" form
    And I click "#edit-contact"
    Then I should not see "#formatted_address"

  #Tags
  Scenario: A user with the CanEditContacts permission can edit tags
    Given I have the "CanEditContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    And I click ".editTags"
    And I add the tag "test-tag"
    Then the tag field for the "contacts" should contain "test-tag"

  Scenario: A user without the CanEditContacts permission cannot edit tags
    Given I do not have the "CanEditContacts" permission
    And a "Contact" has been created
    When I navigate to a contact page
    Then I should not see the edit tag button

  Scenario: A user with the Administrator permission can edit tags
    Given I have the "Administrator" permission
    And a "Contact" has been created
    When I navigate to a contact page
    And I click ".editTags"
    And I add the tag "test-tag"
    Then the tag field for the "contacts" should contain "test-tag"


  #Tasks
  Scenario: A user can add a task to a contact
    Given I have the "CanReadTasks" permission
    And I have the "CanCreateTasks" permission
    And a "Contact" has been created
    When I navigate to a contact page
    And I click "#btnAddTaskToEntity"
    Then I should see a modal
    When I set text field "title" to "task title"
    And I selectize "assigneeId" to "test user"
    And I submit the "newTask" form
    Then I should see the heading "task title"

  Scenario: A user without the CanReadTasks permission cannot see tasks in a contact
    Given I do not have the "CanReadTasks" permission
    And a "Contact" task has been created
    When I navigate to a contact page
    Then I should not see "#entityTaskList"

  Scenario: A user without the CanCreateTasks permission cannot add a task to a contact
    Given I have the "CanReadTasks" permission
    And I do not have the "CanCreateTasks" permission
    And a "Contact" has been created
    When I navigate to a contact page
    Then I should not see "#btnAddTaskToEntity"
