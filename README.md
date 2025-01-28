# @qavajs/soft-assertion
Soft assertions for qavajs frameworks

## Installation
`npm install @qavajs/soft-assertion`

## Usage
   
Add module to requireModule.
```javascript
module.exports = {
    default: {
        requireModule: [
            '@qavajs/soft-assertion/index.js'
        ]
    }
}
```

Now you can use `softly` prefix before expect.
```gherkin
Feature: Feature

  Scenario: verify soft assert
    # first step fails but other steps will not be skipped
    Then I softly expect '2' to equal '1'
    # pass
    And I expect '1' to equal '1'
    # fail
    And I expect '2' to equal '1'
    # skip
    And I expect '1' to equal '1'
```
