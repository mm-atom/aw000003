import { expect } from 'chai';
import t from '../dist/index';

describe('get url param', () => {
	it('without default', () => {
		const mm = {
			data: {
				params: {
					foo: 'bar'
				}
			}
		};
		const r = t(mm, 'foo', 'mmstudio');
		expect(r).eq('bar');
	});
	it('with default', () => {
		const mm = {
			data: {
				params: {
				}
			}
		};
		const r = t(mm, 'foo', 'bar');
		expect(r).eq('bar');
	});
});
