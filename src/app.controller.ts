import { Controller, Logger } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	private logger: Logger;

	constructor(private readonly appService: AppService) {
		this.logger = new Logger(this.constructor.name);
	}
}
