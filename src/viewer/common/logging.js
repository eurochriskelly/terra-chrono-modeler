export const logMaker = (name, level) => {
    return (message) => {
        console.log(`${level.toUpperCase()} [${name}] ${message}`);
    }
}
