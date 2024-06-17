/**
 * Generates a random index within the range [0, arrayLength).
 * @param arrayLength - The length of the array for which to generate a random index.
 * @returns A random index within the specified range.
 */
export const getRandomIndex = (arrayLength: number): number =>
	Math.floor(Math.random() * arrayLength);

/**
 * Checks if a string is empty (undefined, null, or has zero length).
 * @param val - The string value to check.
 * @returns True if the string is empty, false otherwise.
 */
export const isStringEmpty = (val: string | undefined | null): boolean =>
	val === undefined || val === null || val.length === 0;

/**
 * Checks if an object is empty (undefined or has no own enumerable properties).
 * @param obj - The object to check.
 * @returns True if the object is empty, false otherwise.
 */
export const isObjectEmpty = (obj: Record<string, any> | undefined): boolean =>
	obj === undefined || Object.keys(obj).length === 0;

/**
 * Calculates the size of the given object in bytes.
 * @param object - The object to calculate the size of.
 * @param encoding - The character encoding used to determine the byte length of the stringified object.
 *   Defaults to "utf-8". See Node.js Buffer documentation for supported encodings.
 * @returns The size of the object in bytes.
 */
export const calculateSize = (
	object: any,
	encoding: BufferEncoding = "utf-8",
): number => {
	// Convert the object to JSON string and measure its byte length using specified encoding
	return Buffer.byteLength(JSON.stringify(object), encoding);
};
