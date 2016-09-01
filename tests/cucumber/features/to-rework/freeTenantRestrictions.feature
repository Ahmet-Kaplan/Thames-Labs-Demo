# Testing green under new changes but needs reworking
Feature: Restrict free users from certain features
  As a user
  I should not be able to use certain features
  Until I upgrade

  Scenario: A free user should see the upgrade modal when trying to add a new user
    Given I have the "Administrator" permission
    When I navigate to "/settings/users"
    And I click "#add-user"
    Then I should see a modal with the title "Add user"
    And I should see "#cardNumber"
