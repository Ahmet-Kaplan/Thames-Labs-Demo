Feature: Allow users to subscribe/unsubscribe to Stripe

  As a user of the app
  I can add records if I have the correct subscription

  Background:
    Given a user exists
    And I am a logged in user

  Scenario: When a user has reached the maximum number of subscriptions a message appears when it tries to add company
    Given I have the "Administrator" permission
    Given I have reached the limit of records
    Given toastr are cleared
    When I navigate to "/companies"
    And I click "#add-company"
    And I set text field "name" to "Limit Reached Ltd"
    When I submit the "insertNewCompany" form
    Then I should see a "warning" toastr with the message "You have reached the maximum number of records."
    Then I should see the heading "Limit Reached Ltd"

  Scenario: When a user has reached the maximum number of subscriptions a message appears when it tries to add contact
    Given I have the "Administrator" permission
    Given I have reached the limit of records
    Given toastr are cleared
    When I navigate to "/contacts"
    And I click "#add-contact"
    And I set text field "forename" to "Limit"
    And I set text field "surname" to "Reached"
    When I submit the "insertContact" form
    Then I should see a "warning" toastr with the message "You have reached the maximum number of records."
    Then I should see the heading "Limit Reached"

  Scenario: When a user has reached the maximum number of subscriptions and they are blocked they can't add new records
    Given I have the "Administrator" permission
    Given I have reached the limit of records
    Given I am a blocked user
    Given toastr are cleared
    When I navigate to "/companies"
    And I click "#add-company"
    And I set text field "name" to "Limit Reached Ltd"
    When I submit the "insertNewCompany" form
    Then I should see an "error" toastr with the message "You have reached the maximum number of records and you are not able to add new ones."
    And I should see a modal

  Scenario: When a user has reached the maximum number of subscriptions and they are blocked they can't add new records
    Given I have the "Administrator" permission
    Given I have reached the limit of records
    Given I am a blocked user
    Given toastr are cleared
    When I navigate to "/contacts"
    And I click "#add-contact"
    And I set text field "forename" to "Limit"
    And I set text field "surname" to "Reached"
    When I submit the "insertContact" form
    Then I should see a "error" toastr with the message "You have reached the maximum number of records and you are not able to add new ones."
    And I should see a modal

  Scenario: When a user has reached the maximum number of subscriptions and they are blocked they can delete a record and add a new one
    Given I have the "Administrator" permission
    Given I have reached the limit of records
    Given I am a blocked user
    Given toastr are cleared
    When I navigate to a contact page
    And I click "#remove-contact"
    And I click confirm on the modal
    When I navigate to "/contacts"
    And I click "#add-contact"
    And I set text field "forename" to "Limit"
    And I set text field "surname" to "Reached"
    When I submit the "insertContact" form
    Then I should see a "warning" toastr with the message "You have reached the maximum number of records."
    Then I should see the heading "Limit Reached"

  Scenario: A user can create a project even if blocked
    Given I have the "CanReadProjects" permission
    Given I have the "CanCreateProjects" permission
    Given I have the "CanReadCompanies" permission
    Given I am a blocked user
    Given toastr are cleared
    Given a "Company" has been created
    When I navigate to "/projects"
    And I click "#add-project"
    And I set text field "name" to "test project 2"
    And I set text field "description" to "description of test project 2"
    And I selectize "companyId" to "Test Ltd"
    And I selectize "userId" to "test user"
    And I set text field "value" to "999"
    And I submit the "newProject" form
    Then I should see the heading "test project 2"

  Scenario: A user can create a product even if blocked
    Given I have the "CanReadProducts" permission
    Given I have the "CanCreateProducts" permission
    Given I am a blocked user
    Given toastr are cleared
    When I navigate to "/products"
    And I click "#add-product"
    And I set text field "name" to "test product 2"
    And I set rich text field "description" to "test description"
    And I submit the "insertProduct" form
    And I navigate to a product page
    Then I should see the heading "test product 2"
