Feature: Allow users to manage their Products

  As a user of the app
  I want to manage my Products
  So that I can effectively manage the products that my business sells

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "CanReadProducts" permission

  #Navigation
  Scenario: A user can see the products list
    When I navigate to "/products"
    Then I should see the heading "Products"

  Scenario: A user without permission cannot see the products list
    Given I DO NOT have the "CanReadProducts" permission
    When I navigate to "/products"
    Then I should not see the heading "Products"

  Scenario: A user with read permissions can see a product
    Given a product has been created
    When I navigate to a product page
    Then I should see the heading "test product"

  Scenario: A superadmin user can't visit the products list
    Given a superuser exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/products"
    Then I should see the heading "Tenants"

  #Adding
  Scenario: A user can create a product
    Given I have the "CanCreateProducts" permission
    When I navigate to "/products"
    And I click "#add-product"
    And I enter product details
    And I navigate to a product page
    Then I should see the heading "test product 2"

  Scenario: A user without permission cannot create a products
    Given I DO NOT have the "CanCreateProducts" permission
    When I navigate to "/products"
    Then I should not see "#add-product"

  #Editing
  Scenario: A user can edit a product
    Given I have the "CanEditProducts" permission
    And a product has been created
    When I navigate to a product page
    And I click "#edit-product"
    And I enter updated product details
    Then I should see the updated product

  Scenario: A user without permission cannot edit a product
    Given I DO NOT have the "CanEditProducts" permission
    And a product has been created
    When I navigate to a product page
    Then I should not see "#edit-product"

  #Deleting
  Scenario: A user can delete a product
    Given I have the "CanDeleteProducts" permission
    And a product has been created
    When I navigate to a product page
    And I delete a product
    Then the product should not exist

  Scenario: A user without permission cannot delete a product
    Given I DO NOT have the "CanDeleteProducts" permission
    And a product has been created
    When I navigate to a product page
    Then I should not see "#delete-product"

  #Menu item permissions
  Scenario: A restricted user cannot see the Products menu item without the correct permission
    Given I DO NOT have the "CanReadProducts" permission
    Then the "Products" menu item is not shown

  Scenario: A user can see the Products menu item with the correct permission
    Given I have the "CanReadProducts" permission
    Then the "Products" menu item is shown
