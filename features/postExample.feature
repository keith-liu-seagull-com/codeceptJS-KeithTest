Feature: Simple POST example

  Scenario: Valid a simple post
    Given I have valid credentials
    When I send a post request to "/api/actions?wait=30s&messageCount=100&messageSeverity=Info" with the next json body:
    """
    - CreateFolderAction:

         Folder: librarian://Main/Marina/TestFolder

         OverwriteFileOperation: Replace

         Name: Create Unique Folder
    """
    Then I expect a value 200


