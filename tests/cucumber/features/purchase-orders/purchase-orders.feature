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
    And I am on the pro plan
    And I have the "CanReadPurchaseOrders" permission
    When I navigate to "/purchaseorders"
    Then I should see the heading "Purchase Orders"

  Scenario: A user should not be able to see purchase orders created by a user under another tenant
    Given a "PurchaseOrder" has been created
    And I am on the pro plan
    And a second tenant exists
    And the second tenant is on the pro plan
    And a second user exists
    And I click "#menuLinkPurchaseOrders"
    Then I should see "#list-item"
    And I log out
    And I log in as a second tenant user
    And I have the "CanReadPurchaseOrders" permission
    And I click "#menuLinkPurchaseOrders"
    Then I should not see "#list-item"

  Scenario: A user can add a new purchase order to a company
    Given I am a logged in user
    And I am on the pro plan
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I click "#menuLinkPurchaseOrders"
    And I click "#add-purchase-order"
    And I set text field with selector "#description" to "test purchase order"
    And I selectize "supplierCompanyId" to "Test Ltd"
    And I click "#create-purchase-order"
    Then I should see the heading "test purchase order"

  Scenario: A user can edit a purchase order
    Given I am a logged in user
    And I am on the pro plan
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanEditPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I click "#menuLinkPurchaseOrders"
    And a "PurchaseOrder" has been created
    And I click "#list-item"
    Then I click "#edit-purchase-order"
    And I set textarea "description" to "new purchase order"
    And I click "#update-purchase-order"
    Then I should see the heading "new purchase order"

  Scenario: A user can delete a purchase order
    Given I am a logged in user
    And I am on the pro plan
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanDeletePurchaseOrders" permission
    And I click "#menuLinkPurchaseOrders"
    And a "PurchaseOrder" has been created
    And I click "#list-item"
    And I click "#remove-purchase-order"
    And I click confirm on the modal
    Then I should not see "#po-item"

  Scenario: A user can add a new items to a purchase order
    Given I am a logged in user
    And I am on the pro plan
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanEditPurchaseOrders" permission
    And I click "#menuLinkPurchaseOrders"
    And a "PurchaseOrder" has been created
    And I click "#list-item"
    Then I click "#add-item"
    And I set text field with selector "#description" to "test item"
    And I set text field with selector "#code" to "test00001"
    And I set text field with selector "#itemValue" to "4.00"
    And I set text field with selector "#currQuant" to "4.00"
    And I click "#add-item-to-po"
    Then element "#purchase-order-items" should contain the text "test item"

  Scenario: A user can edit an existing purchase order item
    Given I am a logged in user
    And I am on the pro plan
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanEditPurchaseOrders" permission
    And I click "#menuLinkPurchaseOrders"
    And a "PurchaseOrder" has been created
    And I click "#list-item"
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
    And I am on the pro plan
    And a "Company" has been created
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanCreatePurchaseOrders" permission
    And I have the "CanEditPurchaseOrders" permission
    And I click "#menuLinkPurchaseOrders"
    And a "PurchaseOrder" has been created
    And I click "#list-item"
    Then I click "#add-item"
    And I set text field with selector "#description" to "test item"
    And I set text field with selector "#code" to "test00001"
    And I set text field with selector "#itemValue" to "4.00"
    And I set text field with selector "#currQuant" to "4.00"
    And I click "#add-item-to-po"
    And I click "#removePurchaseOrderItem"
    And I click confirm on the modal
    Then element "#purchase-order-items" should contain the text "No items"

  Scenario: A user can see the purchase orders overview
    Given I am on the pro plan
    And I click "#menuLinkPurchaseOrders"
    And I click "#ref_poOverviewWidget"
    Then I should see "#poOverviewPop"

  #Activities
  Scenario: A user can add, edit and delete an activity
    Given I am a logged in user
    And I am on the pro plan
    And I have the "CanReadCompanies" permission
    And I have the "CanReadPurchaseOrders" permission
    And I have the "CanEditPurchaseOrders" permission
    And a "PurchaseOrder" has been created
    And I click "#menuLinkPurchaseOrders"
    And I click "#list-item"
    And I click "#general-dropdown"
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
    And I am on the pro plan
    And I have the "CanReadPurchaseOrders" permission
    And a "PurchaseOrder" has been created
    And an additional "PurchaseOrder" has been created
    And I click "#menuLinkPurchaseOrders"
    And I set the filter to "Company:" then "Test Ltd"
    Then I should see ".removeProp"
    And "#resultsCount" should say "1 record"

  Scenario: A user can filter purchase orders by status
    Given I have the "Administrator" permission
    And I am on the pro plan
    And a "PurchaseOrder" has been created
    And an additional "PurchaseOrder" has been created
    And I click "#menuLinkPurchaseOrders"
    And I set the filter to "Status:" then "Requested"
    Then I should see ".removeProp"
    And "#resultsCount" should say "1 record"

  #Notifications
  Scenario: A user should see a notification when status is set to "Approved"
    Given I am on the pro plan
    And I have the "CanEditPurchaseOrders" permission
    And a "PurchaseOrder" has been created
    When I click "#menuLinkPurchaseOrders"
    And I click "#list-item"
    And I click "#edit-purchase-order"
    And I select "Approved" from dropdown field "status"
    And I click "#update-purchase-order"
    Then I should see "#notifications-menu"
    When I click "#notifications-menu"
    Then I should see "#notification"

  Scenario: A user should see a notification when status is set to "Rejected"
    Given I am on the pro plan
    And I have the "CanEditPurchaseOrders" permission
    And a "PurchaseOrder" has been created
    When I click "#menuLinkPurchaseOrders"
    And I click "#list-item"
    And I click "#edit-purchase-order"
    And I select "Rejected" from dropdown field "status"
    And I click "#update-purchase-order"
    Then I should see "#notifications-menu"
    When I click "#notifications-menu"
    Then I should see "#notification"

  Scenario: A user can remove a notification
    Given I am on the pro plan
    And I have the "CanEditPurchaseOrders" permission
    And a "PurchaseOrder" has been created
    When I click "#menuLinkPurchaseOrders"
    And I click "#list-item"
    And I click "#edit-purchase-order"
    And I select "Rejected" from dropdown field "status"
    And I click "#update-purchase-order"
    Then I should see "#notifications-menu"
    When I click "#notifications-menu"
    And I click "#notification"
    And I click "#removeNotification"
    And I wait
    Then I should see "#notifications-menu"
    When I click "#notifications-menu"
    Then ".dropdown-menu" should contain "No notifications"