Feature: Application Loading

    Scenario: Invalid Login Users
        Given I open Application
        Then I should see Application
        When I enter the email address as "bharath.shet@7edge.com"
        And I enter password as "Test@123"
        And I submit the login form
        Then I should read a message stating that "Login failed"

    Scenario: Valid Login Users
        Given I open Application
        Then I should see Application
        When I enter the email address as "john@mail.com"
        And I enter password as "changeme"
        And I submit the login form
        Then I should redirect to Product listing screen

    Scenario: Listing Page with pagination
        When I'm in the product listing screen
        Then I should see "ID, Title, Price, Category, Image, Actions"
        When I click on pagination
        Then I should be redirected to the next Page
        When I apply a filter for title as "Classic"
        Then All the titles related to "Classic" should be displayed

    Scenario: Title filter
        When I apply a filter for title as "Classic"
        Then All the titles related to "Classic" should be displayed
    
    Scenario: Logout
        When I Click on Logout Button 
        Then I should redirect to Login Screen
