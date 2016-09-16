# Testing green under new changes but needs reworking
Feature: Allow users to manage their Products

  As a user of the app
  I want to manage my Products
  So that I can effectively manage the products that my business sells

  Background:
    Given I have the "CanReadProducts" permission

  #Reading
  Scenario: A user can see the products list
    When I visit Products
    Then I should see the heading "Products"

  Scenario: A user without permission cannot see the products list
    Given I do not have the "CanReadProducts" permission
    When I navigate to "/products"
    Then I should see the heading "Dashboard"

  Scenario: An administrator can add CanReadProducts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanRead" on "Products" to a restricted user
    Then the user "restricted user" should have the "CanReadProducts" permission
    When I remove permissions on "Products" from a restricted user
    Then the user "restricted user" should not have the "CanReadProducts" permission

  Scenario: A superadmin user can't visit the products list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/products"
    Then I should see the heading "Tenants"

  Scenario: A user can see the products overview
    When I visit Products
    And I click "#productOverviewWidget"
    Then I should see "#productOverviewPop"

  #Adding
  Scenario: A user can create, edit and delete a product
    Given I have the "CanCreateProducts" permission
    Given I have the "CanEditProducts" permission
    Given I have the "CanDeleteProducts" permission
    When I visit Products
    And I click "#add-product"
    And I set text field "name" to "test product 2"
    And I set rich text field "description" to "test description"
    And I submit the "insertProduct" form
    Then I should not see a modal
    And I go to a products detail page
    Then I should see the heading "test product 2"
    And I click "#edit-product"
    And I set text field "name" to "updated product name"
    And I submit the "updateProduct" form
    Then "#product-name" should say "updated product name"
    And I click "#delete-product"
    And I click confirm on the modal
    Then I should see the heading "Products"

  Scenario: A user without permission cannot create a product
    Given I do not have the "CanCreateProducts" permission
    When I visit Products
    Then I should not see "#add-product"

  Scenario: An administrator can add and remove CanCreateProducts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanCreate" on "Products" to a restricted user
    Then the user "restricted user" should have the "CanCreateProducts" permission
    When I remove permissions on "Products" from a restricted user
    Then the user "restricted user" should not have the "CanCreateProducts" permission


  #Editing
  Scenario: An administrator can add and remove CanEditProducts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanEdit" on "Products" to a restricted user
    Then the user "restricted user" should have the "CanEditProducts" permission
    When I remove permissions on "Products" from a restricted user
    Then the user "restricted user" should not have the "CanEditProducts" permission

  #Deleting
  Scenario: An administrator can add and remove CanDeleteProducts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanDelete" on "Products" to a restricted user
    Then the user "restricted user" should have the "CanDeleteProducts" permission
    When I remove permissions on "Products" from a restricted user
    Then the user "restricted user" should not have the "CanDeleteProducts" permission

  #Custom fields
  Scenario: A user can see the custom fields panel
    Given I have the "CanEditProducts" permission
    And a "Product" has been created
    When I go to a products detail page
    Then I should see "#custom-fields-panel"

  #Filtering and Searching
  Scenario: A user can filter products by sales price
    Given I have the "CanReadProducts" permission
    And a "Product" has been created
    And an additional "Product" has been created
    When I visit Products
    And I set the filter to "Sales Price >" then "1000"
    Then I should see ".filter-tag"
    And I should see ".product-item"
    And "#results-count" should contain "1 product"
