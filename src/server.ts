import express from "express";
import morgan from "morgan";
import { sequelize } from "./api/db"
import router from "./api/routes";
import { logger, loggerStream } from "./api/utils/logger";

import type { Socket } from "net";

const { APP_PORT } = process.env

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan(':method :url - :response-time ms', { stream: loggerStream }));

app.use("/", router);

// Connections needed for graceful shutdown
let connections: Socket[] = [];

const server = app.listen(APP_PORT || 3000, async () => {
  logger.info(`Server is running on port ${APP_PORT || 3000}`);

  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.info("Unable to connect to the database:", error);
  }
});

server.on('connection', (connection) => {
  // Add connection to list
  connections.push(connection)

  // On connection close remove it from connections list
  connection.on('close', () => {
    connections = connections.filter(currentConnection => currentConnection !== connection)
  })
})

function shutdown() {
  logger.info('Received kill signal, shutting down gracefully');
  
  server.close(() => {
    logger.info('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 20000);

  // Go through connections and end each of them
  connections.forEach((connection) => connection.end());
  
  // then destroy connections one by one if still not ended
  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);