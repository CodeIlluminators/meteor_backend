// noinspection JSDeprecatedSymbols

import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as csurf from "csurf";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import helmet from "helmet";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ExtendedTransformInterceptor } from "./common/interceptors/extended-transform.interceptor";
import { transports } from "./utils/logger.util";

async function bootstrap(): Promise<void> {
	const app: INestApplication = await NestFactory.create(AppModule);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalInterceptors(new ExtendedTransformInterceptor());

	app.useLogger(
		WinstonModule.createLogger({
			format: winston.format.combine(
				winston.format.timestamp({
					format: "YYYY-MM-DD HH:mm:ss",
				}),
				winston.format.errors({ stack: true }),
				winston.format.splat(),
				winston.format.json(),
			),
			transports: [
				transports.console,
				transports.combinedFile,
				transports.errorFile,
			],
		}),
	);

	app.enableCors();
	app.use(helmet());
	app.use(compression());
	app.use(cookieParser());
	app.use(csurf({ cookie: true }));

	const limiter: RateLimitRequestHandler = rateLimit({
		windowMs: 5 * 60 * 1000, // 5 mins
		max: 100,
	});
	app.use(limiter);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.enableShutdownHooks();
	app.setGlobalPrefix("api");

	await app.listen(8000, "0.0.0.0");
}

bootstrap();
