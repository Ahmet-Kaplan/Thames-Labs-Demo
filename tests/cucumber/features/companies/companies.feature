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

  Scenario: An administrator can add CanReadCompanies permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanRead" on "Companies" to a restricted user
    Then the restricted user should have the "CanReadCompanies" permission

  Scenario: An administrator can remove CanReadCompanies permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Companies" from a restricted user
    Then the restricted user should not have the "CanReadCompanies" permission

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
    And a restricted user exists
    When I add permission "CanCreate" on "Companies" to a restricted user
    Then the restricted user should have the "CanCreateCompanies" permission

  Scenario: An administrator can remove CanCreateCompanies permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Companies" from a restricted user
    Then the restricted user should not have the "CanCreateCompanies" permission

  #Editing
  Scenario: A user can edit a company
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#edit-company"
    And I set text field "name" to "updated company name"
    And I submit the "editCompany" form
    Then "company-details" should say "updated company name"

  Scenario: A user without permission cannot edit a company
    Given I do not have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    Then I should not see "#edit-company"

  Scenario: An administrator can add CanEditCompanies permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanEdit" on "Companies" to a restricted user
    Then the restricted user should have the "CanEditCompanies" permission

  Scenario: An administrator can remove CanEditCompanies permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Companies" from a restricted user
    Then the restricted user should not have the "CanEditCompanies" permission

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
    And a restricted user exists
    When I add permission "CanDelete" on "Companies" to a restricted user
    Then the restricted user should have the "CanDeleteCompanies" permission

  Scenario: An administrator can remove CanDeleteCompanies permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Companies" from a restricted user
    Then the restricted user should not have the "CanDeleteCompanies" permission

  #Menu item permissions
  Scenario: A restricted user cannot see the Companies menu item without the correct permission
    Given I do not have the "CanReadCompanies" permission
    Then the "Companies" menu item is not shown

  Scenario: A user can see the Companies menu item with the correct permission
    Given I have the "CanReadCompanies" permission
    Then the "Companies" menu item is shown

  #Extended information fields
  Scenario: A user can open the "Add Extended information fields" modal
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#add-custom-field"
    Then I should see a modal

  Scenario: A user can add an extended information field
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    Then I should see ".custom-field-display-item"

  Scenario: A user can delete an extended information field
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#add-custom-field"
    And I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    And I click "#delete-custom-field"
    And I click confirm on the modal
    Then I should not see ".custom-field-display-item"

  Scenario: A user can edit an extended information field
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
    Then I see a field with the name "velocity" in the extended information list

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
    Then I should see the heading "Address"
    And I should see a map

  Scenario: A user can do a location search and see the map when editing a company's details
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I click "#edit-company"
    And I click "#show-map"
    When I search for Cowley Road
    Then the field "postcode" should contain "CB4"
    And I should see a map

  #Tags
  Scenario: A user with the CanEditCompanies permission can edit tags
    Given I have the "CanEditCompanies" permission
    And a "Company" has been created
    When I navigate to a company page
    And I set text field with selector ".tag-input input" to "test tag"
    Then the field with selector ".tag-input input" should contain "test tag"

  Scenario: A user without the CanEditCompanies permission cannot edit tags
    Given I do not have the "CanEditCompanies" permission
    Given a "Company" has been created
    When I navigate to a company page
    And I set text field with selector ".tag-input input" to "test tag"
    Then the field with selector ".tag-input input" should not contain "test tag"

  Scenario: A user with the Administrator permission can edit tags
    Given I have the "Administrator" permission
    And a "Company" has been created
    When I navigate to a company page
    And I set text field with selector ".tag-input input" to "test tag"
    Then the field with selector ".tag-input input" should contain "test tag"
