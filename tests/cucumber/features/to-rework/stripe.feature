# Testing green under new changes but needs reworking
Feature: Allow users to subscribe/unsubscribe to Stripe

  As a potential user of the app
  I want to upgrade to the paying plan
  So that I can use the full potential of RealtimeCRM

  Background:
    Given I have the "Administrator" permission

  Scenario: An Administrator can see the subscription button and the modal
    When I navigate to "/settings/billing"
    Then I should see "#upScheme"
    When I click "#upScheme"
    Then I should see a modal

  Scenario: An administrator can subscribe by entering the correct card details
    When I navigate to "/settings/billing"
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "2021"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see a toastr with the message containing "Validating your card details..."
    Then I should see a bootbox
    Then I should see a modal with title "Subscription complete"
    When I click confirm on the modal
    Then the Stripe field "#planName" should say "Pro Plan (GBP)"

  Scenario: An administrator can unsubscribe from the Paying scheme
    Given I have subscribed to the paying plan
    When I navigate to "/settings/billing"
    Then I should see "#downScheme"
    When I click "#downScheme"
    Then I should see a modal
    When I click confirm on the modal
    Then I should see a toastr with the message containing "Processing your changes..."
    Then I should see a bootbox
    Then I should see a modal with title "Subscription updated"
    When I click confirm on the modal
    Then the Stripe field "#planName" should say "Free Plan"

  Scenario: An administrator can resume to the Paying scheme
    Given I have subscribed to the paying plan
    Given I have unsubscribed from the paying plan
    When I navigate to "/settings/billing"
    Then I should see "#resumeSubs"
    When I click "#resumeSubs"
    Then I should see a modal
    When I click confirm on the modal
    Then I should see a bootbox
    When I click confirm on the modal
    Then the Stripe field "#planName" should say "Pro Plan (GBP)"

  Scenario: An administrator can update its card details
    Given I have subscribed to the paying plan
    When I navigate to "/settings/billing"
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
    When I navigate to "/settings/billing"
    Then I should see "#updateEmail"
    When I click "#updateEmail"
    When I set text field with selector ".bootbox-input-text" to "newemail@domain.com"
    When I click confirm on the modal
    Then I should see a "info" toastr with the message "Processing your email update"
    When the page is loaded
    Then I should see a "success" toastr with the message "Your email has been changed to: newemail@domain.com"
    Then the Stripe field "#stripeEmail" should say "newemail@domain.com"

  Scenario: An administrator can add a coupon before subscribing
    When I navigate to "/settings/billing"
    When I click "#updateCoupon"
    Then I should see a modal
    When I set text field with id "couponName" to "chamber"
    When I click "#setCoupon"
    Then the Stripe field "#couponText" should say "chamber: 50 % off"
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "2021"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see a toastr with the message containing "Validating your card details..."
    Then I should see a bootbox
    Then I should see a modal with title "Subscription complete"
    When I click confirm on the modal
    Then the Stripe field "#planName" should say "Pro Plan (GBP)"

  Scenario: An administrator cannot add a fake coupon
    When I navigate to "/settings/billing"
    When I click "#updateCoupon"
    Then I should see a modal
    When I set text field with id "couponName" to "fake"
    When I click "#setCoupon"
    Then I should see an "error" toastr

  Scenario: An administrator cannot subscribe with incorrect card Number
    When I navigate to "/settings/billing"
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "cardNumber" to "121212121212121"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "2021"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see an "error" toastr with the message "Your card number is incorrect."

  Scenario: An administrator cannot subscribe with incorrect expiry month
    When I navigate to "/settings/billing"
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "14"
    When I set text field with id "expYear" to "2021"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see an "error" toastr with the message "Your card's expiration month is invalid."

  Scenario: An administrator cannot subscribe with incorrect expiry year
    When I navigate to "/settings/billing"
    When I click "#upScheme"
    Then I should see a modal
    When I set text field with id "cardNumber" to "4242424242424242"
    When I set text field with id "expMonth" to "01"
    When I set text field with id "expYear" to "1987"
    When I set text field with id "cardCVC" to "123"
    When I click confirm on the modal
    Then I should see an "error" toastr with the message "Your card's expiration year is invalid."
