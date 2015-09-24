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
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    When I navigate to "/purchaseorders"
    And I click "#add-purchase-order"
    And I set text field "description" to "test purchase order"
    And I click "#selectedSupplier" and select the option "Test Ltd"
    And I click "#create-purchase-order"
    And I navigate to a purchase order page
    Then I should see the heading "test purchase order"

	Scenario: A user can add a new items to a purchase order
		Given I am a logged in user
		And a "Company" has been created
		And I have the "CanReadCompanies" permission
		And I have the "CanReadPurchaseOrders" permission
		And I have the "CanCreatePurchaseOrders" permission
		And I have the "CanEditPurchaseOrders" permission
		When I navigate to "/purchaseorders"
		And I click "#add-purchase-order"
		And I set text field "description" to "test purchase order"
		And I click "#selectedSupplier" and select the option "Test Ltd"
		And I click "#create-purchase-order"
		And I navigate to a purchase order page
		And I click "#add-item"
		And I set text field "description" to "test item"
		And I set text field "code" to "test00001"
		And I set text field "itemValue" to "4.00"
		And I set text field "currQuant" to "4.00"
		And I click "#add-item-to-po"
