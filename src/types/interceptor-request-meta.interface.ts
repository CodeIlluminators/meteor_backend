/**
 * Interface representing metadata about the request.
 */
export interface InterceptorRequestMeta {
	/** The original URL of the request */
	url: string;
	/** The HTTP method of the request */
	method: string;
	/** The IP address of the client making the request */
	clientIp: string;
	/** The time the request was made */
	time: string;
	/** The size of the request body in bytes */
	size: string;
	/** The headers included in the request */
	headers: Record<string, string>;
	/** The user agent making the request */
	userAgent: string;
	/** The path of the request */
	path: string;
	/** Query parameters included in the request */
	queryParams: Record<string, any>;
	/** The body of the request */
	body: any;
}
