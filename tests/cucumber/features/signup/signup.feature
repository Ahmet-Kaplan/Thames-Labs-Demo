Feature: Allow users to sign up to the app

	As a potential user of the app
	I want to sign up
	So that I can utilise the app
	
	Background:
		Given I am a new user
		And I navigate to "/sign-up"
	
	@ignore	
	Scenario: A user can view the sign up screen
		Then I should see the title "RealTimeCRM - Sign Up"
		
	@ignore	
	Scenario: A user should sign up with good details
		When I enter good details
		Then I should be signed up
		Then there should be a new tenant
		Then I should be redirected to the dashboard
		
	@ignore	
	Scenario: A user cannot sign up with bad details
		When I enter bad details
		Then I should see an error message
		