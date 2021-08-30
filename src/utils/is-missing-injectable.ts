/**
 * This function checks if any arguments are undefined and trows an error.
 */
export default function isMissingInjectable(...args: unknown[]) {
    for (let index = 0; index < args.length; index++) {
        const element = args[index];
        if (element == undefined) {
            throw new Error("Missing injectable variable, please make sure you are using the correct wrapper component.");
        }
    }
}
