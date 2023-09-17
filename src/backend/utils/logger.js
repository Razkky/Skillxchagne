// logger.js

const line = "------------------------";

module.exports = {
    info: (message, data) => {
        const emoji = "ℹ️"; // Info emoji
        console.log(`${line}\n${emoji} INFO: ${message}`);
        if (data) console.log(data);
        console.log(line);
    },
    warning: (message, data) => {
        const emoji = "⚠️"; // Warning emoji
        console.log(`${line}\n${emoji} WARNING: ${message}`);
        if (data) console.log(data);
        console.log(line);
    },
    error: (message, data) => {
        const emoji = "❌"; // Error emoji
        console.log(`${line}\n${emoji} ERROR: ${message}`);
        if (data) console.log(data);
        console.log(line);
    }
};
