const chalk = require('chalk'); // You need to install chalk via npm install chalk
const line = "------------------------";

// Get a timestamp in the format 'YYYY-MM-DD HH:mm:ss'
const getTimeStamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

module.exports = {
    info: (message, data) => {
        const emoji = "ℹ️"; // Information emoji
        const formattedMessage = `${line}\n${emoji} [INFO] ${getTimeStamp()} - ${message}`;
        console.log(chalk.blue(formattedMessage));
        if (data) console.log(data);
        console.log(chalk.blue(line));
    },
    warning: (message, data) => {
        const emoji = "⚠️"; // Warning emoji
        const formattedMessage = `${line}\n${emoji} [WARNING] ${getTimeStamp()} - ${message}`;
        console.log(chalk.yellow(formattedMessage));
        if (data) console.log(data);
        console.log(chalk.yellow(line));
    },
    error: (message, data) => {
        const emoji = "❌"; // Error emoji
        const formattedMessage = `${line}\n${emoji} [ERROR] ${getTimeStamp()} - ${message}`;
        console.log(chalk.red(formattedMessage));
        if (data) console.log(data);
        console.log(chalk.red(line));
    },
    success: (message, data) => {
        const emoji = "✅"; // Success emoji
        const formattedMessage = `${line}\n${emoji} [SUCCESS] ${getTimeStamp()} - ${message}`;
        console.log(chalk.green(formattedMessage));
        if (data) console.log(data);
        console.log(chalk.green(line));
    },
    debug: (message, data) => {
        const emoji = "🔍"; // Debug emoji
        const formattedMessage = `${line}\n${emoji} [DEBUG] ${getTimeStamp()} - ${message}`;
        console.log(chalk.gray(formattedMessage));
        if (data) console.log(data);
        console.log(chalk.gray(line));
    }
};
