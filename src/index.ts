import global from '@mmstudio/global';

function generate_request_url(url: string, query_param = {} as {
	[key: string]: string;
}) {
	const [base, query] = url.split('?');

	const usp = new URLSearchParams(query);
	for (const k in query_param) {
		usp.set(k, query_param[k]);	// this will override query
	}
	// const query = usp.toString();
	// const cacheBust = String(Date.now());
	// query += query ? `&${cacheBust}` : cacheBust;

	const q = usp.toString();
	if (q) {
		return `${base}?${q}`;
	}
	return base;
}

export default async function post<T = object>(url: string, data?: string | FormData, query?: {
	[key: string]: string;
}) {
	if (!/^(http|https):\/\//i.test(url)) {
		url = `${global('host', '.')}/${url}`; // 相对路径  例如：url='./user-login'时
	}
	const request_url = generate_request_url(url, query);

	const res = await fetch(request_url, {
		method: 'POST',
		body: data
	});
	const content_type = res.headers.get('Content-type');
	if (res.status > 0 && res.status < 400) {
		if (content_type && /json/i.test(content_type)) {
			return await res.json() as T;
		}
		return res.text() as unknown as T;
	}
	throw new Error(res.statusText);
}
