import winston from "winston";
const { combine, timestamp } = winston.format;

const loggerLevel = process.env.NODE_ENV === "production" ? "info" : "debug";

const customFormat = winston.format.printf((data) => {
  const { timestamp, level, message } = data
  const levelUpperCase = level.toUpperCase()
  return `[${timestamp}] ${levelUpperCase} ${message}`
})

export const logger = winston.createLogger({
  level: loggerLevel,
  format: combine(
    timestamp({ format: 'ddd, DD MMM YYYY HH:mm:ss' }),
    customFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: loggerLevel,
      filename: "./logs/server.log",
      maxsize: 5242880,
      maxFiles: 5,
      handleExceptions: true
    }),
    new winston.transports.File({
      level: "error",
      filename: "./logs/error.log",
      maxsize: 5242880,
      maxFiles: 5,
      handleExceptions: true,
    })
  ],
  exitOnError: false
});

//using the logger and its configured transports, to save the logs created by Morgan
export const loggerStream = {
  write: (text: string) => {
      logger[loggerLevel](text)
  }
}