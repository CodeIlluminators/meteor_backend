/**
 * A function type that takes a string item and returns a value of type T.
 *
 * @template T - The type of the value returned by the callback function.
 * @param item - The string item to process.
 * @returns The processed value of type T.
 */
export type ValueCallback<T> = (item: string) => T;

/**
 * A type for an object where the keys are strings and the values are of type T.
 *
 * @template T - The type of the values in the object.
 */
export type ValueCallbackIndexable<T> = Record<string, T>;

/**
 * Options to configure the behavior of the arrayToDict function.
 */
export interface ArrayToDictOptions {
	/**
	 * Whether the valueCallback should be treated as an indexable object.
	 *
	 * @default false
	 */
	isValueCallbackIndexable?: boolean;
	/**
	 * Whether to use the item itself as the key in the dictionary.
	 *
	 * @default false
	 */
	useItemAsKey?: boolean;
}

/**
 * The type for the result of the arrayToDict function.
 *
 * @template T - The type of the values in the resulting dictionary.
 */
export type ArrayToDictResult<T> = Record<string | number, T>;

/**
 * A record type for metadata headers containing arrays of request and response headers.
 */
export type MetaDataHeadersRecord = {
	/**
	 * An array of strings representing request headers.
	 */
	requestHeaders: string[];
	/**
	 * An array of strings representing response headers.
	 */
	responseHeaders: string[];
};

/**
 * Interface representing metadata about the request.
 */
export interface RequestMeta {
	/** The original URL of the request */
	url: string;
	/** The route (path) to which the request was sent */
	route: string;
	/** The HTTP method of the request */
	method: string;
	/** The IP address of the client making the request */
	clientIp: string;
	/** The time the request was made */
	time: string;
	/** The size of the request body in bytes */
	size: string;
	/** The cookies included in the request */
	cookies: any;
	/** The headers included in the request */
	headers: Record<string, string | string[]>;
	/** The user agent making the request */
	userAgent: string;
	/** The referer of the request */
	referer: string;
	/** The request ID for tracking */
	requestId: string | string[];
	/** The HTTP version used in the request */
	httpVersion: string;
	/** The path of the request */
	path: string;
	/** Query parameters included in the request */
	queryParams: Record<string, any>;
	/** The body of the request */
	body: any;
}

/**
 * Interface representing metadata about the response.
 */
export interface ResponseMeta {
	/** The time the response was sent */
	time: string;
	/** The time taken to process the request */
	processingTime: string;
	/** The size of the response body in bytes */
	size: string;
	/** The cookies set in the response */
	cookies: string | number | string[];
	/** The headers included in the response */
	headers: Record<string, string | number | string[]>;
}

/**
 * Interface representing metadata about the server.
 */
export interface ServerMeta {
	/** The timezone of the server */
	timezone: string;
	/** The current time on the server */
	currentTime: string;
}

/**
 * Interface representing an error response.
 */
export interface ErrorResponse {
	/** The HTTP status code of the error response */
	statusCode: number;
	/** Initial error information */
	error: string;
	/** The error message */
	message: string;
	/** Metadata associated with the error */
	meta: {
		/** Metadata about the server */
		server: ServerMeta;
		/** Metadata about the request */
		request: RequestMeta;
		/** Metadata about the response */
		response: ResponseMeta;
	};
}
