import global from '@mmstudio/global';

function generate_request_url(url: string, query_param = {} as {
	[key: string]: string;
}) {
	const usp = new URLSearchParams();
	for (const k in query_param) {
		usp.append(k, query_param[k]);
	}
	const query = usp.toString();
	// const cacheBust = String(Date.now());
	// query += query ? `&${cacheBust}` : cacheBust;

	const separator = url.includes('?') ? '&' : '?';
	return query ? url + separator + query : url;
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
