/**
 * Interface representing metadata about the response.
 */
export interface InterceptorResponseMeta {
	/** The time the response was sent */
	time: string;
	/** The time taken to process the request */
	processingTime: string;
	/** The size of the response body in bytes */
	size: string;
	/** The headers included in the response */
	headers: Record<string, string>;
}
