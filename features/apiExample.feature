Feature: Simple GET example

  Scenario: Valid a simple get
    Given I have valid credentials
    When I send a get request to "/api/actions?wait=30s&messageCount=100&messageSeverity=Info" endpoint
    Then I expect a value 200
    And I expect a "RanToCompletion" in "Status" field
