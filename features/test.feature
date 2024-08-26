Feature: Application Loading
    Scenario: Test
        Given I open Application
        Then I should see Application
        When I enter the email address as "bharath.shet@7edge.com"
        And I enter password as "Test@123"
        And I submit the login form
        Then I should read a message stating that "Login failed"