import { Controller, Get, Logger } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller("api")
export class AppController {
	private logger: Logger;

	constructor(private readonly appService: AppService) {
		this.logger = new Logger(this.constructor.name);
	}

	@Get()
	async getMainHello(): Promise<any> {
		return { message: await this.appService.getMainHello() };
	}
}
