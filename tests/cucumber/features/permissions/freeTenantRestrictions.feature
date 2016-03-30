Feature: Restrict free users from certain features
  As a user
  I should not be able to use certain features
  Until I upgrade

  Background:
    Given a free user exists
    And I am a logged in user

  Scenario: A free user should not be able to add more than 5 global entity fields
    Given I have the "Administrator" permission
    And a global custom field has been created with the name "GEI1"
    And a global custom field has been created with the name "GEI2"
    And a global custom field has been created with the name "GEI3"
    And a global custom field has been created with the name "GEI4"
    And a global custom field has been created with the name "GEI5"
    And I navigate to "/admin"
    And I click "#globCustomFieldsExpander"
    And I click "#addGlobalCustomField"
    And I set text field with id "custom-field-name" to "test"
    And I set text field with id "custom-field-text-value" to "test value"
    And I selectize "select-entity" to "Company"
    And I click "#createCustomField"
    Then I should see a "warning" toastr

  # There was a test for companies house "legal information" but since this relies on
  # an entered company matching on an external API it was removed
  # Possibly we should rework the restriction so something is visible even if no result matches

  Scenario: A free user should not be able to access the event log
    Given I have the "CanReadEventLog" permission
    And I click "#menuLinkEventLog"
    Then I should see a "warning" toastr

  Scenario: A free user should not be able to see purchase orders
    Given I have the "CanReadPurchaseOrders" permission
    And I click "#menuLinkPurchaseOrders"
    Then I should see a "warning" toastr

  Scenario: A free user should not be able to see the activities list
    When I click "#menuLinkActivities"
    Then I should see a "warning" toastr

  Scenario: A free user should not be able to create or manage project milestones or types
    Given I have the "Administrator" permission
    And I navigate to "/admin"
    And I click "#projectAdminExpander"
    When I click "#addProjectType"
    Then I should see a "warning" toastr

  Scenario: A free user should not be able to access the sales pipeline
    Given I have the "CanReadOpportunities" permission
    And I click "#menuLinkSalespipeline"
    Then I should see a "warning" toastr

  Scenario: A free user should not be able to set permissions
    Given I have the "Administrator" permission
    And I navigate to "/admin"
    And I click "#userAdminPanelExpander"
    And I click "#btnEditTenantUserPermissions"
    Then I should see a "warning" toastr

  Scenario: A free user should not be able to add more that two users
    Given an additional user exists
    And I have the "Administrator" permission
    And I navigate to "/admin"
    And I click "#userAdminPanelExpander"
    And I click "#addNewUserAccount"
    Then I should see a "warning" toastr
