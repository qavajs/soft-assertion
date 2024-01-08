import { test, vi } from 'vitest';
import * as cucumber from '@cucumber/cucumber';

vi.mock('@cucumber/cucumber');

test('should import index', async () => {
    await import('../index.js');
});
