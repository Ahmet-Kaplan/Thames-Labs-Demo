# Testing green under new changes but needs reworking
Feature: Allow users to manage their Products

  As a user of the app
  I want to manage my Products
  So that I can effectively manage the products that my business sells

  Background:
    Given I have the "CanReadProducts" permission

  #Reading
  Scenario: A user can see the products list
    When I navigate to "/products"
    Then I should see the heading "Products"

  Scenario: A user without permission cannot see the products list
    Given I do not have the "CanReadProducts" permission
    When I navigate to "/products"
    Then I should see the heading "Dashboard"

  Scenario: A user with read permissions can see a product
    Given a "Product" has been created
    When I navigate to a product page
    Then I should see the heading "Imperial Blaster"

  Scenario: An administrator can add CanReadProducts permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanRead" on "Products" to a restricted user
    Then the user "restricted user" should have the "CanReadProducts" permission

  Scenario: An administrator can remove CanReadProducts permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Products" from a restricted user
    Then the user "restricted user" should not have the "CanReadProducts" permission

  Scenario: A superadmin user can't visit the products list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/products"
    Then I should see the heading "Tenants"

  Scenario: A user can see the products overview
    When I navigate to "/products"
    And I click "#ref_productsOverviewWidget"
    Then I should see "#productOverviewPop"

  #Adding
  Scenario: A user can create a product
    Given I have the "CanCreateProducts" permission
    When I navigate to "/products"
    And I click "#add-product"
    And I set text field "name" to "test product 2"
    And I set rich text field "description" to "test description"
    And I submit the "insertProduct" form
    And I navigate to a product page
    Then I should see the heading "test product 2"

  Scenario: A user without permission cannot create a products
    Given I do not have the "CanCreateProducts" permission
    When I navigate to "/products"
    Then I should not see "#add-product"

  Scenario: An administrator can add CanCreateProducts permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanCreate" on "Products" to a restricted user
    Then the user "restricted user" should have the "CanCreateProducts" permission

  Scenario: An administrator can remove CanCreateProducts permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Products" from a restricted user
    Then the user "restricted user" should not have the "CanCreateProducts" permission


  #Editing
  Scenario: A user can edit a product
    Given I have the "CanEditProducts" permission
    And a "Product" has been created
    When I navigate to a product page
    And I click "#edit-product"
    And I set text field "name" to "updated product name"
    And I submit the "editProduct" form
    Then "#product-name" should say "updated product name"

  Scenario: A user without permission cannot edit a product
    Given I do not have the "CanEditProducts" permission
    And a "Product" has been created
    When I navigate to a product page
    Then I should not see "#edit-product"

  Scenario: An administrator can add CanEditProducts permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanEdit" on "Products" to a restricted user
    Then the user "restricted user" should have the "CanEditProducts" permission

  Scenario: An administrator can remove CanEditProducts permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Products" from a restricted user
    Then the user "restricted user" should not have the "CanEditProducts" permission


  #Deleting
  Scenario: A user can delete a product
    Given I have the "CanDeleteProducts" permission
    And a "Product" has been created
    When I navigate to a product page
    And I click "#delete-product"
    And I click confirm on the modal
    Then ".list-group" should not contain "test product"

  Scenario: A user without permission cannot delete a product
    Given I do not have the "CanDeleteProducts" permission
    And a "Product" has been created
    When I navigate to a product page
    Then I should not see "#delete-product"

  Scenario: An administrator can add CanDeleteProducts permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I add permission "CanDelete" on "Products" to a restricted user
    Then the user "restricted user" should have the "CanDeleteProducts" permission

  Scenario: An administrator can remove CanDeleteProducts permission
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a restricted user exists
    When I remove permissions on "Products" from a restricted user
    Then the user "restricted user" should not have the "CanDeleteProducts" permission

  #Menu item permissions
  Scenario: A restricted user cannot see the Products menu item without the correct permission
    Given I do not have the "CanReadProducts" permission
    Then the "Products" menu item is not shown

  Scenario: A user can see the Products menu item with the correct permission
    Given I have the "CanReadProducts" permission
    Then the "Products" menu item is shown

  #Tags
  Scenario: A user with the CanEditProducts permission can edit tags
    Given I have the "CanEditProducts" permission
    And a "Product" has been created
    When I navigate to a product page
    And I click ".editTags"
    And I add the tag "test-tag"
    Then the tag field for the "products" should contain "test-tag"

  Scenario: A user without the CanEditProducts permission cannot edit tags
    Given I do not have the "CanEditProducts" permission
    Given a "Product" has been created
    When I navigate to a product page
    Then I should not see the edit tag button

  #Extended information fields
  Scenario: A user can add, edit and delete custom fields
    Given I have the "CanEditProducts" permission
    And a "Product" has been created
    When I navigate to a product page
    And I click "#add-custom-field"
    Then I should see a modal
    When I set text field with id "custom-field-name" to "velocity2"
    And I set text field with id "custom-field-text-value" to "velocity"
    And I click "#submit-custom-field"
    Then I should see ".custom-field-display-item"
    When I click "#edit-custom-fields"
    And I set text field with id "extInfosvelocity2TextValue" to "velocity"
    And I click "#submit-ext-info"
    Then I see a field with the name "velocity" in the custom field list
    When I click "#delete-custom-field"
    And I click confirm on the modal
    Then I should not see a modal
    And I should not see ".custom-field-display-item"

  #Custom fields
  Scenario: A user can see the custom fields panel
    Given I have the "CanEditProducts" permission
    And a "Product" has been created
    When I navigate to a product page
    Then I should see "#custom-fields-panel"

  #Filtering and Searching
  Scenario: A user can filter products by sales price
    Given I have the "CanReadProducts" permission
    And a "Product" has been created
    And an additional "Product" has been created
    When I navigate to "/products"
    And I set the filter to "Sales Price >" then "1000"
    Then I should see ".removeProp"
    And I should see ".product-item"
    And "#resultsCount" should say "1 record"

  Scenario: Clicking a tag badge applies the filter
    Given I have the "CanReadProducts" permission
    And a "Product" has been created
    And an additional "Product" has been created
    When I navigate to "/products"
    And I click ".badge"
    Then I should see ".removeProp"
    And "#resultsCount" should say "1 record"
