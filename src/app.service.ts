import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	async getMainHello(): Promise<string> {
		return "💖 Hello, MeteorAPI!";
	}
}
