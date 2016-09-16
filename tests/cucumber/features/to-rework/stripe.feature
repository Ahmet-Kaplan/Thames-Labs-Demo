# Testing green under new changes but needs reworking
Feature: Allow users to subscribe/unsubscribe to Stripe

  As a potential user of the app
  I want to upgrade to the paying plan
  So that I can use the full potential of RealtimeCRM

  Background:
    Given I have the "Administrator" permission

  Scenario: An Administrator can see the subscription button and the modal
    When I go to the user settings
    Then I should see "#upScheme"
    When I click "#upScheme"
    Then I should see a modal
    And I click ".close"

  Scenario: An administrator can subscribe by entering the correct card details
    When I go to the user settings 
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "addUserName" to "Another User"
    When I set text field with id "addUserEmail" to "another@domain.com"
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "2021"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see a toastr with the message containing "Validating your card details..."
    And I should see a bootbox
    And I should see a modal with title "Card details accepted"
    Then I click confirm on the modal

  Scenario: After subscribing, an administrator can add a new user
    Given I have subscribed to the paying plan
    When I go to the user settings
    And I click "#add-user"
    And I set text field with id "addUserName" to "Another User"
    And I set text field with id "addUserEmail" to "another@domain.com"
    And I click "#createUser"
    Then I should see a toastr with the message containing "Adding new user..."
    And I should see a bootbox
    And I should see a modal with title "New user added"
    And I click confirm on the modal

  Scenario: When removing the last additional user, the administrator should see the upgrade button
    Given I have subscribed to the paying plan
    And I have an additional user
    When I go to the user settings
    When I click ".list-group-item:nth-of-type(2) #delete-user"
    Then I should see a modal
    When I click confirm on the modal
    Then I should see a "info" toastr with the message "Removing user..."
    And I should see a bootbox
    And I should see a modal with title "User removed"
    When I click confirm on the modal
    Then I should see "#upScheme"

  Scenario: An administrator can update its card details
    Given I have subscribed to the paying plan
    When I go to the billing settings
    Then I should see "#updateCardDetails"
    When I click "#updateCardDetails"
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "2022"
    When I set text field with id "cardCVC" to "741"
    When I click confirm on the modal
    Then I should see a toastr with the message containing "Validating your card details..."
    Then I should see a "success" toastr with the message "Your card details have been updated."
    Then the Stripe field "#cardExpYear" should say "2022"

  Scenario: An administrator can update its email for invoices
    Given I have subscribed to the paying plan
    When I go to the billing settings 
    Then I should see "#updateEmail"
    When I click "#updateEmail"
    When I set text field with selector ".bootbox-input-text" to "newemail@domain.com"
    When I click confirm on the modal
    Then I should see a "info" toastr with the message "Processing your email update"
    When the page is loaded
    Then I should see a "success" toastr with the message "Your email has been changed to: newemail@domain.com"
    Then the Stripe field "#stripeEmail" should say "newemail@domain.com"

  Scenario: An administrator can add a coupon before subscribing
    When I go to the billing settings
    When I click "#updateCoupon"
    Then I should see a modal
    When I set text field with id "couponName" to "chamber"
    When I click "#setCoupon"
    Then I should not see a modal
    And the Stripe field "#couponText" should contain "chamber"

  Scenario: An administrator cannot add a fake coupon
    When I go to the billing settings
    When I click "#updateCoupon"
    Then I should see a modal
    When I set text field with id "couponName" to "fake"
    When I click "#setCoupon"
    Then I should see an "error" toastr
    And I click ".close"

  Scenario: An administrator cannot subscribe with incorrect card Number
    When I go to the user settings 
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "addUserName" to "Another User"
    When I set text field with id "addUserEmail" to "another@domain.com"
    When I set text field with id "cardNumber" to "121212121212121"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "2021"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see an "error" toastr with the message "Your card number is incorrect."
    And I click ".close"

  Scenario: An administrator cannot subscribe with incorrect expiry month
    When I go to the user settings
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "addUserName" to "Another User"
    When I set text field with id "addUserEmail" to "another@domain.com"
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "14"
    When I set text field with id "expYear" to "2021"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see an "error" toastr with the message "Your card's expiration month is invalid."
    And I click ".close"

  Scenario: An administrator cannot subscribe with incorrect expiry year
    When I go to the user settings
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "addUserName" to "Another User"
    When I set text field with id "addUserEmail" to "another@domain.com"
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "1987"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see an "error" toastr with the message "Your card's expiration year is invalid."
    And I click ".close"
