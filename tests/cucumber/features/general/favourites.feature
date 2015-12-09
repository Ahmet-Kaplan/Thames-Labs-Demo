Feature: Allow users to favourite pages by URL

  As a user of the app
  I want to save my favourite pages
  So that I can access them quickly

  Background:
    Given a user exists
    And 
    And I am a logged in user

  Scenario: A user can add and delete favourites
    When I click "#collapseFavouritesButton"
    And I click "#mnuAddToFavourites"
    Then "#collapseFavourites" should contain "Dashboard"
    Then I click "#mnuRemoveFavourite"
    Then "#collapseFavourites" should not contain "Dashboard"
