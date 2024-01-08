Feature: Feature

  @softAssertTag
  Scenario: verify soft assert
    Then I expect '2' to equal '1'
    And I expect '1' to equal '1'
    And I expect '2' to equal '1'
    And I expect '1' to equal '1'
