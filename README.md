# @qavajs/soft-assertion
Module that enables soft assertions in qavajs framework

## Installation
`npm install @qavajs/soft-assertion`

## Usage
   
Add module to requireModule and set activation tag (default is @softAssert). 
Soft assertion change behavior of Cucumber and Then steps will not cause test case failure.
```javascript
module.exports = {
    default: {
        requireModule: [
            '@qavajs/soft-assertion'
        ],
        softAssertTag: '@yourTag' 
    }
}

```
