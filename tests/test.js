import { expect } from 'chai';
import t from '../dist/index';

describe('ajax', () => {
	it('post', async () => {
		window.host = 'http://127.0.0.1:8889';
		const r = await t('test', { foo: 'bar' });
		expect(r).eq('mmstudio');
	});
});
