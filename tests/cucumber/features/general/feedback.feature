Feature: Allow users to provide feedback

  As a user of the app
  I want to provide feedback to the developers
  So that they can make the app better

  Background:
    Given I am a logged in user

  Scenario: A user can see the feedback modal
    When I navigate to "/"
    And I click "#general-dropdown"
    And I click "#feedback-link"
    Then I should see a modal with title "Feedback"
