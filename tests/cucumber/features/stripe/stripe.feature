
Feature: Allow users to subscribe/unsubscribe to Stripe

  As a potential user of the app
  I want to upgrade to the paying plan
  So that I can use the full potential of RealtimeCRM

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "Administrator" permission

  Scenario: An Administrator can see the subscription button and the modal
    When I navigate to "/admin"
    Then I should see "#stripeAdminPanel"
    Then I should see "#upScheme"
    When I click "#upScheme"
    Then I should see a modal

  Scenario: An administrator can subscribe by entering the correct card details
    When I navigate to "/admin"
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "2021"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see a toastr with the message "Validating your card details..."
    Then I should see a bootbox
    Then I should see a modal with title "Subscription complete"
    Then I quit the bootbox
    Then "planName" should say "Paying"

  Scenario: An administrator can unsubscribe from the Paying scheme
    Given I have subscribed to the paying plan
    When I navigate to "/admin"
    Then I should see "#downScheme"
    When I click "#downScheme"
    Then I should see a modal
    When I click confirm on the modal
    Then I should see a toastr with the message "Processing your changes..."
    Then I should see a bootbox
    Then I should see a modal with title "Subscription updated"
    Then I quit the bootbox
    Then "planName" should say "Free"

  Scenario: An administrator can resubscribe to the Paying scheme
    Given I have subscribed to the paying plan
    Given I have unsubscribed from the paying plan
    When I navigate to "/admin"
    Then I should see "#reUpScheme"
    When I click "#reUpScheme"
    Then I should see a modal
    When I click confirm on the modal
    Then I should see a toastr with the message "Processing your subscription."
    Then I should see a bootbox
    Then I should see a modal with title "Subscription complete"
    Then I quit the bootbox
    Then "planName" should say "Paying"

  Scenario: An administrator can update its card details and resubscribe to the Paying scheme
    Given I have subscribed to the paying plan
    Given I have unsubscribed from the paying plan
    When I navigate to "/admin"
    Then I should see "#reUpScheme"
    When I click "#reUpScheme"
    Then I should see a modal
    Then I should see "#updateCardDetails"
    When I click "#updateCardDetails"
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "2022"
    When I set text field with id "cardCVC" to "741"
    When I click confirm on the modal
    Then I should see a toastr with the message "Validating your card details..."
    Then I should see "#resubscribe"
    When I click "#resubscribe"
    Then I should see a toastr with the message "Processing your subscription."
    Then I should see a bootbox
    Then I should see a modal with title "Subscription complete"
    Then I quit the bootbox
    Then "planName" should say "Paying"

  Scenario: An administrator cannot subscribe with incorrect card Number
    When I navigate to "/admin"
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "cardNumber" to "121212121212121"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "2021"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see an error toastr with the message "Your card number is incorrect."

  Scenario: An administrator cannot subscribe with incorrect expiry month
    When I navigate to "/admin"
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "14"
    When I set text field with id "expYear" to "2021"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see an error toastr with the message "Your card's expiration month is invalid."

  Scenario: An administrator cannot subscribe with incorrect expiry year
    When I navigate to "/admin"
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "1987"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see an error toastr with the message "Your card's expiration year is invalid."

  Scenario: An administrator cannot subscribe with incorrect CVC
    When I navigate to "/admin"
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "2020"
    When I set text field with id "cardCVC" to "abc"
    When I click confirm on the modal
    Then I should see an error toastr with the message "Your card's security code is invalid."
