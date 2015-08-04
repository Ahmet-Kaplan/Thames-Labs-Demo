Feature: Allow users to manage their Products

  As a user of the app
  I want to manage my Products
  So that I can effectively manage the products that my business sells

  Background:
    Given I am a logged in user
    And a product has been created

  Scenario: A user can see the products list
    When I navigate to "/products"
    Then I should see the heading "Products"

  Scenario: A user can add a product
    When I navigate to "/products"
    And I click "#add-product"
    And I enter product details
    Then a new product should exist

  Scenario: A user can edit a product
    When I navigate to a product page
    And I click "#edit-product"
    And I enter updated product details
    Then I should see the updated product

  Scenario: A user can delete a product
    When I navigate to a product page
    And I delete a product
    Then the product should not exist
