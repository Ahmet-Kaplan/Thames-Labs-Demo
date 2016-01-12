Feature: Allow users to manage their Purchase Orders
  As a user of the app
  I want to manage my Purchase Orders
  So that I can effectively monitor all incoming and outgoing purchases

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "CanReadPurchaseOrders" permission

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

  Scenario: A user should not be able to see purchase orders created by a user under another tenant
    Given a "PurchaseOrder" has been created
    And I navigate to "/purchaseorders"
    Then I should see "#list-item"
    Given a second tenant exists
    And a second user exists
    And I log out
    And I log in as user 2
    And I have the "CanReadPurchaseOrders" permission
    And I navigate to "/purchaseorders"
    Then I should not see "#list-item"

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
    And a "PurchaseOrder" has been created
    And I navigate to a purchase order page
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
    And a "PurchaseOrder" has been created
    And I navigate to a purchase order page
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
    And a "PurchaseOrder" has been created
    And I navigate to a purchase order page
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
    And a "PurchaseOrder" has been created
    And I navigate to a purchase order page
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
    And a "PurchaseOrder" has been created
    And I navigate to a purchase order page
    Then I click "#add-item"
    And I set text field with selector "#description" to "test item"
    And I set text field with selector "#code" to "test00001"
    And I set text field with selector "#itemValue" to "4.00"
    And I set text field with selector "#currQuant" to "4.00"
    And I click "#add-item-to-po"
    And I click "#removePurchaseOrderItem"
    Then element "#purchase-order-items" should contain the text "No items"

  Scenario: A user can see the purchase orders overview
    When I navigate to "/purchaseorders"
    And I click "#ref_poOverviewWidget"
    Then I should see "#poOverviewPop"

  #Activities
  Scenario: A user can add, edit and delete an activity
    Given I am a logged in user
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanEditPurchaseOrders" permission
    And a "PurchaseOrder" has been created
    When I navigate to a purchase order page
    And I click "#add-activity"
    Then I should see a modal
    When I set text field "activityTimestamp" to "05/05/2015 05:05"
    And I set rich text field "notes" to "test activity"
    And I select "Note" from dropdown field "type"
    And I click "#confirm"
    Then I should see a toastr with the message containing "Purchase order activity created."
    And I should not see a modal
    And I should see the activity in the timeline
    When I click "#edit-activity"
    Then I should see a modal
    Given toastr are cleared
    When I select "Email" from dropdown field "type"
    And I click "#update"
    Then I should see a toastr with the message containing "Activity updated."
    And I should not see a modal
    Given toastr are cleared
    When I click "#remove-activity"
    And I click confirm on the modal
    Then I should see "#no-activity"

  #Filtering and Searching
  Scenario: A user can filter purchase orders by company
    Given I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And a "PurchaseOrder" has been created
    And an additional "PurchaseOrder" has been created
    When I navigate to "/purchaseorders"
    And I click "#toggleFilters"
    And I set the filter to "Company:" then "Test Ltd"
    Then I should see ".removeProp"
    And "#resultsCount" should say "1 record"

  Scenario: A user can filter purchase orders by status
    Given I have the "Administrator" permission
    And a "PurchaseOrder" has been created
    And an additional "PurchaseOrder" has been created
    When I navigate to "/purchaseorders"
    And I click "#toggleFilters"
    And I set the filter to "Status:" then "Requested"
    Then I should see ".removeProp"
    And "#resultsCount" should say "1 record"
