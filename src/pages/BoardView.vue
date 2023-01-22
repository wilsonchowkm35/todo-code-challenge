<script setup lang="ts">
import TaskBoard from "../components/TaskBoard.vue";

// import { defineComponent } from "vue";
// import { io } from "socket.io-client";
/*
const socket = io("127.0.0.1:3000");
socket.on("connect", () => {
  console.log(`Connection established with id: ${socket.id}`);
});
*/
</script>

<template>
  <h1>Todo.io</h1>
  <TaskBoard />
</template>
