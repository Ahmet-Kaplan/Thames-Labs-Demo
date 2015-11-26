Feature: Allow users to manage their Purchase Orders
  As a user of the app
  I want to manage my Purchase Orders
  So that I can effectively monitor all incoming and outgoing purchases

  Background:
    Given a user exists
    And I am not a new user

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
    And I set text field with selector "#description" to "test purchase order"
    And I selectize "supplierCompanyId" to "Test Ltd"
    And I click "#create-purchase-order"
    Then I should see the heading "test purchase order"

  Scenario: A user can edit a purchase order
    Given I am a logged in user
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanEditPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    When I navigate to "/purchaseorders"
    And I click "#add-purchase-order"
    And I set text field with selector "#description" to "test purchase order"
    And I selectize "supplierCompanyId" to "Test Ltd"
    And I click "#create-purchase-order"
    When the page is loaded
    Then I click "#edit-purchase-order"
    And I set textarea "description" to "new purchase order"
    And I click "#update-purchase-order"
    Then I should see the heading "new purchase order"

  Scenario: A user can delete a purchase order
    Given I am a logged in user
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanDeletePurchaseOrders" permission
    When I navigate to "/purchaseorders"
    And I click "#add-purchase-order"
    And I set text field with selector "#description" to "test purchase order"
    And I selectize "supplierCompanyId" to "Test Ltd"
    And I click "#create-purchase-order"
    And I click "#remove-purchase-order"
    And I click confirm on the modal
    Then I should not see "#po-item"

  Scenario: A user can add a new items to a purchase order
    Given I am a logged in user
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanEditPurchaseOrders" permission
    When I navigate to "/purchaseorders"
    And I click "#add-purchase-order"
    And I set text field with selector "#description" to "test purchase order"
    And I selectize "supplierCompanyId" to "Test Ltd"
    And I click "#create-purchase-order"
    When the page is loaded
    Then I click "#add-item"
    And I set text field with selector "#description" to "test item"
    And I set text field with selector "#code" to "test00001"
    And I set text field with selector "#itemValue" to "4.00"
    And I set text field with selector "#currQuant" to "4.00"
    And I click "#add-item-to-po"
    Then element "#purchase-order-items" should contain the text "test item"

  Scenario: A user can edit an existing purchase order item
    Given I am a logged in user
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanEditPurchaseOrders" permission
    When I navigate to "/purchaseorders"
    And I click "#add-purchase-order"
    And I set text field with selector "#description" to "test purchase order"
    And I selectize "supplierCompanyId" to "Test Ltd"
    And I click "#create-purchase-order"
    When the page is loaded
    Then I click "#add-item"
    And I set text field with selector "#description" to "test item"
    And I set text field with selector "#code" to "test00001"
    And I set text field with selector "#itemValue" to "4.00"
    And I set text field with selector "#currQuant" to "4.00"
    And I click "#add-item-to-po"
    And I click "#edit-po-item"
    And I set textarea "description" to "test purchase order item"
    And I click "#update-po-item"
    Then element "#po-item" should contain the text "test purchase order item"

  Scenario: A user can delete an existing purchase order item
    Given I am a logged in user
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanEditPurchaseOrders" permission
    When I navigate to "/purchaseorders"
    And I click "#add-purchase-order"
    And I set text field with selector "#description" to "test purchase order"
    And I selectize "supplierCompanyId" to "Test Ltd"
    And I click "#create-purchase-order"
    When the page is loaded
    Then I click "#add-item"
    And I set text field with selector "#description" to "test item"
    And I set text field with selector "#code" to "test00001"
    And I set text field with selector "#itemValue" to "4.00"
    And I set text field with selector "#currQuant" to "4.00"
    And I click "#add-item-to-po"
    And I click "#removePurchaseOrderItem"
    Then element "#purchase-order-items" should contain the text "No items"
