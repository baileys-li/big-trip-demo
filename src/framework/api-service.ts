export type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';

interface LoadConfig {
  url: string;
  method?: Method;
  body?: string | null;
  headers?: Headers;
}

export default class ApiService {
	#endPoint: string;
	#authorization: string;

	constructor(endPoint: string, authorization: string) {
		this.#endPoint = endPoint;
		this.#authorization = authorization;
	}

	async _load({
		url,
		method = 'GET',
		body = null,
		headers = new Headers(),
	}: LoadConfig) {
		headers.append('Authorization', this.#authorization);

		const response = await fetch(
			`${this.#endPoint}/${url}`,
			{method, body, headers},
		);

		try {
			ApiService.checkStatus(response);
		} catch (err) {
			if (err instanceof Error) {
				ApiService.catchError(err);
			}
		}

		return response;
	}


	static parseResponse(response: Response) {
		return response.json();
	}


	static checkStatus(response: Response) {
		if (!response.ok) {
			throw new Error(`${response.status}: ${response.statusText}`);
		}
	}


	static catchError(err: Error) {
		throw err;
	}
}
