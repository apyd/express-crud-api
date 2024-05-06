import express from "express";
import { sequelize } from "./api/db"
import router from "./api/routes";

import type { Socket } from "net";

const { APP_PORT } = process.env

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

// Connections needed for graceful shutdown
let connections: Socket[] = [];

const server = app.listen(APP_PORT || 3000, async () => {
  console.log(`Server is running on port ${APP_PORT || 3000}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
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
  console.log('Received kill signal, shutting down gracefully');
  
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
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