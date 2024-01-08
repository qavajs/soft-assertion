# @qavajs/soft-assertion
Soft assertions for qavajs frameworks

## Installation
`npm install @qavajs/soft-assertion`

## Usage
   
Add module to requireModule and set activation tag (default is _@softAssert_). 
Soft assertion change behavior of CucumberJS and _Then_ steps will not cause test case failure.
```javascript
module.exports = {
    default: {
        requireModule: [
            '@qavajs/soft-assertion'
        ],
        softAssertTag: '@softAssert' 
    }
}
```

```gherkin
Feature: Feature

  @softAssert
  Scenario: verify soft assert
    # first step fails but other steps will not be skipped
    Then I expect '2' to equal '1'
    # pass
    And I expect '1' to equal '1'
    # fail
    And I expect '2' to equal '1'
    # pass
    And I expect '1' to equal '1'
```
