@dev
Feature: Allow users to manage their Purchase Orders
  As a user of the app
  I want to manage my Purchase Orders
  So that I can effectively monitor all incoming and outgoing purchases

  Background:
    Given a user exists

  Scenario: A superadmin user can't visit the Purchase Orders list
    Given a superadmin exists
    And I am a logged out user
    And I am a logged in superadmin user
    When I navigate to "/purchaseorders"
    Then I should see the heading "Tenants"

  Scenario: A user can see the Purchase Orders list
    Given I am a logged in user
    And I have the "CanReadPurchaseOrders" permission
    When I navigate to "/purchaseorders"
    Then I should see the heading "Purchase Orders"

  Scenario: A user can add a new purchase order to a company
    Given I am a logged in user
    And I have the "CanReadPurchaseOrders" permission
    And a "Company" has been created
    And I have the "CanCreatePurchaseOrders" permission
    When I navigate to "/purchaseorders"
    And I click "#add-purchase-order"
    And I set text field "description" to "test purchase order"
    And I set text field with selector "#selectedSupplier to "Test Ltd"
    And I click "#create-purchase-order"
    And I navigate to a purchase order page
    Then I should see the heading "test purchase order"
