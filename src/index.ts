import aw1 from '@mmstudio/aw000001';

export default function get(mm: aw1, key: string, default_value?: string) {
	return mm.data.params[key] || default_value;
}
