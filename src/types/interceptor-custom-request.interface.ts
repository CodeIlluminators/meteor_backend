/**
 * Custom request interface for the interceptor.
 */
// @ts-ignore
export interface InterceptorCustomRequest extends Request {
	/** The original URL of the request */
	originalUrl: string;
	/** The HTTP method of the request (GET, POST, etc.) */
	method: string;
	/** The IP address of the client making the request */
	ip: string;
	/** The path of the request */
	path: string;
	/** Query parameters included in the request URL */
	query: Record<string, any>;
	/** Body of the request */
	body: any;
	/** Headers included in the request */
	headers: Record<string, string>;
}
