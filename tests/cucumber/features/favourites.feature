@ignore
Feature: Allow users to favourite pages by URL

  As a user of the app
  I want to save my favourite pages
  So that I can access them quickly

  Scenario: A user can add and delete favourites
    Given I am viewing the dashboard
    When I add the current page as a favourite
    Then "Dashboard" should be in the list of favourites
    When I remove "Dashboard" from the list of favourites
    Then "Dashboard" should not be in the list of favourites
