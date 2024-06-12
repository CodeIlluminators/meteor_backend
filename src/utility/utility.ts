export const getRandomIndex = (arrayLength: number): number =>
	Math.round(Math.random() * 1000) % arrayLength;

export const isStringEmpty = (val: string | undefined): boolean =>
	val === undefined || val == undefined || val.length <= 0;

export const isObjectEmpty = (obj: Record<string, any>): boolean =>
	obj === undefined || obj == undefined || Object.keys(obj).length === 0;
