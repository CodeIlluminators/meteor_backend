import { Logger } from "@nestjs/common";
import * as winston from "winston";
import * as winstonDailyRotateFile from "winston-daily-rotate-file";

export const transports = {
	console: new winston.transports.Console({
		level: "silly",
		format: winston.format.combine(
			winston.format.timestamp({
				format: "YYYY-MM-DD HH:mm:ss",
			}),
			winston.format.colorize({
				colors: {
					info: "blue",
					debug: "yellow",
					error: "red",
				},
			}),
			winston.format.printf(
				(info) =>
					`${info.timestamp} [${info.level}] [${
						info.context ? info.context : info.stack
					}] ${info.message}`,
			),
			// winston.format.align(),
		),
	}),
	combinedFile: new winstonDailyRotateFile({
		dirname: "logs",
		filename: "combined",
		extension: ".log",
		level: "info",
	}),
	errorFile: new winstonDailyRotateFile({
		dirname: "logs",
		filename: "error",
		extension: ".log",
		level: "error",
	}),
};

/**
 * @description Enable DEBUG logs to be printed in combined.log
 * @param time Enable DEBUG for specified time in minutes @default 5 minutes
 * @param logLevel Specify log level to enable @default debug
 */
export function enableDebugLog(
	time: number = 5,
	logLevel: string = "debug",
): void {
	const logger = new Logger("logger.enableDebugLog");
	transports.combinedFile.level = logLevel;
	if (time === 0) {
		logger.debug("time cannot be zero(0). Setting time to 1 minute.");
		time = 1;
	}
	logger.debug(`${logLevel} log enabled for ${time} minute(s)`);
	setTimeout(
		() => {
			transports.combinedFile.level = "info";
			logger.debug(`${logLevel} log disabled`);
		},
		time * 60 * 1000,
	);
}
