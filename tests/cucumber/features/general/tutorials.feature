Feature: Allow users to take tutorials

  As a user of the app
  I want to take tutorials for certain parts of the app
  So that I can quickly learn how to use it

  Background:
    Given a user exists

#Starting
  Scenario: A user can take the welcome tour from the help menu
    Given I am not a new user
    And I am a logged in user
    When I click "#help-menu"
    And I click "#start-welcome-tour"
    Then I should see the tour

  Scenario: A user can take the welcome tour from the welcome Modal
    Given I am a logged in user
    When I click "#first-run-tour"
    Then I should not see a modal
    Then I should see the tour

  Scenario: A user can take the company tutorial from the help menu
    Given I am not a new user
    And I am a logged in user
    And I have the "CanReadCompanies" permission
    And I have the "CanCreateCompanies" permission
    When I click "#help-menu"
    And I click "#start-company-tutorial"
    Then I should see the tutorial

  Scenario: A user can take the company tutorial from the welcome modal
    Given I am a logged in user
    And I have the "CanReadCompanies" permission
    And I have the "CanCreateCompanies" permission
    Then I should see a modal
    When I click "#companies-tutorial"
    Then I should not see a modal
    Then I should see the tour

  Scenario: A user can take the contact tutorial from the help menu
    Given I am not a new user
    And I am a logged in user
    And I have the "CanReadContacts" permission
    And I have the "CanCreateContacts" permission
    When I click "#help-menu"
    And I click "#start-contacts-tutorial"
    Then I should see the tutorial

  Scenario: A user can take the contact tutorial from the welcome modal
    Given I am a logged in user
    And I have the "CanReadContacts" permission
    And I have the "CanCreateContacts" permission
    Then I should see a modal
    When I click "#contacts-tutorial"
    Then I should not see a modal
    Then I should see the tour

#Closing
  Scenario: A user can close the welcome tour and the end modal will shown
    Given I am a logged in user
    And I have the "CanReadContacts" permission
    And I have the "CanCreateContacts" permission
    Then I should see a modal
    When I click "#first-run-tour"
    Then I should not see a modal
    And I should see the tour
    And I click "#menuLinkContacts"
    Then I should see a modal

  Scenario: A user can close the company tutorial and the end modal will shown
    Given I am a logged in user
    And I have the "CanReadCompanies" permission
    And I have the "CanCreateCompanies" permission
    Then I should see a modal
    When I click "#companies-tutorial"
    Then I should not see a modal
    And I should see the tour
    And I click "#menuLinkCompanies"
    Then I should see a modal

  Scenario: A user can close the contact tutorial and the end modal will shown
    Given I am a logged in user
    And I have the "CanReadContacts" permission
    And I have the "CanCreateContacts" permission
    Then I should see a modal
    When I click "#contacts-tutorial"
    Then I should not see a modal
    And I should see the tour
    And I click "#menuLinkContacts"
    Then I should see a modal
