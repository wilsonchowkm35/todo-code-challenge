<script setup lang="ts">
import { ref } from "vue";
import { io } from "socket.io-client";
import type { Task } from "@/interfaces/task";
import TaskBoard from "@/components/TaskBoard.vue";

const tasks = ref<Task[]>([]);
const socket = io("127.0.0.1:3000");
socket.on("connect", () => {
  console.log(`Connection established to server with id: ${socket.id}`);
});

socket.on("message", (payload) => {
  tasks.value = payload.tasks;
});

function createTask(task: Task) {
  socket.emit("message", { type: "CREATE", task });
}

function deleteTask(task: Task) {
  socket.emit("message", { type: "DELETE", task });
}
</script>

<template>
  <TaskBoard :tasks="tasks" @createTask="createTask" @deleteTask="deleteTask" />
</template>
