import TestCaseRunner from '@cucumber/cucumber/lib/runtime/test_case_runner';
import {
    PickleTag,
    TestStep,
    TestStepResult,
    TestStepResultStatus,
    StepKeywordType,
    PickleStep
} from '@cucumber/messages';

type TestStepResultType = {
    status: string,
    type: string
};

declare global {
    // eslint-disable-next-line no-var
    var config: { softAssertTag?: string };
}

const originIsSkippingSteps = TestCaseRunner.prototype.isSkippingSteps;
// patch isSkippingStep method
TestCaseRunner.prototype.isSkippingSteps = function (this: TestCaseRunner) {
    // @ts-ignore
    const { pickle, testStepResults, testCase, currentTestStepId } = this;

    const activationTag = global?.config?.softAssertTag ?? '@softAssert';
    const isSoftAssertEnabled = pickle.tags.find((tag: PickleTag) => tag.name === activationTag);
    if (!isSoftAssertEnabled) {
        return originIsSkippingSteps.apply(this);
    }

    const testStepResultsTypes = testStepResults.map((result: TestStepResult, i: number): TestStepResultType => {
        const testStep = testCase.testSteps[i];
        const pickleStep = pickle.steps.find((step: TestStep) => step.id === testStep?.pickleStepId);
        return { status: result.status, type: pickleStep?.type }
    });

    const isNotOutcomeFailed = testStepResultsTypes.find((result: TestStepResultType) =>
        result.status !== TestStepResultStatus.PASSED && result.type !== StepKeywordType.OUTCOME
    );
    const currentTestStep = testCase.testSteps.find((step: TestStep) => step.id === currentTestStepId);
    const currentPickleStep = pickle.steps.find((step: PickleStep) => step.id === currentTestStep?.pickleStepId);
    const isCurrentStepOutcome = currentPickleStep?.type === StepKeywordType.OUTCOME;
    if (isCurrentStepOutcome && !isNotOutcomeFailed) {
        return false
    }
    return originIsSkippingSteps.apply(this)
};
