Feature: Allow users to manage their Products

  As a user of the app
  I want to manage my Products
  So that I can effectively manage the products that my business sells

  Background:
    Given a user exists
    And 
    And I am a logged in user
    And I have the "CanReadProducts" permission


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
    Then I should see the heading "test product"

  Scenario: An administrator can add CanReadProducts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I add permission "CanRead" on "Products" to a restricted user
    Then the restricted user should have the "CanReadProducts" permission

  Scenario: An administrator can remove CanReadProducts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Products" from a restricted user
    Then the restricted user should not have the "CanReadProducts" permission

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

  Scenario: A user should not be able to see products created by a user under another tenant
    Given I have the "CanCreateProducts" permission
    And a "Product" has been created
    And I navigate to "/products"
    Then I should see "#list-item"
    Given a second tenant exists
    And a second user exists
    And I log out
    And I log in as user 2
    And I have the "CanReadProducts" permission
    And I navigate to "/products"
    Then I should not see "#list-item"

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
    And a restricted user exists
    When I add permission "CanCreate" on "Products" to a restricted user
    Then the restricted user should have the "CanCreateProducts" permission

  Scenario: An administrator can remove CanCreateProducts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Products" from a restricted user
    Then the restricted user should not have the "CanCreateProducts" permission


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
    And a restricted user exists
    When I add permission "CanEdit" on "Products" to a restricted user
    Then the restricted user should have the "CanEditProducts" permission

  Scenario: An administrator can remove CanEditProducts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Products" from a restricted user
    Then the restricted user should not have the "CanEditProducts" permission


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
    And a restricted user exists
    When I add permission "CanDelete" on "Products" to a restricted user
    Then the restricted user should have the "CanDeleteProducts" permission

  Scenario: An administrator can remove CanDeleteProducts permission
    Given I have the "Administrator" permission
    And a restricted user exists
    When I remove permissions on "Products" from a restricted user
    Then the restricted user should not have the "CanDeleteProducts" permission


  #Menu item permissions
  Scenario: A restricted user cannot see the Products menu item without the correct permission
    Given I do not have the "CanReadProducts" permission
    Then the "Products" menu item is not shown

  Scenario: A user can see the Products menu item with the correct permission
    Given I have the "CanReadProducts" permission
    Then the "Products" menu item is shown
