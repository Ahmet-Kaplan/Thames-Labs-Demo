Feature: Allow users to sign up to the app

	As a potential user of the app
	I want to sign up
	So that I can utilise the app

	Background:
		Given I am a logged out user
		And I navigate to "/sign-up"

	Scenario: A user can view the sign up screen
		Then I should see the title "RealTimeCRM - Sign Up"
@dev
	Scenario: A user should sign up with good details
		When I sign up with good details
		Then I am signed up

	Scenario: A user cannot sign up with bad details
		When I sign up with bad details
		Then I am not signed up
