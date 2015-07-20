Feature: Allow administrators to view new user signups

  As an administrator of the app
  I want to view signups
  So that I can see how well the app is performing

  Background:
    Given I am a logged in superadmin user
    
  @dev
  Scenario: A superadmin can see a signup chart
    When I navigate to "/statistics"
    Then I should see a signup chart
