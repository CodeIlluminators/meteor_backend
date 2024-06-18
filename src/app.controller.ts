import { Controller, Get, Logger, UseFilters } from "@nestjs/common";

import { AppService } from "./app.service";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

@UseFilters(HttpExceptionFilter)
@Controller()
export class AppController {
	private logger: Logger;

	constructor(private readonly appService: AppService) {
		this.logger = new Logger(this.constructor.name);
	}

	@Get()
	async getMainHello(): Promise<{ message: string }> {
		return { message: await this.appService.getMainHello() };
	}

	@Get("error")
	async getExample(): Promise<void> {
		throw new Error(
			"This deliberately activates the exception filter. Just calm down :)",
		);
	}
}
