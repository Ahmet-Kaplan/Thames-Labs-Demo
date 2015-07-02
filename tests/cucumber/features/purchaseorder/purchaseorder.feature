Feature: Purchase orders

  As a user of the app
  I want to be able to add, edit and delete purchase orders
  So that I can manage the purchasing in my business

  @dev
  Scenario: A user can view the purchase order list
    Given I am a logged in user
    When I navigate to "/purchaseorders"
    Then I should see a list of purchase orders
