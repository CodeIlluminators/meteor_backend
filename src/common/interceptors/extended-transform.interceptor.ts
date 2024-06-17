import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import * as moment from "moment-timezone";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import {
	InterceptorCustomRequest,
	InterceptorCustomResponse,
	InterceptorRequestMeta,
	InterceptorResponseMeta,
} from "../types";
import { calculateSize } from "../utility/utility";

/**
 * Intercepts incoming requests and outgoing responses to transform the response format.
 * @param context - The execution context of the request.
 * @param next - The next handler in the request pipeline.
 * @returns An observable of the transformed response.
 */
@Injectable()
export class ExtendedTransformInterceptor<T> implements NestInterceptor<T> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const httpContext: HttpArgumentsHost = context.switchToHttp();
		const startTime: number = Date.now();
		const request: InterceptorCustomRequest =
			httpContext.getRequest<InterceptorCustomRequest>();
		const response: InterceptorCustomResponse =
			httpContext.getResponse<InterceptorCustomResponse>();
		const timezone: string = moment.tz.guess();

		return next.handle().pipe(
			map((data: T) => {
				const processingTime: number = Date.now() - startTime;

				const responseMeta: InterceptorResponseMeta = this.getResponseMeta(
					response,
					processingTime,
					data,
				);

				return {
					statusCode: response.statusCode,
					data,
					meta: {
						server: this.getServerMeta(timezone),
						request: this.getRequestMeta(request),
						response: responseMeta,
					},
				};
			}),
		);
	}

	/**
	 * Gets server metadata including the timezone and current time.
	 * @param timezone - The server's timezone.
	 * @returns An object containing server metadata.
	 */
	private getServerMeta(timezone: string): {
		timezone: string;
		currentTime: string;
	} {
		return {
			timezone,
			currentTime: moment().tz(timezone).format(),
		};
	}

	/**
	 * Gets metadata about the request.
	 * @param request - The incoming request object.
	 * @returns An object containing request metadata.
	 */
	private getRequestMeta(
		request: InterceptorCustomRequest,
	): InterceptorRequestMeta {
		const { originalUrl, method, ip: clientIp, headers, body, query } = request;

		return {
			url: originalUrl,
			method,
			clientIp,
			time: moment().tz(moment.tz.guess()).format(),
			size: `${calculateSize(body)} bytes`,
			headers,
			userAgent: headers["user-agent"],
			path: request.path,
			queryParams: query,
			body,
		};
	}

	/**
	 * Gets metadata about the response.
	 * @param response - The outgoing response object.
	 * @param processingTime - The time taken to process the request.
	 * @param data - The response data.
	 * @returns An object containing response metadata.
	 */
	private getResponseMeta(
		response: InterceptorCustomResponse,
		processingTime: number,
		data: T,
	): InterceptorResponseMeta {
		return {
			time: moment().tz(moment.tz.guess()).format(),
			processingTime: `${processingTime}ms`,
			size: `${calculateSize(data)} bytes`,
			headers: response.getHeaders(),
		};
	}
}
