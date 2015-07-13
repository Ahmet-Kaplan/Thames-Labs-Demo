Feature: User-specific tasks on dashboard

  As a user of the app
  I want to see my personal tasks
  So that I know what I am doing today

  Background:
    Given I am a logged in user

  Scenario: A user can see the tasks container
    Then I see the task container

  Scenario: A user can see an empty list of items in the task container
    Then I see an empty task list

  Scenario: A user can create a personal task
    When I create a new task
    Then I see the task in the task list
