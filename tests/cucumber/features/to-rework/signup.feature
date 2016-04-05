# Testing green under new changes but needs reworking

Feature: Allow users to sign up to the app

  As a potential user of the app
  I want to sign up
  So that I can utilise the app

  Background:
    Given I am a logged out user
    And I navigate to "/sign-up"

	#Sign up process
	Scenario: A user should sign up with good details
		When I sign up with good details
		Then I am signed up
    And I should see a "success" toastr

	Scenario: A user cannot sign up with bad details
		When I sign up with bad details
		Then I am not signed up

	#Navigation
	Scenario: A user can view the sign up screen
		Then I should see the title "RealTimeCRM - Sign Up"

	Scenario: A normal user is redirected from the sign-up page to dashboard
    Given a user exists
    Given I am a logged in user
    When I navigate to "/sign-up"
    Then I should see the heading "Dashboard"
    And I should see the title "Dashboard"
