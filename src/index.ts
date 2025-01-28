import TestCaseRunner from '@cucumber/cucumber/lib/runtime/test_case_runner';
import { TestStepResultStatus } from '@cucumber/messages';
import { BeforeStep, Then } from '@cucumber/cucumber';

type ExtendedTestRunner = Partial<TestCaseRunner> & {
    testStepResults: any[];
}

TestCaseRunner.prototype.isSkippingSteps = function (this: ExtendedTestRunner) {
    return this.testStepResults.some(stepResult => {
        return stepResult.status !== TestStepResultStatus.PASSED
          && !!stepResult.exception
          && stepResult.exception.type !== 'SoftAssertionError'
    });
}

class SoftAssertionError extends Error {
    name = 'SoftAssertionError';
}

let currentStep: string;
BeforeStep(async function(data) {
    currentStep = data.pickleStep.text;
});

Then(/softly expect/, async function() {
    const stepText = currentStep.replace('softly expect', 'expect');
    try {
        await this.executeStep(stepText);
    } catch (err: any) {
        throw new SoftAssertionError(err.message);
    }
});