import { Request, Response } from "express";
import * as moment from "moment-timezone";

import { arrayToDict, calculateSize } from "../../utils/base.util";
import {
	ArrayToDictResult,
	RequestMeta,
	ResponseMeta,
	ServerMeta,
} from "../types";
import { globalHeaders } from "./headersConfig";

/**
 * Gets server metadata including the timezone and current time.
 * @param timezone - The server's timezone.
 * @returns An object containing server metadata.
 */
export function getServerMeta(timezone: string): ServerMeta {
	return {
		timezone,
		currentTime: moment().tz(timezone).format(),
	};
}

/**
 * Gets metadata about the request.
 * @param request -
 * @param timezone -
 * @returns An object containing request metadata.
 */
export function getRequestMeta(
	request: Request,
	timezone: string,
): RequestMeta {
	const headers: ArrayToDictResult<string | undefined> = arrayToDict(
		globalHeaders.requestHeaders,
		(header: string) => request.header(header),
		{ useItemAsKey: true },
	);

	return {
		url: request.originalUrl,
		route: request.route ? request.route.path : request.originalUrl,
		method: request.method,
		clientIp: request.ip,
		time: moment(Date.now()).tz(timezone).format(),
		size: `${calculateSize(request.body)} bytes`,
		cookies: request.cookies,
		headers: headers,
		userAgent: request.headers["user-agent"],
		referer: request.headers["referer"],
		requestId: request.headers["x-request-id"],
		httpVersion: request.httpVersion,
		path: request.path,
		queryParams: request.query,
		body: request.body,
	};
}

/**
 * Gets metadata about the response.
 * @param response - The outgoing response object.
 * @param processingTime - The time taken to process the request.
 * @param data - The response data.
 * @returns An object containing response metadata.
 */
export function getResponseMeta<T>(
	response: Response,
	processingTime: number,
	data: T,
): ResponseMeta {
	const headers: ArrayToDictResult<string | undefined> = arrayToDict(
		globalHeaders.responseHeaders,
		(header: string) => response.getHeader(header) as string,
		{ useItemAsKey: true },
	);

	return {
		time: moment().tz(moment.tz.guess()).format(),
		processingTime: `${processingTime}ms`,
		size: `${calculateSize(data)} bytes`,
		cookies: response.getHeader("Set-Cookie"),
		headers: headers,
	};
}
