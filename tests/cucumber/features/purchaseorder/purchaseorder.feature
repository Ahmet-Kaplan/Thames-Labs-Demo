Feature: Purchase orders

  As a user of the app
  I want to be able to add, edit and delete purchase orders
  So that I can manage the purchasing in my business

  Background:
    Given I am a logged in user

  @dev
  Scenario: A user can view the purchase order list
    When I navigate to "/purchaseorders"
    Then I should see a list of purchase orders

  @dev
  Scenario: A user can add a purchase order
    When I navigate to "/purchaseorders"
    And I add a new purchase order
    Then I should see the purchase order in the list
