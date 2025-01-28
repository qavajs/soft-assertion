import { BeforeStep, Then } from "@cucumber/cucumber";
import { equal } from 'node:assert';

Then('I expect {string} to equal {string}', function (left: string, right: string) {
    equal(left, right);
});