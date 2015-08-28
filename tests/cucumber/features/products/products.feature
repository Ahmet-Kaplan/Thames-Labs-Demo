Feature: Allow users to manage their Products

  As a user of the app
  I want to manage my Products
  So that I can effectively manage the products that my business sells

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "CanReadProducts" permission

  Scenario: A user can see the products list
    When I navigate to "/products"
    Then I should see the heading "Products"
    
  Scenario: A user without permission cannot see the products list
    Given I DO NOT have the "CanReadProducts" permission
    When I navigate to "/products"
    Then I should not see the heading "Products"

  Scenario: A user can add a product
    Given I have the "CanCreateProducts" permission
    When I navigate to "/products"
    And I click "#add-product"
    And I enter product details
    And I navigate to a product page
    Then I should see the heading "test product 2"

  Scenario: A user without permission cannot add a products
    Given I DO NOT have the "CanCreateProducts" permission
    When I navigate to "/products"
    Then I should not see "#add-product"


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
