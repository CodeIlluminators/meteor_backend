/**
 * Custom response interface for the interceptor.
 */
export interface InterceptorCustomResponse extends Response {
	/** Function to get headers from the response */
	getHeaders: () => Record<string, string>;
	/** HTTP status code of the response */
	statusCode: number;
}
