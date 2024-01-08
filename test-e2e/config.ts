import Memory from './memory';
import { resolve } from 'path';
export default {
    paths: ['test-e2e/features/*.feature'],
    require: [
        'test-e2e/step_definitions/*.ts'
    ],
    requireModule: [
        resolve('src/index.ts')
    ],
    softAssertTag: '@softAssertTag',
    memory: new Memory(),
    defaultTimeout: 20000,
    parallel: 1
}
