const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Log directory
const logDirectory = path.join(__dirname,"..", "logs");


// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create writable streams for logs
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);
const errorLogStream = fs.createWriteStream(
  path.join(logDirectory, "error.log"),
  { flags: "a" }
);

// Morgan middleware for request logging
const requestLogger = morgan("combined", { stream: accessLogStream });

// Custom error logger
const errorLogger = (error) => {
  const logMessage = `[${new Date().toISOString()}] ${error.stack || error}\n`;
  errorLogStream.write(logMessage);
};

module.exports = { requestLogger, errorLogger };










// const fs = require("fs");
// const path = require("path");
// const { Stream, Writable } = require("stream");

// // Log directory
// const logDirectory = path.join(__dirname, "../logs");

// // Ensure log directory exists
// if (!fs.existsSync(logDirectory)) {
//   fs.mkdirSync(logDirectory);
// }

// // Create a writable stream for request logs
// const requestLogStream = fs.createWriteStream(path.join(logDirectory, "requests.log"), { flags: "a" });

// // Error logger
// const errorLogger = (error) => {
//   const errorLogPath = path.join(logDirectory, "errors.log");
//   const logMessage = `[${new Date().toISOString()}] ${error.stack || error}\n`;
//   fs.appendFile(errorLogPath, logMessage, (err) => {
//     if (err) console.error("Failed to write error log:", err);
//   });
// };

// // Request logger
// const requestLogger = () => new Writable({
//   write(chunk, encoding, callback) {
//     requestLogStream.write(chunk, encoding, callback);
//   },
// });

// module.exports = { errorLogger, requestLogger };
