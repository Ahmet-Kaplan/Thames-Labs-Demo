Feature: Allow users to see widgets

  As a user of the app
  I want to see widgets
  So that I can keep track of entities

  Background:
    Given a user exists
    And I am a logged in user
    And I have the "CanReadCompanies" permission
    And I have the "CanReadOpportunities" permission
    And I have the "CanReadProjects" permission
    And I have the "CanReadTasks" permission
    And I have the "CanReadProducts" permission
    And I have the "CanReadPurchaseOrders" permission

    Scenario: A user can see the chatter widget
      When I click "#addWidgetButton"
      And I click "#chat"
      Then I should see "#chatBox"

    Scenario: A user can see the quotation widget
      When I click "#addWidgetButton"
      And I click "#quotation"
      Then I should see "#quotationWidget"

    Scenario: A user can see the online widget
      When I click "#addWidgetButton"
      And I click "#online"
      Then I should see "#onlineWidget"

    Scenario: A user can see the My Tasks widget
      When I click "#addWidgetButton"
      And I click "#task"
      Then I should see "#taskWidget"

    
    Scenario: A user can see the Requested Purchase Orders widget
      Given I am on the pro plan
      When I click "#addWidgetButton"
      And I click "#openPo"
      Then I should see "#openPoBox"

    
    Scenario: A free plan user cannot see the Requested Purchase Orders widget
      Given I am on the free plan
      When I click "#addWidgetButton"
      Then I should not see "#openPo"

    Scenario: A user can see the Tasks Overview widget
      When I click "#addWidgetButton"
      And I click "#taskInformation"
      Then I should see "#taskInformationWidget"

    Scenario: A user can see the opportunities widget
      When I click "#addWidgetButton"
      And I click "#opportunityInformation"
      Then I should see "#opportunityInformationBox"

    Scenario: A user can see the projects widget
      When I click "#addWidgetButton"
      And I click "#projectInformation"
      Then I should see "#projectInformationBox"

    Scenario: A user can see the products widget
      When I click "#addWidgetButton"
      And I click "#productsInformation"
      Then I should see "#productInformationBox"


    Scenario: A user can see the purchase orders Overview widget
      Given I am on the pro plan
      When I click "#addWidgetButton"
      And I click "#poInformation"
      Then I should see "#poInformationBox"


    Scenario: A user on the free plan cannot see the purchase orders Overview widget
      Given I am on the free plan
      When I click "#addWidgetButton"
      Then I should not see "#poInformation"

    Scenario: A user can see the Company Summary widget
      When I click "#addWidgetButton"
      And I click "#companySummary"
      Then I should see "#companySummaryBox"
