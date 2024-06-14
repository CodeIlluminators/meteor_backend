import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { InterceptorsModule } from "./interceptors/interceptors.module";

@Module({
	imports: [InterceptorsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
