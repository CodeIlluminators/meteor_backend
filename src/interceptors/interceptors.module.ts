import { Module } from "@nestjs/common";

import { ExtendedTransformInterceptor } from "./extended-transform.interceptor";

@Module({
	providers: [ExtendedTransformInterceptor],
	exports: [ExtendedTransformInterceptor],
})
export class InterceptorsModule {}
