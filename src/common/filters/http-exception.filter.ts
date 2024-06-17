import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Request, Response } from "express";
import * as moment from "moment-timezone";

import { ErrorResponse } from "../types";
import {
	getRequestMeta,
	getResponseMeta,
	getServerMeta,
} from "../utils/metadata.util";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost): void {
		const startTime: number = Date.now();
		const timezone: string = moment.tz.guess();
		const status: number = exception.getStatus();

		const ctx: HttpArgumentsHost = host.switchToHttp();
		const request: Request = ctx.getRequest<Request>();
		const response: Response = ctx.getResponse<Response>();

		const errorResponse: ErrorResponse = {
			statusCode: status,
			error: exception.getResponse()["error"],
			message: exception.getResponse()["message"],
			meta: {
				server: getServerMeta(timezone),
				request: getRequestMeta(request, timezone),
				response: getResponseMeta(response, Date.now() - startTime, null),
			},
		};

		response.status(status).json(errorResponse);
	}
}
