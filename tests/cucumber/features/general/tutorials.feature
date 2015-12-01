Feature: Allow users to take tutorials

  As a user of the app
  I want to take tutorials for certain parts of the app
  So that I can quickly learn how to use it

  Background:
    Given a user exists
    Given I am a logged in user

#Starting
  Scenario: A user can take the welcome tour from the welcome Modal
    Given I click "#first-run-tour"
    Then I should not see a modal
    Then I should see the tour

  Scenario: A user can take the company tutorial from the welcome modal
    Given I have the "CanReadCompanies" permission
    And I have the "CanCreateCompanies" permission
    Then I should see a modal
    When I click "#companies-tutorial"
    Then I should not see a modal
    Then I should see the tour

  Scenario: A user can take the contact tutorial from the welcome modal
    Given I have the "CanReadContacts" permission
    And I have the "CanCreateContacts" permission
    Then I should see a modal
    When I click "#contacts-tutorial"
    Then I should not see a modal
    Then I should see the tour

#Closing
  Scenario: A user can close the welcome tour and the end modal will show
    Given I have the "CanReadContacts" permission
    And I have the "CanCreateContacts" permission
    Then I should see a modal
    When I click "#first-run-tour"
    Then I should not see a modal
    And I should see the tour
    And I click "#menuLinkContacts"
    Then I should see a modal

  Scenario: A user can close the company tutorial and the end modal will show
    Given I have the "CanReadCompanies" permission
    And I have the "CanCreateCompanies" permission
    Then I should see a modal
    When I click "#companies-tutorial"
    Then I should not see a modal
    And I should see the tour
    And I click "#menuLinkCompanies"
    Then I should see a modal

  Scenario: A user can close the contact tutorial and the end modal will show
    Given I have the "CanReadContacts" permission
    And I have the "CanCreateContacts" permission
    Then I should see a modal
    When I click "#contacts-tutorial"
    Then I should not see a modal
    And I should see the tour
    And I click "#menuLinkContacts"
    Then I should see a modal
