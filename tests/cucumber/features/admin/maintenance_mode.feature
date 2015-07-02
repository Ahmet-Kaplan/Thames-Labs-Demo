Feature: Enable superadmin to put the site into maintenance mode

  As a superadmin
  I want to be able to put the site into maintenance mode
  So that I can lock users out while I make changes

  @dev
  Scenario: An admin can put the site into maintenance mode and still work
    Given I am a superadmin
    When I activate maintenance mode
    Then I see the site as normal

  @dev
  Scenario: A normal user cannot put the site into maintenance mode
    Given I am a new user
    When I activate maintenance mode
    Then I see the site as normal

  @dev
  Scenario: A normal user can't see the site in maintenance mode
    Given a superadmin has put the site into maintenance mode
    And I am a new user
    When I navigate to "/"
    Then I see a spinner
