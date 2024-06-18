import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Request, Response } from "express";
import * as moment from "moment-timezone";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ResponseMeta } from "../types";
import {
	getRequestMeta,
	getResponseMeta,
	getServerMeta,
} from "../utils/metadata.util";

/**
 * Intercepts incoming requests and outgoing responses to transform the response format.
 * @param context - The execution context of the request.
 * @param next - The next handler in the request pipeline.
 * @returns An observable of the transformed response.
 */
@Injectable()
export class ExtendedTransformInterceptor<T> implements NestInterceptor<T> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const startTime: number = Date.now();
		const timezone: string = moment.tz.guess();

		const httpContext: HttpArgumentsHost = context.switchToHttp();
		const request: Request = httpContext.getRequest<Request>();
		const response: Response = httpContext.getResponse<Response>();

		return next.handle().pipe(
			map((data: T) => {
				const responseMeta: ResponseMeta = getResponseMeta(
					response,
					Date.now() - startTime,
					data,
				);

				return {
					statusCode: response.statusCode,
					data,
					meta: {
						server: getServerMeta(timezone),
						request: getRequestMeta(request, timezone),
						response: responseMeta,
					},
				};
			}),
		);
	}
}
