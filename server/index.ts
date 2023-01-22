import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Tasks } from "./tasks";
import type { Task } from "../src/interfaces/task";

interface Message {
  type: string;
  tasks: Task[];
  task?: Task;
}

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const taskDb: Tasks = new Tasks("tasks/tasks.json");

// load presistence tasks data
taskDb.load();

io.on("connection", (socket: Socket) => {
  console.log("connected");
  socket.emit("message", {
    type: "INIT",
    tasks: taskDb.tasks,
  });

  socket.on("message", (data: Message) => {
    try {
      switch (data.type) {
        case "CREATE":
          if (data.task) {
            taskDb.add(data.task);
          }
          break;
        case "DELETE":
          if (data.task) {
            taskDb.delete(data.task);
          }
          break;
      }

      socket.emit("message", { tasks: taskDb.tasks });
      socket.broadcast.emit("message", { tasks: taskDb.tasks });
    } catch (error) {
      socket.emit("message", { type: "ERROR", task: data.task });
    }
  });

  socket.on("close", () => {
    console.log("Server is closed...");
    taskDb.save();
  });

  socket.on("error", (error) => {
    console.error(`[ERROR] ${error.message}`);
    if (error && error.message === "unauthorized event") {
      taskDb.save();
      socket.disconnect();
    }
  });
});

/**
 * @description Graceful shutdown the server
 * @param error
 * @returns
 */
function shutdown(error: string) {
  return (err) => {
    console.log(`${err}! Receive signal: ${error}! Server shutdown now!`);
    taskDb.save();
  };
}

// Simply way to handle server termination.
process
  .on("SIGTERM", shutdown("SIGTERM"))
  .on("SIGINT", shutdown("SIGINT"))
  .on("uncaughtException", shutdown("uncaughtException"));

httpServer.listen(3000);
