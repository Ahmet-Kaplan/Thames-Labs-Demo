Feature: Allow users to see maps

  As a user of the app
  I should see the maps when I go to contacts or company

  Background:
    Given a user exists
    Given I am a logged in user

###################### Maps for Company ######################
  Scenario: A user can do a location search and see the map when creating a company
    Given I have the "CanReadCompanies" permission
    Given I have the "CanCreateCompanies" permission
    When I navigate to "/companies"
    And I click "#createCompany"
    And I search for Cowley Road
    Then the field "postcode" should contain "CB4"
    And I should see a map

  Scenario: A user can see the map on a company's page
    Given I have the "CanReadCompanies" permission
    Given I have the "CanCreateCompanies" permission
    Given a company has been created
    When I navigate to a company page
    Then I should see the heading "Address"
    And I should see a map

  Scenario: A user can do a location search and see the map when editing a company's details
    When I navigate to a company page
    And I click "#edit-company"
    And I leftclick "#show-map"
    When I search for Cowley Road
    Then the field "postcode" should contain "CB4"
    #And I should see a map

###################### Maps for Contacts ######################

  Scenario: A user can see the map on a contact's page
    When I navigate to a contact page
    Then I should see the heading "Address"
    And I should see a map
@ignore
  Scenario: A user can do a location search and see the map when creating a contact
    When I navigate to "/contacts"
    And I click "#add-contact"
    And I search for Cowley Road
    Then the field "postcode" should contain "CB4"
    And I should see a map
@ignore
  Scenario: A user CAN see the address fields for a contact NOT belonging to a company
    When I navigate to a contact page
    And I click "#edit-contact"
    Then I should see the address fields
@ignore
  #This step must be AFTER the similar scenario for the contact NOT belonging to a company.
  #The user created in the Background doesn't belong to a company and is thus needed for it
  #whereas the following test creates a contact belonging to a company.
  #The order is to avoid error while running the previous test
  Scenario: A user CANNOT see the address fields for a contact belonging to a company
    When I navigate to "/contacts"
    And I create a new contact belonging to a company
    And I click "#edit-contact"
    Then I should not see the address fields
