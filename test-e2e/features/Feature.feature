Feature: Feature

  Scenario: verify soft assert
    Then I softly expect '2' to equal '1'
    And I expect '1' to equal '1'
    And I expect '2' to equal '1'
    And I expect '1' to equal '1'
